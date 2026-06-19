"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Leaf, Mail, Lock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes("localhost") ||
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-supabase")
      ) {
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan sistem. Coba lagi.");
    } finally {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-supabase")
      ) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
      {/* Back link */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-[#9ca3af] hover:text-[#2d6a4f] transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Website
      </Link>

      <div className="w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 bg-[#2d6a4f] rounded-sm flex items-center justify-center mb-5">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="label-tag mb-1">Bank Sampah KGS</span>
          <h1 className="font-serif text-3xl text-[#1a1a2e] mt-3">Admin Panel</h1>
          <p className="text-[#9ca3af] text-sm mt-2">Masuk untuk mengelola dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm rounded-sm mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#6b7280] mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#9ca3af]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-white border border-[#e5e7eb] rounded-sm text-sm text-[#1a1a2e] placeholder-[#d1d5db] focus:ring-1 focus:ring-[#2d6a4f] focus:border-[#2d6a4f] outline-none transition-all duration-200"
                placeholder="admin@banksampahkgs.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#6b7280] mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#9ca3af]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-white border border-[#e5e7eb] rounded-sm text-sm text-[#1a1a2e] placeholder-[#d1d5db] focus:ring-1 focus:ring-[#2d6a4f] focus:border-[#2d6a4f] outline-none transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 bg-[#2d6a4f] text-white text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-[#1b4332] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Masuk ke Dashboard"}
          </button>
        </form>

        {/* Divider */}
        <div className="section-divider mt-10 mb-6" />
        <p className="text-center text-xs text-[#9ca3af]">
          &copy; {new Date().getFullYear()} Bank Sampah KGS
        </p>
      </div>
    </div>
  );
}
