import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Shelter from "@/components/Shelter/Shelter";
import PageHeader from "@/components/Common/PageHeader";
import SearchBar from "@/components/Common/SearchBar";

import {
  Hospital,
  Users,
  Phone,
  Navigation,
} from "lucide-react";

const shelters = [
  {
    name: "Hyderabad Relief Center",
    capacity: "320 / 500",
    status: "Available",
    contact: "+91 98765 43210",
    location: "Hyderabad",
    color: "bg-green-500",
  },
  {
    name: "Chennai Emergency Camp",
    capacity: "480 / 500",
    status: "Nearly Full",
    contact: "+91 98765 12345",
    location: "Chennai",
    color: "bg-yellow-500",
  },
  {
    name: "Bengaluru Safe Shelter",
    capacity: "500 / 500",
    status: "Full",
    contact: "+91 99887 66554",
    location: "Bengaluru",
    color: "bg-red-500",
  },
];

export default function SheltersPage() {
  return (
    <div className="flex min-h-screen bg-[#26282D]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-8 space-y-8">

          <PageHeader
            title="Emergency Shelters"
            description="Locate nearby shelters, monitor capacity, and access emergency contact information."
          />

          {/* Search */}
          <SearchBar />

          {/* Existing Shelter Component */}
          <Shelter />

          {/* Shelter Cards */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {shelters.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6 transition hover:-translate-y-1 hover:border-[#F7F3EC]"
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="rounded-2xl bg-[#26282D] p-3">
                      <Hospital className="text-[#F7F3EC]" size={28} />
                    </div>

                    <div>

                      <h2 className="font-bold text-white">
                        {item.name}
                      </h2>

                      <p className="text-sm text-gray-400">
                        {item.location}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`h-3 w-3 rounded-full ${item.color}`}
                  />

                </div>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center gap-3 text-gray-300">
                    <Users size={18} />
                    <span>Capacity: {item.capacity}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone size={18} />
                    <span>{item.contact}</span>
                  </div>

                </div>

                <div className="mt-6">

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="text-gray-400">
                      Status
                    </span>

                    <span className="text-white font-semibold">
                      {item.status}
                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#26282D]">

                    <div
                      className={`${item.color} h-full rounded-full`}
                      style={{
                        width:
                          item.status === "Available"
                            ? "65%"
                            : item.status === "Nearly Full"
                            ? "90%"
                            : "100%",
                      }}
                    />

                  </div>

                </div>

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F7F3EC] py-3 font-semibold text-[#26282D] transition hover:scale-105">

                  <Navigation size={18} />

                  Get Directions

                </button>

              </div>
            ))}

          </section>

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}