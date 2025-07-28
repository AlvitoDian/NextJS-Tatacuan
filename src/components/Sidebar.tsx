"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Gauge,
  ChevronDown,
  User,
  HandCoins,
  ScrollText,
  List,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Gauge color="#16a34a" strokeWidth={2.25} size={20} />,
    href: "/dashboard",
  },
  {
    id: "transaction",
    label: "Transaksi",
    icon: <HandCoins color="#16a34a" strokeWidth={2.25} size={20} />,
    href: "/dashboard/transaction",
  },
  {
    id: "transaction-list",
    label: "Daftar Transaksi",
    icon: <ScrollText color="#16a34a" strokeWidth={2.25} size={20} />,
    href: "/dashboard/category",
  },
  {
    id: "category",
    label: "Kategori",
    icon: <List color="#16a34a" strokeWidth={2.25} size={20} />,
    href: "/dashboard/transaction-list",
  },
  {
    id: "account-settings",
    label: "Pengaturan Akun",
    icon: <User color="#16a34a" strokeWidth={2.25} size={20} />,
    href: "/dashboard/account-settings",
  },
];

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const [dropdowns, setDropdowns] = useState({});

  useEffect(() => {
    const initialDropdowns = {};
    menuItems.forEach((item) => {
      if (item.subItems) {
        const isActive = item.subItems.some(
          (subItem) => pathname === subItem.href
        );
        if (isActive) {
          initialDropdowns[item.id] = true;
        }
      }
    });
    setDropdowns(initialDropdowns);
  }, [pathname]);

  const toggleDropdown = (dropdownId) => {
    if (isOpen) {
      setDropdowns((prev) => ({
        ...prev,
        [dropdownId]: !prev[dropdownId],
      }));
    }
  };

  const isActive = (href) => {
    return pathname === href;
  };

  if (!isDashboard) return null;

  return (
    <div
      className={`transition-all duration-300 z-[100] h-full ease-in-out bg-white shadow-lg ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div
          className={`flex items-center justify-center py-5 border-b border-gray-100 mt-[55px] lg:mt-0 ${
            isOpen ? "px-4" : "px-2"
          }`}
        >
          <Link href={"/"}>
            {isOpen ? (
              <Image
                src="/assets/images/logo.png"
                alt="Nimbrunk Logo"
                width={130}
                height={40}
                className="h-10 w-auto"
              />
            ) : (
              <div className="w-8 h-8 bg-[#16a34a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-2 py-5 scrollbar-thin">
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  <div className="mb-1">
                    {isOpen ? (
                      <>
                        <button
                          type="button"
                          className="flex items-center justify-between w-full p-2.5 text-[#67748e] rounded-lg group hover:bg-gray-50 transition-colors"
                          onClick={() => toggleDropdown(item.id)}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-medium text-sm">
                              {item.label}
                            </span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ease-in-out ${
                              dropdowns[item.id] ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            dropdowns[item.id]
                              ? "max-h-40 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <ul className="pl-9 mt-1 space-y-1">
                            {item.subItems.map((subItem, index) => (
                              <li key={index}>
                                <Link
                                  href={subItem.href}
                                  className={`flex items-center p-2 text-sm rounded-md transition-colors ${
                                    isActive(subItem.href)
                                      ? "bg-gray-50 text-[#16a34a] font-medium"
                                      : "text-[#67748e] hover:bg-gray-50"
                                  }`}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      // Collapsed state - show only icon with dropdown tooltip
                      <div className="relative group">
                        <div className="flex items-center justify-center p-2.5 text-[#67748e] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          {item.icon}
                        </div>

                        {/* Dropdown Tooltip with sub-items */}
                        <div className="absolute left-full ml-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 min-w-max shadow-lg">
                          <div className="font-medium text-sm mb-2 text-[#16a34a]">
                            {item.label}
                          </div>
                          <div className="space-y-1">
                            {item.subItems.map((subItem, index) => (
                              <Link
                                key={index}
                                href={subItem.href}
                                className={`block px-2 py-1 text-xs text-gray-600 hover:text-white hover:bg-[#16a34a] rounded transition-colors ${
                                  isActive(subItem.href)
                                    ? "text-white bg-[#16a34a]"
                                    : ""
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-white"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative group">
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg transition-colors ${
                        isOpen ? "p-2.5" : "p-2.5 justify-center"
                      } ${
                        isActive(item.href)
                          ? "bg-gray-50 text-[#16a34a] font-medium"
                          : "text-[#67748e] hover:bg-gray-50"
                      }`}
                    >
                      <span className={isOpen ? "mr-3" : ""}>{item.icon}</span>
                      {isOpen && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </Link>

                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-white"></div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
