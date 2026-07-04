"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-[#32353B] border border-[#40444D] rounded-xl px-4 py-3">

      <Search className="text-gray-400" size={20} />

      <input
        type="text"
        placeholder="Search..."
        className="ml-3 w-full bg-transparent outline-none text-white placeholder:text-gray-500"
      />

    </div>
  );
}