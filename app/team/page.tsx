import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/Common/PageHeader";

import {
  User,
  Code2,
  BrainCircuit,
  Database,
  Globe,
  Mail,
} from "lucide-react";

const teamMembers = [
  {
    name: "Rakshitha Karnam",
    role: "Frontend Developer",
    icon: Code2,
    description:
      "Designed and developed the responsive user interface using Next.js, React, and Tailwind CSS.",
  },
  {
    name: "Team Member 2",
    role: "Backend Developer",
    icon: Database,
    description:
      "Built REST APIs, managed the database, and integrated backend services.",
  },
  {
    name: "Team Member 3",
    role: "AI/ML Engineer",
    icon: BrainCircuit,
    description:
      "Developed AI models for disaster prediction, risk analysis, and emergency recommendations.",
  },
  {
    name: "Team Member 4",
    role: "Research & Testing",
    icon: Globe,
    description:
      "Collected datasets, tested system functionality, and validated application performance.",
  },
];

export default function TeamPage() {
  return (
    <div className="flex min-h-screen bg-[#26282D]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-8 space-y-10">

          <PageHeader
            title="Meet Our Team"
            description="The passionate team behind Aegis Analytics working together to improve disaster preparedness through technology."
          />

          {/* Project Overview */}
          <section className="rounded-3xl border border-[#40444D] bg-[#32353B] p-8">

            <h2 className="text-3xl font-bold text-white">
              About Aegis Analytics
            </h2>

            <p className="mt-4 leading-8 text-gray-400">
              Aegis Analytics is an AI-powered disaster intelligence platform
              that helps governments, emergency responders, NGOs, and citizens
              monitor disasters, predict risks, locate shelters, and receive
              real-time emergency alerts through an interactive dashboard.
            </p>

          </section>

          {/* Team Members */}
          <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {teamMembers.map((member) => {
              const Icon = member.icon;

              return (
                <div
                  key={member.name}
                  className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#F7F3EC]"
                >

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F3EC]">

                    <Icon
                      className="text-[#26282D]"
                      size={38}
                    />

                  </div>

                  <h3 className="mt-6 text-center text-xl font-bold text-white">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-center font-medium text-[#F7F3EC]">
                    {member.role}
                  </p>

                  <p className="mt-4 text-center text-sm leading-7 text-gray-400">
                    {member.description}
                  </p>

                  <div className="mt-6 flex justify-center gap-4">

                    <button className="rounded-xl bg-[#26282D] p-3 transition hover:bg-[#F7F3EC] hover:text-[#26282D]">
                      <Mail size={20} />
                    </button>

                  </div>

                </div>
              );
            })}

          </section>

          {/* Tech Stack */}
          <section className="rounded-3xl border border-[#40444D] bg-[#32353B] p-8">

            <h2 className="mb-6 text-3xl font-bold text-white">
              Technologies Used
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                Next.js
              </div>

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                React
              </div>

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                Tailwind CSS
              </div>

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                Recharts
              </div>

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                React Leaflet
              </div>

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                Framer Motion
              </div>

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                TypeScript
              </div>

              <div className="rounded-2xl bg-[#26282D] p-5 text-center text-white">
                AI & Analytics
              </div>

            </div>

          </section>

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}