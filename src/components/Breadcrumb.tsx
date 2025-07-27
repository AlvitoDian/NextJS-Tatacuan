"use client"; // Ensure this file is treated as a client component

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  breadcrumb: BreadcrumbItem[];
  title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb, title }) => {
  const currentPath = usePathname(); // Use the usePathname hook from next/navigation

  return (
    <div className="mb-4">
      <span className="font-bold text-2xl text-[#333333]">{title}</span>
      <ul className="flex text-sm text-gray-600">
        {breadcrumb.map((item, index) => {
          const isActive = currentPath === item.href; // Compare pathname

          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <Link
                href={item.href}
                className={`text-[#67748e]  ${
                  isActive ? "font-semibold text-[#16a34a]" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
