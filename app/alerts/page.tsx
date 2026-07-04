import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Alerts from "@/components/Alerts/Alerts";
import PageHeader from "@/components/Common/PageHeader";
import SearchBar from "@/components/Common/SearchBar";

export default function AlertsPage() {
  return (
    <div className="flex min-h-screen bg-[#26282D]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-8">

          <PageHeader
            title="Emergency Alerts"
            description="Monitor real-time disaster alerts, warnings, and emergency notifications."
          />

          {/* Search */}
          <div className="mb-8">
            <SearchBar />
          </div>

          {/* Filter Buttons */}
          <div className="mb-8 flex flex-wrap gap-4">

            <button className="rounded-xl bg-red-600 px-5 py-2 text-white font-medium hover:bg-red-700 transition">
              Critical
            </button>

            <button className="rounded-xl bg-orange-500 px-5 py-2 text-white font-medium hover:bg-orange-600 transition">
              High
            </button>

            <button className="rounded-xl bg-yellow-500 px-5 py-2 text-white font-medium hover:bg-yellow-600 transition">
              Moderate
            </button>

            <button className="rounded-xl bg-green-600 px-5 py-2 text-white font-medium hover:bg-green-700 transition">
              Low
            </button>

          </div>

          {/* Alerts Component */}
          <Alerts />

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}