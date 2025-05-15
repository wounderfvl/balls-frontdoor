// filepath: c:\laragon\www\GitHub\balls-frontdoor\components\ui\sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaGift,
  FaExchangeAlt,
  FaChartLine,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: FaHome, label: "Dashboard", path: "/admin/dashboard" },
    { icon: FaGift, label: "Loyalty", path: "/admin/loyalty" },
    { icon: FaExchangeAlt, label: "Transactions", path: "/admin/transactions" },
    { icon: FaChartLine, label: "Finance", path: "/admin/finance" },
    { icon: FaUserShield, label: "Super Admin", path: "/admin/super-admin" },
  ];

  return (
    <div className="bg-red-600 text-white h-screen w-48 fixed left-0 top-0 flex flex-col">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-16 h-16 bg-transparent border-2 border-white rounded-full flex items-center justify-center mb-2">
          <FaUser className="text-white text-2xl" />
        </div>
        <h2 className="text-lg font-bold">Admin BAS</h2>
      </div>

      <nav className="flex-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>
                <div
                  className={`flex items-center space-x-3 px-6 py-4 ${
                    pathname === item.path ? "bg-red-700" : ""
                  } hover:bg-red-700 cursor-pointer`}
                >
                  <item.icon className="text-white" />
                  <span>{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
