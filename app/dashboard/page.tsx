import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#26282D]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}