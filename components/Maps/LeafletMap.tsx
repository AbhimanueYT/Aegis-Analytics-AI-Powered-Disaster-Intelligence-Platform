"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { fetchAlerts, fetchShelters } from "@/app/services/api";
import { AlertTriangle, Home } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  id: string;
  name: string;
  city: string;
  position: [number, number];
  color: string;
  severity: string;
  isShelter: boolean;
  details?: string;
}

const severityColors: Record<string, string> = {
  Critical: "#ef4444", // Red
  High: "#f97316",     // Orange
  Moderate: "#eab308", // Yellow
  Low: "#a855f7",      // Purple
};

export default function DisasterMap() {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAlerts(), fetchShelters()]).then(([alerts, shelters]) => {
      const mappedAlerts: MapMarker[] = alerts.map((a: any) => ({
        id: `alert-${a.id}`,
        name: a.title,
        city: a.location,
        position: [a.latitude || 17.385, a.longitude || 78.4867],
        color: severityColors[a.severity] || "#ef4444",
        severity: a.severity,
        isShelter: false,
        details: a.details,
      }));

      const mappedShelters: MapMarker[] = shelters.map((s: any) => ({
        id: `shelter-${s.id}`,
        name: s.name,
        city: s.location,
        position: [s.latitude || 17.395, s.longitude || 78.4967],
        color: "#22c55e", // Green
        severity: s.status,
        isShelter: true,
        details: `Capacity: ${s.capacity} | Available: ${s.available}`,
      }));

      setMarkers([...mappedAlerts, ...mappedShelters]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#32353B] rounded-3xl p-6 border border-[#40444D]">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Live Disaster Map
          </h2>

          <p className="text-gray-400 mt-1">
            Real-time disaster monitoring
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#F7F3EC] text-[#26282D] font-semibold hover:scale-105 transition">
          View Full Map
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl">

        <MapContainer
          center={[22.5, 79]}
          zoom={5}
          scrollWheelZoom={true}
          style={{
            height: "520px",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((item) => (
            <CircleMarker
              key={item.id}
              center={item.position}
              radius={item.isShelter ? 10 : 12}
              pathOptions={{
                color: item.color,
                fillColor: item.color,
                fillOpacity: 0.8,
              }}
            >
              <Popup>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {item.isShelter ? (
                      <Home
                        size={18}
                        className="text-green-500"
                      />
                    ) : (
                      <AlertTriangle
                        size={18}
                        className="text-red-500"
                      />
                    )}
                    <h3 className="font-bold text-gray-800">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm">
                    <strong>Location:</strong> {item.city}
                  </p>

                  <p className="text-gray-600 text-sm">
                    <strong>{item.isShelter ? "Status" : "Severity"}:</strong> {item.severity}
                  </p>

                  {item.details && (
                    <p className="text-gray-500 text-xs italic">
                      {item.details}
                    </p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

      </div>

      <div className="flex gap-8 mt-6 text-sm flex-wrap">

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500"></span>
          <span className="text-gray-300">High</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
          <span className="text-gray-300">Moderate</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-green-500"></span>
          <span className="text-gray-300">Low</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-purple-500"></span>
          <span className="text-gray-300">Critical</span>
        </div>

      </div>

    </div>
  );
}
