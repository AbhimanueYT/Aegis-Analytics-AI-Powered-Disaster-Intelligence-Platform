"use client";

import Link from "next/link";
import { Mail, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#40444D] bg-[#26282D]">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F3EC]">
                <ShieldCheck className="text-[#26282D]" size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Aegis Analytics
                </h2>

                <p className="text-sm text-gray-400">
                  Disaster Intelligence Platform
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              AI-powered disaster monitoring, predictive analytics,
              emergency alerts, and shelter management to improve
              disaster preparedness and emergency response.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Platform
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/dashboard" className="hover:text-[#F7F3EC] transition">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/map" className="hover:text-[#F7F3EC] transition">
                  Disaster Map
                </Link>
              </li>

              <li>
                <Link href="/analytics" className="hover:text-[#F7F3EC] transition">
                  AI Analytics
                </Link>
              </li>

              <li>
                <Link href="/alerts" className="hover:text-[#F7F3EC] transition">
                  Emergency Alerts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/shelters" className="hover:text-[#F7F3EC] transition">
                  Shelters
                </Link>
              </li>

              <li>
                <Link href="/team" className="hover:text-[#F7F3EC] transition">
                  Team
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-[#F7F3EC] transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-[#F7F3EC] transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="rounded-2xl bg-[#32353B] border border-[#40444D] p-5">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-[#F7F3EC]" />
                <span>support@aegisanalytics.com</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                Need assistance or want to collaborate? Reach out to our team
                and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#40444D] pt-6 md:flex-row">

          <p className="text-sm text-gray-500">
            © 2026 Aegis Analytics. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            Built with
            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />
            for safer communities.
          </p>

        </div>

      </div>
    </footer>
  );
}