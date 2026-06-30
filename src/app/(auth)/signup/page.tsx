"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { Navbar } from "@/components/marketing/Navbar";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-bar-black">
      <Navbar />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
        <GlassPanel className="p-8 w-full max-w-md">
          <h1 className="font-serif text-3xl text-bar-cream mb-2">Join The Card Bar</h1>
          <p className="text-bar-cream/50 text-sm mb-8">Create your account to manage your cards</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-bar-cream/50 text-xs uppercase tracking-wider">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2.5 text-sm text-bar-cream focus:outline-none focus:border-bar-gold/50"
              />
            </div>
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
                minLength={6}
                className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2.5 text-sm text-bar-cream focus:outline-none focus:border-bar-gold/50"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <GoldButton type="submit" disabled={loading} className="w-full">
              {loading ? "Creating account..." : "Create Account"}
            </GoldButton>
          </form>

          <p className="text-center text-bar-cream/40 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-bar-gold hover:underline">
              Sign in
            </Link>
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
