import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const bucket = (formData.get("bucket") as string) ?? "logos";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // When Supabase is configured, upload to storage
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createServiceClient } = await import("@/lib/supabase/server");
    const supabase = createServiceClient();
    if (supabase) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, { contentType: file.type });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
      return NextResponse.json({ url: urlData.publicUrl });
    }
  }

  // Fallback: return base64 data URL for client-side preview
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;
  return NextResponse.json({ url: dataUrl });
}
