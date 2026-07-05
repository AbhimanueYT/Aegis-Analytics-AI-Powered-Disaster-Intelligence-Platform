"use client";

import Link from "next/link";
import { ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#26282D]">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[#32353B] p-12">

        <div className="max-w-md text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F3EC]">
            <ShieldCheck className="text-[#26282D]" size={40} />
          </div>

          <h1 className="mt-8 text-5xl font-bold text-white">
            Aegis Analytics
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI-powered disaster intelligence platform for monitoring,
            predicting, and responding to natural disasters in real time.
          </p>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-8">

        <div className="w-full max-w-md rounded-3xl border border-[#40444D] bg-[#32353B] p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mt-2 text-gray-400">
            Sign in to continue to Aegis Analytics
          </p>

          <form className="mt-8 space-y-6">

            {/* Email */}
            <div>

              <label className="mb-2 block text-gray-300">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-[#40444D] bg-[#26282D] px-4">

                <Mail className="text-gray-400" size={20} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-gray-300">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-[#40444D] bg-[#26282D] px-4">

                <Lock className="text-gray-400" size={20} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-gray-400">

                <input
                  type="checkbox"
                  className="rounded border-gray-500"
                />

                Remember me

              </label>

              <Link
                href="#"
                className="text-sm text-[#F7F3EC] hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#F7F3EC] py-4 font-semibold text-[#26282D] transition hover:scale-105"
            >
              Sign In
            </button>

          </form>

          <p className="mt-8 text-center text-gray-400">

            Don't have an account?{" "}

            <Link
              href="/"
              className="font-semibold text-[#F7F3EC] hover:underline"
            >
              Go to Dashboard
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}