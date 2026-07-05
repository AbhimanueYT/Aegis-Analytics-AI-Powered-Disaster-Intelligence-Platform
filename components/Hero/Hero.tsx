"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Users,
  MapPinned,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#32353B] via-[#2E3137] to-[#26282D] border border-[#40444D] p-8"
    >
      {/* Background Effects */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 grid lg:grid-cols-3 gap-8">

        {/* Left Section */}
        <div className="lg:col-span-2">

          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-red-300 text-sm mb-5">
            <ShieldCheck size={18} />
            AI Disaster Intelligence Platform
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Welcome Back,
            <br />
            <span className="text-[#F7F3EC]">
              Aegis Team 👋
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-8">
            Monitor disasters in real time, predict high-risk zones using AI,
            locate emergency shelters, and coordinate rapid disaster response
            from one intelligent dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-xl bg-[#F7F3EC] px-6 py-3 font-semibold text-[#26282D] hover:scale-105 transition">
              Open Dashboard
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-[#50545C] px-6 py-3 text-white hover:bg-[#3B3E45] transition">
              Explore Map
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

        {/* Right Dashboard */}
        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-[#3A3D43] p-5 border border-[#4B4F57]">

            <AlertTriangle className="text-red-400 mb-3" size={30} />

            <p className="text-gray-400 text-sm">
              Active Disasters
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              18
            </h2>

          </div>

          <div className="rounded-2xl bg-[#3A3D43] p-5 border border-[#4B4F57]">

            <Activity className="text-green-400 mb-3" size={30} />

            <p className="text-gray-400 text-sm">
              AI Accuracy
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              97%
            </h2>

          </div>

          <div className="rounded-2xl bg-[#3A3D43] p-5 border border-[#4B4F57]">

            <Users className="text-blue-400 mb-3" size={30} />

            <p className="text-gray-400 text-sm">
              People at Risk
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              52K
            </h2>

          </div>

          <div className="rounded-2xl bg-[#3A3D43] p-5 border border-[#4B4F57]">

            <MapPinned className="text-yellow-400 mb-3" size={30} />

            <p className="text-gray-400 text-sm">
              Safe Shelters
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              128
            </h2>

          </div>

          <div className="col-span-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-red-100">
                  Overall Risk Index
                </p>

                <h2 className="text-5xl font-extrabold text-white mt-2">
                  87%
                </h2>

              </div>

              <div className="h-24 w-24 rounded-full border-8 border-white flex items-center justify-center">

                <span className="text-2xl font-bold text-white">
                  HIGH
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}