"use client";

import {
  House,
  Users,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

import { useState, useEffect } from "react";
import { fetchShelters, ShelterData } from "@/app/services/api";

export default function Shelter() {
  const [shelters, setShelters] = useState<ShelterData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShelters().then((data) => {
      setShelters(data);
      setLoading(false);
    });
  }, []);
  return (
    <section className="bg-[#32353B] rounded-3xl p-6 border border-[#40444D]">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Emergency Shelters
          </h2>

          <p className="text-gray-400 mt-1">
            Available shelters for evacuation
          </p>
        </div>

        <button className="text-[#F7F3EC] hover:text-white flex items-center gap-2 transition">
          View All
          <ArrowRight size={18} />
        </button>

      </div>

      <div className="space-y-5">

        {loading ? (
          <div className="text-gray-400 text-center py-6">Loading shelters...</div>
        ) : shelters.length === 0 ? (
          <div className="text-gray-400 text-center py-6">No shelters found.</div>
        ) : (
          shelters.map((shelter) => (

          <div
            key={shelter.id}
            className="bg-[#26282D] rounded-2xl p-5 border border-[#40444D] hover:border-[#F7F3EC] transition-all duration-300 hover:-translate-y-1"
          >

            <div className="flex justify-between items-start">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">

                    <House
                      className="text-green-400"
                      size={22}
                    />

                  </div>

                  <div>

                    <h3 className="text-white font-semibold text-lg">
                      {shelter.name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">

                      <MapPin size={15} />

                      {shelter.location}

                    </div>

                  </div>

                </div>

              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  shelter.status === "Open"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {shelter.status}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">

              <div className="flex items-center gap-3">

                <Users className="text-blue-400" size={20} />

                <div>

                  <p className="text-gray-400 text-sm">
                    Capacity
                  </p>

                  <p className="text-white font-semibold">
                    {shelter.capacity}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Users className="text-green-400" size={20} />

                <div>

                  <p className="text-gray-400 text-sm">
                    Available
                  </p>

                  <p className="text-green-400 font-semibold">
                    {shelter.available}
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#40444D] pt-5">

              <div className="flex items-center gap-2 text-gray-400">

                <Phone size={18} />

                {shelter.contact}

              </div>

              <button className="px-5 py-2 rounded-xl bg-[#F7F3EC] text-[#26282D] font-semibold hover:scale-105 transition">
                Directions
              </button>

            </div>

          </div>

        )))}

      </div>

    </section>
  );
}