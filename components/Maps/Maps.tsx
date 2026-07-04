"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { AlertTriangle } from "lucide-react";
import "leaflet/dist/leaflet.css";

const disasters = [
  {
    id: 1,
    name: "Flood",
    city: "Hyderabad",
    position: [17.385, 78.4867],
    color: "#ef4444",
    severity: "High",
  },
  {
    id: 2,
    name: "Cyclone",
    city: "Chennai",
    position: [13.0827, 80.2707],
    color: "#f59e0b",
    severity: "Moderate",
  },
  {
    id: 3,
    name: "Earthquake",
    city: "Delhi",
    position: [28.6139, 77.209],
    color: "#8b5cf6",
    severity: "Critical",
  },
  {
    id: 4,
    name: "Wildfire",
    city: "Bengaluru",
    position: [12.9716, 77.5946],
    color: "#22c55e",
    severity: "Low",
  },
];

export default function DisasterMap() {
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

          {disasters.map((item) => (
            <CircleMarker
              key={item.id}
              center={item.position as [number, number]}
              radius={12}
              pathOptions={{
                color: item.color,
                fillColor: item.color,
                fillOpacity: 0.8,
              }}
            >
              <Popup>

                <div className="space-y-2">

                  <div className="flex items-center gap-2">

                    <AlertTriangle
                      size={18}
                      className="text-red-500"
                    />

                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                  </div>

                  <p>
                    <strong>Location:</strong> {item.city}
                  </p>

                  <p>
                    <strong>Severity:</strong> {item.severity}
                  </p>

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