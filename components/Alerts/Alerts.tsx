"use client";

import {
  AlertTriangle,
  Clock3,
  MapPin,
  ChevronRight,
} from "lucide-react";

import { useState, useEffect } from "react";
import { fetchAlerts, AlertData } from "@/app/services/api";

const severityColors: Record<string, { bg: string, text: string, iconBg: string }> = {
  Critical: { bg: "bg-red-500/20", text: "text-red-400", iconBg: "bg-red-500" },
  High: { bg: "bg-orange-500/20", text: "text-orange-400", iconBg: "bg-orange-500" },
  Moderate: { bg: "bg-yellow-500/20", text: "text-yellow-400", iconBg: "bg-yellow-500" },
  Low: { bg: "bg-green-500/20", text: "text-green-400", iconBg: "bg-green-500" },
};

export default function Alerts({ limit }: { limit?: number }) {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts().then((data) => {
      setAlerts(data);
      setLoading(false);
    });
  }, []);

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

        {loading ? (
          <div className="text-gray-400 text-center py-6">Loading active alerts...</div>
        ) : displayAlerts.length === 0 ? (
          <div className="text-gray-400 text-center py-6">No active alerts reported.</div>
        ) : (
          displayAlerts.map((alert) => {
            const styles = severityColors[alert.severity] || severityColors.Low;
            return (
              <div
                key={alert.id}
                className="rounded-2xl bg-[#26282D] border border-[#40444D] p-5 hover:border-[#F7F3EC] transition"
              >
                <div className="flex justify-between gap-4">
                  {/* Left */}
                  <div className="flex gap-4">
                    <div
                      className={`h-11 w-11 rounded-xl ${styles.iconBg} flex items-center justify-center`}
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
                    className={`h-fit px-3 py-1 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </div>
            );
          })
        )}

      </div>
    </section>
  );
}