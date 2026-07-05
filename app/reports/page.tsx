"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/Common/PageHeader";
import { fetchIncidents, submitIncident, IncidentData } from "@/app/services/api";
import { AlertTriangle, Send, ShieldAlert, CheckCircle, MapPin, User, Phone, Tag } from "lucide-react";

export default function ReportsPage() {
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "Flood",
    description: "",
    reporter_name: "",
    contact: "",
  });

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = () => {
    setLoading(true);
    fetchIncidents().then((data) => {
      setIncidents(data);
      setLoading(false);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      setMessage({ type: "error", text: "Please fill in all required fields (Title, Location, and Description)." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const result = await submitIncident(formData);
    setSubmitting(false);

    if (result) {
      setMessage({ type: "success", text: "Incident reported successfully! The AI engine has analyzed and classified the severity." });
      setFormData({
        title: "",
        location: "",
        category: "Flood",
        description: "",
        reporter_name: "",
        contact: "",
      });
      // Reload incident feed
      loadIncidents();
    } else {
      setMessage({ type: "error", text: "Failed to submit report. Please check if the backend server is running." });
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "High":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
      case "Moderate":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      default:
        return "bg-green-500/20 text-green-400 border border-green-500/30";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#26282D]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 space-y-8">
          <PageHeader
            title="Incident Reporting Centre"
            description="Submit crisis details to dispatch authorities. Citizen reports are automatically processed and classified by our AI engine."
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="xl:col-span-1">
              <section className="bg-[#32353B] rounded-3xl p-6 border border-[#40444D] sticky top-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="text-red-400" size={22} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Report Incident</h2>
                </div>

                {message && (
                  <div
                    className={`p-4 mb-6 rounded-2xl text-sm flex gap-2 items-start border ${
                      message.type === "success"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {message.type === "success" ? <CheckCircle size={18} className="shrink-0" /> : <ShieldAlert size={18} className="shrink-0" />}
                    <span>{message.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Incident Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Severe waterlogging near bridge"
                      className="w-full rounded-xl bg-[#26282D] border border-[#40444D] p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F7F3EC] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Location <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Ameerpet, Hyderabad"
                        className="w-full rounded-xl bg-[#26282D] border border-[#40444D] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F7F3EC] transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-gray-300 text-sm font-semibold mb-2">
                        Initial Category
                      </label>
                      <div className="relative">
                        <Tag size={18} className="absolute left-3 top-3.5 text-gray-500" />
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full rounded-xl bg-[#26282D] border border-[#40444D] py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#F7F3EC] transition appearance-none"
                        >
                          <option value="Flood">Flood</option>
                          <option value="Cyclone">Cyclone</option>
                          <option value="Wildfire">Wildfire</option>
                          <option value="Earthquake">Earthquake</option>
                          <option value="Road Blockage">Road Blockage</option>
                          <option value="Medical Emergency">Medical Emergency</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Reporter Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        name="reporter_name"
                        value={formData.reporter_name}
                        onChange={handleInputChange}
                        placeholder="Anonymous (Optional)"
                        className="w-full rounded-xl bg-[#26282D] border border-[#40444D] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F7F3EC] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Contact Info
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder="Phone or Email (Optional)"
                        className="w-full rounded-xl bg-[#26282D] border border-[#40444D] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F7F3EC] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Please explain the situation and details here..."
                      className="w-full rounded-xl bg-[#26282D] border border-[#40444D] p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F7F3EC] transition resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-[#F7F3EC] py-3.5 font-bold text-[#26282D] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {submitting ? "Analyzing..." : "Submit Incident Report"}
                    <Send size={16} />
                  </button>
                </form>
              </section>
            </div>

            {/* List Column */}
            <div className="xl:col-span-2">
              <section className="bg-[#32353B] rounded-3xl p-6 border border-[#40444D] shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Live Incident Feed</h2>
                    <p className="text-gray-400 mt-1 text-sm">Citizen-reported local events</p>
                  </div>
                  <button
                    onClick={loadIncidents}
                    className="text-[#F7F3EC] hover:text-white text-sm font-semibold transition"
                  >
                    Refresh Feed
                  </button>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="text-gray-400 text-center py-12">Loading incident records...</div>
                  ) : incidents.length === 0 ? (
                    <div className="text-gray-400 text-center py-12">
                      No citizen reports logged yet. Start by filling the reporting form!
                    </div>
                  ) : (
                    incidents.map((incident) => (
                      <div
                        key={incident.id}
                        className="rounded-2xl bg-[#26282D] border border-[#40444D] p-5 hover:border-gray-500 transition-all duration-300"
                      >
                        <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                          <div>
                            <span className="text-xs bg-[#F7F3EC]/10 text-gray-300 border border-gray-600 rounded-lg px-2.5 py-1 font-semibold uppercase mr-2">
                              {incident.category}
                            </span>
                            <h3 className="text-white font-bold text-lg inline-block align-middle">
                              {incident.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1.5">
                              <MapPin size={14} />
                              <span>{incident.location}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getSeverityStyle(incident.severity)}`}>
                              {incident.severity}
                            </span>
                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {incident.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm bg-[#1e2024] p-3.5 rounded-xl border border-gray-800 leading-relaxed mb-4">
                          {incident.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 justify-between items-center">
                          <span className="flex items-center gap-1.5">
                            <User size={13} />
                            Reported by: <strong className="text-gray-400">{incident.reporter_name}</strong>
                          </span>
                          {incident.contact && (
                            <span className="flex items-center gap-1.5">
                              <Phone size={13} />
                              Contact: <span className="text-gray-400">{incident.contact}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
