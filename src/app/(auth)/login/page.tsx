"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { Navbar } from "@/components/marketing/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    window.location.href = "/dashboard";
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  return (
    <div className="min-h-screen bg-bar-black">
      <Navbar />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
        <GlassPanel className="p-8 w-full max-w-md">
          <h1 className="font-serif text-3xl text-bar-cream mb-2">Welcome Back</h1>
          <p className="text-bar-cream/50 text-sm mb-8">Sign in to My Bottle Shelf</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-bar-cream/50 text-xs uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2.5 text-sm text-bar-cream focus:outline-none focus:border-bar-gold/50"
              />
            </div>
            <div>
              <label className="text-bar-cream/50 text-xs uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2.5 text-sm text-bar-cream focus:outline-none focus:border-bar-gold/50"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <GoldButton type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign In"}
            </GoldButton>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-bar-smoke" />
            <span className="text-bar-cream/30 text-xs">or</span>
            <div className="flex-1 h-px bg-bar-smoke" />
          </div>

          <GoldButton onClick={handleGoogle} variant="outline" className="w-full">
            Continue with Google
          </GoldButton>

          <p className="text-center text-bar-cream/40 text-sm mt-6">
            No account?{" "}
            <Link href="/signup" className="text-bar-gold hover:underline">
              Create one
            </Link>
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
