"use client";

import {
  Bell,
  CalendarDays,
  Settings,
  Search,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full h-20 px-8 bg-[#26282D] border-b border-[#3A3D43] flex items-center justify-between">

      {/* Right */}
      <div>
        <h1 className="text-4xl font-bold text-white leading-tight">
          <br />
          <span className="text-[#F7F3EC]">Aegis Team</span>
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Here's what's happening around the world today.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden lg:flex items-center bg-[#32353B] rounded-xl px-4 py-3 w-72 border border-[#45484F]">

          <Search className="text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search disasters..."
            className="ml-3 bg-transparent outline-none text-white placeholder:text-gray-500 w-full"
          />

        </div>

        {/* Notification */}

        <button className="relative h-12 w-12 rounded-xl bg-[#32353B] hover:bg-[#3C4047] transition">

          <Bell className="w-5 h-5 text-white mx-auto mt-3.5" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            3
          </span>

        </button>

        {/* Settings */}

        <button className="h-12 w-12 rounded-xl bg-[#32353B] hover:bg-[#3C4047] transition">

          <Settings className="w-5 h-5 text-white mx-auto mt-3.5" />

        </button>

        {/* Date */}

        <div className="hidden md:flex items-center gap-3 px-5 h-12 rounded-xl bg-[#32353B] border border-[#45484F]">

          <CalendarDays className="w-5 h-5 text-gray-300" />

          <span className="text-white text-sm">
            03 Jul 2026
          </span>

          <ChevronDown className="w-4 h-4 text-gray-400" />

        </div>

        {/* Profile */}

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#32353B] border border-[#45484F] cursor-pointer hover:bg-[#3C4047] transition">

          <img
            src="https://ui-avatars.com/api/?name=Aegis+Admin&background=F7F3EC&color=222"
            alt="profile"
            className="w-11 h-11 rounded-full"
          />

          <div className="hidden lg:block">

            <h3 className="text-white text-sm font-semibold">
              Control Centre
            </h3>

            <p className="text-gray-400 text-xs">
              Disaster Management
            </p>

          </div>

          <ChevronDown className="w-4 h-4 text-gray-400" />

        </div>

      </div>

    </header>
  );
}