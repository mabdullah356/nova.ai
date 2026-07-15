import React from "react";
import Image from "next/image";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] bg-white text-black">
     
      <section className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <form className="w-full max-w-sm space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-zinc-500">Log in to your account</p>
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm placeholder-zinc-400 outline-none transition-colors hover:border-zinc-400 focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm placeholder-zinc-400 outline-none transition-colors hover:border-zinc-400 focus:border-purple-500"
            />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-500 active:scale-[0.98]"
          >
            Log in <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-center text-xs text-zinc-500">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-purple-600 hover:text-purple-500 transition-colors">
              Sign up
            </a>
          </p>
        </form>
      </section>
       <section className="hidden w-1/2 lg:block relative">
        <Image
          src="https://plus.unsplash.com/premium_vector-1726175473829-91c130708e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGFpfGVufDB8fDB8fHww"
          alt="Login"
          fill
          className="object-cover"
        />
      </section>
    </main>
  );
};

export default Login;
