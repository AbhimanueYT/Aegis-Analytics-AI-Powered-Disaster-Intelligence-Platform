import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import PageHeader from "@/components/Common/PageHeader";
import SearchBar from "@/components/Common/SearchBar";

import Cards from "@/components/Cards/Cards";
import Charts from "@/components/Charts/Charts";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#26282D]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page */}
        <main className="flex-1 p-8 space-y-8">

          <PageHeader
            title="AI Disaster Analytics"
            description="Monitor disaster trends, AI predictions, and emergency response performance."
          />

          <SearchBar />

          {/* Statistics */}
          <Cards />

          {/* Charts */}
          <Charts />

          {/* AI Insights */}

          <section className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6">

              <h2 className="text-2xl font-bold text-white">
                AI Prediction
              </h2>

              <p className="mt-2 text-gray-400">
                Flood probability has increased by
                <span className="font-bold text-red-400">
                  {" "}18%
                </span>
                during the last 24 hours.
              </p>

            </div>

            <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6">

              <h2 className="text-2xl font-bold text-white">
                Highest Risk Region
              </h2>

              <p className="mt-2 text-gray-400">
                Hyderabad is currently identified as the
                highest-risk region due to heavy rainfall.
              </p>

            </div>

            <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6">

              <h2 className="text-2xl font-bold text-white">
                Response Efficiency
              </h2>

              <p className="mt-2 text-gray-400">
                Emergency response teams reached
                <span className="font-bold text-green-400">
                  {" "}97%
                </span>
                of affected areas within the target response time.
              </p>

            </div>

          </section>

          {/* Recent Predictions */}

          <section className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6">

            <h2 className="text-2xl font-bold text-white mb-6">
              Recent AI Predictions
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-[#40444D] text-left text-gray-400">

                    <th className="pb-4">Disaster</th>
                    <th className="pb-4">Location</th>
                    <th className="pb-4">Risk</th>
                    <th className="pb-4">Confidence</th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b border-[#40444D]">

                    <td className="py-4 text-white">
                      Flood
                    </td>

                    <td className="text-gray-300">
                      Hyderabad
                    </td>

                    <td className="text-red-400 font-semibold">
                      High
                    </td>

                    <td className="text-green-400">
                      96%
                    </td>

                  </tr>

                  <tr className="border-b border-[#40444D]">

                    <td className="py-4 text-white">
                      Cyclone
                    </td>

                    <td className="text-gray-300">
                      Chennai
                    </td>

                    <td className="text-orange-400 font-semibold">
                      Moderate
                    </td>

                    <td className="text-green-400">
                      92%
                    </td>

                  </tr>

                  <tr>

                    <td className="py-4 text-white">
                      Wildfire
                    </td>

                    <td className="text-gray-300">
                      Bengaluru
                    </td>

                    <td className="text-yellow-400 font-semibold">
                      Medium
                    </td>

                    <td className="text-green-400">
                      89%
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </section>

        </main>

        <Footer />

      </div>

    </div>
  );
}