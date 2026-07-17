"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function VerifyAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/users/verify", { otp: Number(otp), email });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await axios.post("/api/send-otp", { email });
      alert("OTP sent again!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
            <Shield className="h-7 w-7 text-purple-800" />
          </div>
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-sm text-zinc-500">
            We sent a 6-digit code to <span className="font-medium text-zinc-700">{email || "your email"}</span>
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <p className="text-sm font-medium text-green-600">Verified! Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-3 text-center text-lg tracking-[0.5em] font-mono placeholder-zinc-400 outline-none transition-colors hover:border-zinc-400 focus:border-purple-500"
            />

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Verify <ArrowRight className="h-4 w-4" /></>}
            </button>

            <p className="text-center text-xs text-zinc-500">
              Didn&apos;t receive the code?{" "}
              <button type="button" onClick={handleResend} className="text-purple-600 hover:text-purple-500 transition-colors font-medium">
                Resend
              </button>
            </p>
          </form>
        )}

        <p className="text-center text-xs text-zinc-500">
          <Link href="/login" className="text-purple-600 hover:text-purple-500 transition-colors">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}
