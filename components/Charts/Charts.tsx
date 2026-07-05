"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

import { useState, useEffect } from "react";
import { fetchRiskTrend } from "@/app/services/api";

export default function Charts() {
  const [data, setData] = useState<{ month: string; risk: number; response: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskTrend().then((trend) => {
      if (trend && trend.length > 0) {
        setData(trend);
      } else {
        // Fallback default mock if backend is down or empty
        setData([
          { month: "Jan", risk: 32, response: 18 },
          { month: "Feb", risk: 45, response: 24 },
          { month: "Mar", risk: 52, response: 31 },
          { month: "Apr", risk: 40, response: 26 },
          { month: "May", risk: 61, response: 38 },
          { month: "Jun", risk: 70, response: 45 },
        ]);
      }
      setLoading(false);
    });
  }, []);
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* Risk Prediction Chart */}

      <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-white">
            AI Risk Prediction
          </h2>

          <p className="text-gray-400 mt-1">
            Disaster risk trend over time
          </p>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={data}>

            <CartesianGrid
              stroke="#40444D"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
            />

            <YAxis stroke="#9CA3AF" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#F7F3EC"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Emergency Response */}

      <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-white">
            Emergency Response
          </h2>

          <p className="text-gray-400 mt-1">
            Response efficiency across months
          </p>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="responseGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#F7F3EC"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#F7F3EC"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#40444D"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
            />

            <YAxis stroke="#9CA3AF" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="response"
              stroke="#F7F3EC"
              fill="url(#responseGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}