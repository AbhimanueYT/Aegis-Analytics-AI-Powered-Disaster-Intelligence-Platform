"use client";

import Hero from "@/components/Hero/Hero";
import Cards from "@/components/Cards/Cards";
import Charts from "@/components/Charts/Charts";
import Alerts from "@/components/Alerts/Alerts";
import DisasterMap from "@/components/Maps/Maps";
import Shelter from "@/components/Shelter/Shelter";
import Footer from "@/components/Footer/Footer";

import {
  AlertTriangle,
  Activity,
  ShieldCheck,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Active Alerts",
    value: "18",
    color: "text-red-400",
    bg: "bg-red-500/20",
    icon: AlertTriangle,
  },
  {
    title: "AI Accuracy",
    value: "97%",
    color: "text-green-400",
    bg: "bg-green-500/20",
    icon: Activity,
  },
  {
    title: "Shelters Active",
    value: "156",
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    icon: ShieldCheck,
  },
  {
    title: "People Protected",
    value: "52.3K",
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    icon: Users,
  },
];

const recentAlerts = [
  {
    title: "Flood Warning",
    location: "Hyderabad",
    level: "Critical",
    color: "bg-red-500",
  },
  {
    title: "Cyclone Alert",
    location: "Chennai",
    level: "High",
    color: "bg-orange-500",
  },
  {
    title: "Wildfire Warning",
    location: "Bengaluru",
    level: "Moderate",
    color: "bg-yellow-500",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#ECE9E3] text-black">
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

      {/* Hero */}
      <Hero />
    <section className="flex items-center justify-between">

  <div>

    <h1 className="text-4xl font-bold text-[#1F2937]">
      Disaster Intelligence Dashboard
    </h1>

    <p className="mt-2 text-gray-600">
      Real-time AI monitoring of disasters, emergency response and predictive analytics.
    </p>

  </div>

</section>  

      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Left */}
        <div className="space-y-8 lg:col-span-2">  

          <Cards />

          <Charts />

        </div>

        {/* Right */}
        <div className="space-y-6">

          {/* Live Status */}
          <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

            <h2 className="text-2xl font-bold text-white">
              Live Status
            </h2>

            <p className="mt-1 text-gray-400">
              Current disaster overview
            </p>

            <div className="mt-6 space-y-4">

              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl bg-[#26282D] p-4"
                  >
                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}
                      >
                        <Icon className={item.color} size={20} />
                      </div>

                      <span className="text-gray-300">
                        {item.title}
                      </span>

                    </div>

                    <span className="text-xl font-bold text-white">
                      {item.value}
                    </span>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Recent Alerts */}
          <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

            <h2 className="text-2xl font-bold text-white">
              Recent Alerts
            </h2>

            <p className="mt-1 text-gray-400">
              Latest emergency notifications
            </p>

            <div className="mt-6 space-y-4">

              {recentAlerts.map((alert) => (
                <div
                  key={alert.title}
                  className="rounded-2xl border border-[#40444D] bg-[#26282D] p-4"
                >
                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-semibold text-white">
                        {alert.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        {alert.location}
                      </p>

                    </div>

                    <span
                      className={`${alert.color} rounded-full px-3 py-1 text-xs text-white`}
                    >
                      {alert.level}
                    </span>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Map */}
      <DisasterMap />

      {/* Alerts */}
      <Alerts />

      {/* Shelters */}
      <Shelter />

      {/* Footer */}
      <Footer />

    </div>
  </main>  
  );
}