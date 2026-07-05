import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import DisasterMap from "@/components/Maps/Maps";
import PageHeader from "@/components/Common/PageHeader";
import SearchBar from "@/components/Common/SearchBar";

export default function MapPage() {
  return (
    <div className="flex min-h-screen bg-[#26282D]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-8 space-y-8">

          <PageHeader
            title="Disaster Map"
            description="Monitor disasters, locate shelters, and visualize high-risk regions in real time."
          />

          {/* Search */}
          <SearchBar />

          {/* Filters */}
          <div className="flex flex-wrap gap-4">

            <button className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition">
              Flood
            </button>

            <button className="rounded-xl bg-orange-500 px-5 py-2 text-white hover:bg-orange-600 transition">
              Cyclone
            </button>

            <button className="rounded-xl bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600 transition">
              Wildfire
            </button>

            <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition">
              Earthquake
            </button>

            <button className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700 transition">
              Shelters
            </button>

          </div>

          {/* Interactive Map */}
          <DisasterMap />

          {/* Legend */}
          <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

            <h2 className="mb-5 text-2xl font-bold text-white">
              Map Legend
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-red-500"></span>
                <span className="text-gray-300">Flood</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-orange-500"></span>
                <span className="text-gray-300">Cyclone</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-yellow-500"></span>
                <span className="text-gray-300">Wildfire</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-blue-500"></span>
                <span className="text-gray-300">Earthquake</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-green-500"></span>
                <span className="text-gray-300">Shelter</span>
              </div>

            </div>

          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Live Map Activity
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between rounded-xl bg-[#26282D] p-4">
                <div>
                  <h3 className="font-semibold text-white">Flood Alert</h3>
                  <p className="text-sm text-gray-400">Hyderabad, Telangana</p>
                </div>
                <span className="rounded-full bg-red-500 px-3 py-1 text-sm text-white">
                  Critical
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#26282D] p-4">
                <div>
                  <h3 className="font-semibold text-white">Cyclone Warning</h3>
                  <p className="text-sm text-gray-400">Chennai, Tamil Nadu</p>
                </div>
                <span className="rounded-full bg-orange-500 px-3 py-1 text-sm text-white">
                  High
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#26282D] p-4">
                <div>
                  <h3 className="font-semibold text-white">Shelter Opened</h3>
                  <p className="text-sm text-gray-400">Bengaluru, Karnataka</p>
                </div>
                <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
                  Active
                </span>
              </div>

            </div>

          </div>

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}