"use client";

import dynamic from "next/dynamic";

const DisasterMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-[#32353B] rounded-3xl p-6 border border-[#40444D] flex flex-col justify-center items-center h-[520px]">
      <div className="text-white text-lg font-semibold animate-pulse">
        Loading interactive map...
      </div>
    </div>
  ),
});

export default DisasterMap;