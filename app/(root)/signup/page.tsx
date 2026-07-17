"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/users/signups", { name, email, password });
      await axios.post("/api/send-otp", { email });
      router.push(`/verify-account?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] bg-white text-black">
      <section className="hidden w-1/2 lg:block relative">
        <Image
          src="https://plus.unsplash.com/premium_vector-1726335456056-42b6c2f9d11d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpfGVufDB8fDB8fHww"
          alt="Signup"
          fill
          className="object-cover"
        />
      </section>
      <section className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <form onSubmit={handleSignup} className="w-full max-w-sm space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Create account</h1>
            <p className="text-sm text-zinc-500">Join nova.ai today</p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm placeholder-zinc-400 outline-none transition-colors hover:border-zinc-400 focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm placeholder-zinc-400 outline-none transition-colors hover:border-zinc-400 focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm placeholder-zinc-400 outline-none transition-colors hover:border-zinc-400 focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign up <ArrowRight className="h-4 w-4" /></>}
          </button>

          <p className="text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:text-purple-500 transition-colors">
              Log in
            </a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Signup;
