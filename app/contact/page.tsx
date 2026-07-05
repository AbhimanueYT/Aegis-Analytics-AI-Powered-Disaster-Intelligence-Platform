import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/Common/PageHeader";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export default function ContactPage() {
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
            title="Contact Us"
            description="Reach out to the Aegis Analytics team for support, collaboration, or project inquiries."
          />

          <div className="grid gap-8 lg:grid-cols-2">

            {/* Contact Form */}

            <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-8">

              <h2 className="mb-6 text-2xl font-bold text-white">
                Send a Message
              </h2>

              <form className="space-y-5">

                <div>

                  <label className="mb-2 block text-gray-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-[#40444D] bg-[#26282D] px-4 py-3 text-white outline-none focus:border-[#F7F3EC]"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-[#40444D] bg-[#26282D] px-4 py-3 text-white outline-none focus:border-[#F7F3EC]"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-gray-300">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-xl border border-[#40444D] bg-[#26282D] px-4 py-3 text-white outline-none focus:border-[#F7F3EC]"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-gray-300">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Write your message..."
                    className="w-full rounded-xl border border-[#40444D] bg-[#26282D] px-4 py-3 text-white outline-none focus:border-[#F7F3EC]"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#F7F3EC] py-3 font-semibold text-[#26282D] transition hover:scale-105"
                >
                  Send Message
                </button>

              </form>

            </div>

            {/* Contact Information */}

            <div className="space-y-6">

              <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

                <div className="flex items-center gap-4">

                  <Mail className="text-[#F7F3EC]" size={28} />

                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      Email
                    </h3>

                    <p className="text-gray-400">
                      support@aegisanalytics.com
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

                <div className="flex items-center gap-4">

                  <Phone className="text-[#F7F3EC]" size={28} />

                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      Phone
                    </h3>

                    <p className="text-gray-400">
                      +91 98765 43210
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

                <div className="flex items-center gap-4">

                  <MapPin className="text-[#F7F3EC]" size={28} />

                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      Office
                    </h3>

                    <p className="text-gray-400">
                      Hyderabad, Telangana, India
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-3xl border border-[#40444D] bg-[#32353B] p-6">

                <div className="flex items-center gap-4">

                  <Clock className="text-[#F7F3EC]" size={28} />

                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      Working Hours
                    </h3>

                    <p className="text-gray-400">
                      Monday – Friday
                    </p>

                    <p className="text-gray-400">
                      9:00 AM – 6:00 PM
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </main>

        <Footer />

      </div>

    </div>
  );
}