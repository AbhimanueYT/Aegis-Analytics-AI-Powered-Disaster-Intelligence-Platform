import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

import Hero from "@/components/Hero/Hero";
import Cards from "@/components/Cards/Cards";
import Charts from "@/components/Charts/Charts";
import Map from "@/components/Maps/Maps";
import Alerts from "@/components/Alerts/Alerts";
import Shelter from "@/components/Shelter/Shelter";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#f6f3ee]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-8 space-y-8">
          <Hero />
          <Cards />
          <Charts />
          <Map />
          <Alerts />
          <Shelter />
          <Footer />
        </main>
      </div>

    </div>
  );
}