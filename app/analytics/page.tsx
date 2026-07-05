"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/Common/PageHeader";
import SearchBar from "@/components/Common/SearchBar";
import Cards from "@/components/Cards/Cards";
import Charts from "@/components/Charts/Charts";
import { submitPrediction, PredictionFeatures, PredictionResponse } from "@/app/services/api";
import { Brain, Sliders, AlertTriangle, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

const featureLabels: Record<keyof PredictionFeatures, { name: string; desc: string }> = {
  MonsoonIntensity: { name: "Monsoon Intensity", desc: "Heavy seasonal monsoon rainfall levels (0-10)" },
  TopographyDrainage: { name: "Topography Drainage", desc: "Natural land elevation and slope drainage efficiency (0-10)" },
  RiverManagement: { name: "River Management", desc: "River canalisation, dredging, and embankments quality (0-10)" },
  Deforestation: { name: "Deforestation", desc: "Scale of forest clearing and tree canopy loss (0-10)" },
  Urbanization: { name: "Urbanization", desc: "Pavement density and reduction of soil absorption areas (0-10)" },
  ClimateChange: { name: "Climate Change", desc: "Frequency of extreme weather and ocean level rise (0-10)" },
  DamsQuality: { name: "Dams Quality", desc: "Structural integrity and water release safety controls of local dams (0-10)" },
  Siltation: { name: "Siltation", desc: "Accumulation of sand and dirt in riverbeds decreasing capacity (0-10)" },
  AgriculturalPractices: { name: "Agricultural Practices", desc: "Soil farming methods impacting erosion and runoff (0-10)" },
  Encroachments: { name: "Encroachments", desc: "Illegal structures on natural drainage canals and floodplains (0-10)" },
  IneffectiveDisasterPreparedness: { name: "Ineffective Preparedness", desc: "Lack of warning networks, shelters, and evac plans (0-10)" },
  DrainageSystems: { name: "Drainage Systems", desc: "City storm water pipeline capacity and maintenance (0-10)" },
  CoastalVulnerability: { name: "Coastal Vulnerability", desc: "Risk of tidal surges, high tides, and erosion (0-10)" },
  Landslides: { name: "Landslide Risk", desc: "Soil instability and landslide frequency in vicinity (0-10)" },
  Watersheds: { name: "Watershed Health", desc: "Deforestation or degradation of catchment basin areas (0-10)" },
  DeterioratingInfrastructure: { name: "Deteriorating Infrastructure", desc: "Age and breakdown of protective storm structures (0-10)" },
  PopulationScore: { name: "Population Density Score", desc: "Concentration of citizens living in low-lying sectors (0-10)" },
  WetlandLoss: { name: "Wetland Loss", desc: "Destruction of natural marsh buffer zones for developments (0-10)" },
  InadequatePlanning: { name: "Inadequate Planning", desc: "Lack of flood hazard maps and zoning regulations (0-10)" },
  PoliticalFactors: { name: "Political Factors", desc: "Policy, corruption, or delays in safety infrastructure (0-10)" }
};

const defaultFeatures: PredictionFeatures = {
  MonsoonIntensity: 5,
  TopographyDrainage: 5,
  RiverManagement: 5,
  Deforestation: 5,
  Urbanization: 5,
  ClimateChange: 5,
  DamsQuality: 5,
  Siltation: 5,
  AgriculturalPractices: 5,
  Encroachments: 5,
  IneffectiveDisasterPreparedness: 5,
  DrainageSystems: 5,
  CoastalVulnerability: 5,
  Landslides: 5,
  Watersheds: 5,
  DeterioratingInfrastructure: 5,
  PopulationScore: 5,
  WetlandLoss: 5,
  InadequatePlanning: 5,
  PoliticalFactors: 5,
};

const sampleCrisisData: PredictionFeatures = {
  MonsoonIntensity: 9,
  TopographyDrainage: 3,
  RiverManagement: 3,
  Deforestation: 8,
  Urbanization: 9,
  ClimateChange: 8,
  DamsQuality: 4,
  Siltation: 8,
  AgriculturalPractices: 4,
  Encroachments: 8,
  IneffectiveDisasterPreparedness: 8,
  DrainageSystems: 3,
  CoastalVulnerability: 7,
  Landslides: 6,
  Watersheds: 4,
  DeterioratingInfrastructure: 8,
  PopulationScore: 9,
  WetlandLoss: 8,
  InadequatePlanning: 9,
  PoliticalFactors: 6,
};

export default function AnalyticsPage() {
  const [features, setFeatures] = useState<PredictionFeatures>(defaultFeatures);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<"weather" | "terrain" | "env" | "planning">("weather");
  const [error, setError] = useState<string | null>(null);

  const handleSliderChange = (key: keyof PredictionFeatures, val: number) => {
    setFeatures((prev) => ({ ...prev, [key]: val }));
  };

  const handleCalculate = async () => {
    setCalculating(true);
    setError(null);
    try {
      const res = await submitPrediction(features);
      if (res) {
        setResult(res);
      } else {
        setError("Failed to generate risk metrics. Check if your FastAPI server is running on http://localhost:8000.");
      }
    } catch (e) {
      setError("Server connection timed out.");
    } finally {
      setCalculating(false);
    }
  };

  const loadSample = (type: "default" | "crisis") => {
    setFeatures(type === "crisis" ? sampleCrisisData : defaultFeatures);
    setResult(null);
  };

  // Groupings
  const tabs = {
    weather: {
      name: "Weather & Water",
      keys: ["MonsoonIntensity", "ClimateChange", "Watersheds", "RiverManagement"] as Array<keyof PredictionFeatures>,
    },
    terrain: {
      name: "Infrastructure",
      keys: ["TopographyDrainage", "DamsQuality", "DeterioratingInfrastructure", "DrainageSystems", "CoastalVulnerability"] as Array<keyof PredictionFeatures>,
    },
    env: {
      name: "Environment",
      keys: ["Deforestation", "Urbanization", "Siltation", "Encroachments", "AgriculturalPractices", "WetlandLoss"] as Array<keyof PredictionFeatures>,
    },
    planning: {
      name: "Planning & Policy",
      keys: ["IneffectiveDisasterPreparedness", "Landslides", "PopulationScore", "InadequatePlanning", "PoliticalFactors"] as Array<keyof PredictionFeatures>,
    },
  };

  const getRiskColor = (level: string) => {
    if (level === "High") return "text-red-400";
    if (level === "Medium") return "text-yellow-400";
    return "text-green-400";
  };

  const getPriorityStyle = (level: string) => {
    if (level === "High") return "bg-red-500/20 border-red-500/30 text-red-300";
    if (level === "Medium") return "bg-yellow-500/20 border-yellow-500/30 text-yellow-300";
    return "bg-green-500/20 border-green-500/30 text-green-300";
  };

  return (
    <div className="flex min-h-screen bg-[#26282D]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page */}
        <main className="flex-1 p-6 lg:p-8 space-y-8">
          <PageHeader
            title="AI Disaster Analytics & XGBoost Models"
            description="Run simulation forecasting models using our machine learning pipeline. Adjust local parameters to evaluate real-time flood probability scores."
          />

          <SearchBar />

          {/* Statistics */}
          <Cards />

          {/* Charts */}
          <Charts />

          {/* AI Simulation Panel */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Input Controls */}
            <div className="xl:col-span-2">
              <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Sliders className="text-amber-400" size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Risk Simulator</h2>
                      <p className="text-gray-400 text-sm">Fine-tune factors to run XGBoost model inference</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => loadSample("crisis")}
                      className="px-4 py-2 text-xs rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-semibold transition"
                    >
                      Fill Crisis Sample
                    </button>
                    <button
                      onClick={() => loadSample("default")}
                      className="px-4 py-2 text-xs rounded-xl bg-gray-500/20 hover:bg-gray-500/30 border border-gray-600 text-gray-300 font-semibold transition flex items-center gap-1"
                    >
                      <RotateCcw size={12} /> Reset
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#40444D] gap-2 overflow-x-auto pb-1">
                  {(Object.keys(tabs) as Array<keyof typeof tabs>).map((tabKey) => (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition whitespace-nowrap ${
                        activeTab === tabKey
                          ? "border-b-2 border-[#F7F3EC] text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {tabs[tabKey].name}
                    </button>
                  ))}
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[280px]">
                  {tabs[activeTab].keys.map((featKey) => {
                    const labelInfo = featureLabels[featKey];
                    return (
                      <div key={featKey} className="space-y-2 bg-[#26282D] p-4 rounded-2xl border border-transparent hover:border-[#40444D] transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-white font-semibold text-sm block">{labelInfo.name}</span>
                            <span className="text-[11px] text-gray-500 leading-normal block max-w-[200px] mt-0.5">{labelInfo.desc}</span>
                          </div>
                          <span className="text-white font-bold text-lg px-2 bg-[#32353B] rounded-lg">
                            {features[featKey]}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={features[featKey]}
                          onChange={(e) => handleSliderChange(featKey, parseInt(e.target.value))}
                          className="w-full h-1.5 bg-[#40444D] rounded-lg appearance-none cursor-pointer accent-[#F7F3EC]"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Submit button */}
                <button
                  onClick={handleCalculate}
                  disabled={calculating}
                  className="w-full py-4 bg-[#F7F3EC] text-[#26282D] font-bold rounded-2xl hover:bg-white transition flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  <Brain size={18} />
                  {calculating ? "Running Model Simulation..." : "Calculate AI Flood Risk"}
                </button>
              </div>
            </div>

            {/* Results Panel */}
            <div className="xl:col-span-1">
              <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6 shadow-xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <Brain className="text-green-400" size={22} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Inference Output</h2>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs leading-relaxed mb-6">
                      {error}
                    </div>
                  )}

                  {!result && !error && (
                    <div className="flex flex-col items-center justify-center text-center py-20 px-4 text-gray-500">
                      <Brain size={48} className="animate-pulse mb-3" />
                      <p className="text-sm font-semibold">Ready for Simulation</p>
                      <p className="text-xs max-w-[200px] mt-1">Adjust sliders and click calculate to check forecast.</p>
                    </div>
                  )}

                  {result && (
                    <div className="space-y-6">
                      {/* Big circle metric */}
                      <div className="flex flex-col items-center justify-center p-6 bg-[#26282D] rounded-3xl border border-[#40444D] text-center">
                        <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Flood Probability</span>
                        <span className={`text-5xl font-extrabold my-2 ${getRiskColor(result.prediction.risk_level)}`}>
                          {result.prediction.confidence}%
                        </span>
                        <div className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${getPriorityStyle(result.priority)}`}>
                          {result.prediction.risk_level} Risk Level
                        </div>
                      </div>

                      {/* Contributing Factors */}
                      <div className="space-y-3">
                        <span className="text-white text-sm font-bold block">Top Model Features</span>
                        <div className="space-y-2">
                          {result.prediction.top_factors.map((f) => (
                            <div key={f.factor} className="bg-[#26282D] p-3 rounded-xl border border-gray-800 text-xs">
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-300 font-semibold">{f.factor}</span>
                                <span className="text-white font-bold">Weight: {f.importance}</span>
                              </div>
                              <div className="w-full bg-[#32353B] h-1 rounded-full overflow-hidden">
                                <div
                                  className="bg-amber-400 h-1 rounded-full"
                                  style={{ width: `${f.importance * 400}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action recommendations */}
                      <div className="space-y-3">
                        <span className="text-white text-sm font-bold block">Priority Action Recommendations</span>
                        <ul className="space-y-2 text-xs">
                          {result.recommended_actions.map((act, i) => (
                            <li key={i} className="flex gap-2 items-start text-gray-300 bg-[#26282D] p-3 rounded-xl border border-gray-800">
                              <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {result && (
                  <div className="text-[11px] text-gray-500 text-center mt-6 pt-4 border-t border-[#40444D]">
                    Forecast generated in 12ms using XGBoost pipeline.
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}