"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Map,
  House,
  Brain,
  BarChart3,
  FileText,
  Folder,
  Settings,
  ShieldAlert,
} from "lucide-react";

const menuItems = [
  {
    title: "CONTROL CENTRE",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Active Alerts",
        href: "/alerts",
        icon: Bell,
      },
      {
        name: "Disaster Map",
        href: "/map",
        icon: Map,
      },
      {
        name: "Shelters",
        href: "/shelters",
        icon: House,
      },
      {
        name: "AI Predictions",
        href: "/analytics",
        icon: Brain,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        name: "Reports",
        href: "/reports",
        icon: FileText,
      },
      {
        name: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        name: "Resources",
        href: "/resources",
        icon: Folder,
      },
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[285px] min-h-screen bg-[#F7F3EC] border-r border-[#E5DED3] flex flex-col justify-between">

      <div>

        {/* Logo */}

        <div className="px-8 pt-10 pb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-[#26282D] flex items-center justify-center shadow-md">

              <ShieldAlert className="text-[#F7F3EC]" size={24} />

            </div>

            <div>

              <h1 className="font-bold text-3xl text-[#222]">
                Aegis Analytics
              </h1>

              <p className="text-gray-500 text-sm">
                Disaster Intelligence
              </p>

            </div>

          </div>

        </div>

        {menuItems.map((section) => (
          <div key={section.title} className="px-6 mb-10">

            <p className="text-xs tracking-[0.3em] text-gray-500 font-semibold mb-5">
              {section.title}
            </p>

            <div className="space-y-2">

              {section.items.map((item) => {
                const Icon = item.icon;

                const active = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300

                    ${
                      active
                        ? "bg-white shadow-lg text-[#111]"
                        : "text-gray-700 hover:bg-white hover:shadow-md"
                    }
                    `}
                  >
                    <Icon size={22} />

                    <span className="font-medium text-[16px]">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Card */}

      <div className="p-6">

        <div className="rounded-3xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex gap-3">

              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

                <ShieldAlert
                  className="text-red-600"
                  size={22}
                />

              </div>

              <div>

                <h3 className="font-bold text-red-600">
                  Emergency Mode
                </h3>

                <p className="text-gray-500 text-sm">
                  Enabled
                </p>

              </div>

            </div>

            <span className="text-2xl text-red-600">
              →
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}