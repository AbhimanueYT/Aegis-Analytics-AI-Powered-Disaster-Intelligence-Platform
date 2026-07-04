"use client";

import {
  AlertTriangle,
  Clock3,
  MapPin,
  ChevronRight,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Severe Flood Warning",
    location: "Hyderabad, Telangana",
    severity: "Critical",
    time: "5 mins ago",
    color: "bg-red-500/20 text-red-400",
    icon: "bg-red-500",
  },
  {
    id: 2,
    title: "Cyclone Alert",
    location: "Chennai, Tamil Nadu",
    severity: "High",
    time: "18 mins ago",
    color: "bg-orange-500/20 text-orange-400",
    icon: "bg-orange-500",
  },
  {
    id: 3,
    title: "Wildfire Detected",
    location: "Bengaluru, Karnataka",
    severity: "Moderate",
    time: "42 mins ago",
    color: "bg-yellow-500/20 text-yellow-400",
    icon: "bg-yellow-500",
  },
  {
    id: 4,
    title: "Earthquake Tremors",
    location: "Delhi NCR",
    severity: "Low",
    time: "1 hour ago",
    color: "bg-green-500/20 text-green-400",
    icon: "bg-green-500",
  },
];

export default function Alerts({ limit }: { limit?: number }) {
  const displayAlerts = limit ? alerts.slice(0, limit) : alerts;

  return (
    <section className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Alerts
          </h2>

          <p className="text-gray-400 mt-1 text-sm">
            Live emergency notifications
          </p>
        </div>

        {!limit && (
          <button className="text-[#F7F3EC] hover:text-white transition flex items-center gap-2">
            View All
            <ChevronRight size={18} />
          </button>
        )}

      </div>

      {/* Alerts List */}
      <div className="space-y-4">

        {displayAlerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-2xl bg-[#26282D] border border-[#40444D] p-5 hover:border-[#F7F3EC] transition"
          >

            <div className="flex justify-between gap-4">

              {/* Left */}
              <div className="flex gap-4">

                <div
                  className={`h-11 w-11 rounded-xl ${alert.icon} flex items-center justify-center`}
                >
                  <AlertTriangle className="text-white" size={20} />
                </div>

                <div>

                  <h3 className="text-white font-semibold">
                    {alert.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                    <MapPin size={14} />
                    {alert.location}
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                    <Clock3 size={14} />
                    {alert.time}
                  </div>

                </div>
              </div>

              {/* Right */}
              <span
                className={`h-fit px-3 py-1 rounded-full text-xs font-semibold ${alert.color}`}
              >
                {alert.severity}
              </span>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}