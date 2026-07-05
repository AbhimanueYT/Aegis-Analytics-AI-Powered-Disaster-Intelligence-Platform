"use client";

import {
  AlertTriangle,
  Activity,
  ShieldCheck,
  Users,
  ArrowUpRight,
} from "lucide-react";

import { useState, useEffect } from "react";
import { fetchAlerts } from "@/app/services/api";

export default function Cards() {
  const [activeAlertsCount, setActiveAlertsCount] = useState(18);
  const [criticalCount, setCriticalCount] = useState(0);

  useEffect(() => {
    fetchAlerts().then((alerts) => {
      if (alerts && alerts.length > 0) {
        setActiveAlertsCount(alerts.length);
        const critical = alerts.filter(a => a.severity === "Critical").length;
        setCriticalCount(critical);
      }
    });
  }, []);

  const cards = [
    {
      title: "Active Alerts",
      value: activeAlertsCount.toString(),
      change: `+${criticalCount} Critical`,
      subtitle: "Emergency monitoring",
      icon: AlertTriangle,
      tone: activeAlertsCount > 0 ? "red" : "green",
    },
    {
      title: "System Health",
      value: activeAlertsCount > 2 ? "Warning" : "Healthy",
      change: "Stable",
      subtitle: activeAlertsCount > 2 ? "High alert load" : "All services normal",
      icon: ShieldCheck,
      tone: activeAlertsCount > 2 ? "amber" : "green",
    },
    {
      title: "Response Teams",
      value: "24",
      change: "+5%",
      subtitle: "On standby dispatch",
      icon: Users,
      tone: "blue",
    },
    {
      title: "Live Monitoring",
      value: "Active",
      change: "Real-time",
      subtitle: "ChromaDB & XGBoost",
      icon: Activity,
      tone: "green",
    },
  ];

  const toneStyles: Record<string, string> = {
    red: "from-red-50 to-red-100 border-red-200 text-red-700",
    green: "from-green-50 to-green-100 border-green-200 text-green-700",
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
    amber: "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700",
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className={`relative overflow-hidden rounded-3xl border p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${
  toneStyles[card.tone]
      
            }`}
          >
            {/* soft glow */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/40 blur-2xl rounded-full" />

            {/* top row */}
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 backdrop-blur shadow">
                <Icon className="w-5 h-5 text-black" />
              </div>

              <span className="text-xs font-semibold flex items-center gap-1">
                {card.change}
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* content */}
            <div className="mt-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-600">{card.title}</h3>

              <p className="mt-2 text-3xl font-extrabold tracking-tight text-black">
                {card.value}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}