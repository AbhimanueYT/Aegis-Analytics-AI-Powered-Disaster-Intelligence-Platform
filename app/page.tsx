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
    <div className="bg-[#f6f3ee] min-h-screen">

      <Navbar />
      <Sidebar />

      <main className="ml-64 pt-20">

        <Hero />
        <Cards />
        <Charts />
        <Map />
        <Alerts />
        <Shelter />

        <Footer />

      </main>

    </div>
  );
}