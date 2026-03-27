"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [{ to: "/manage-patients", label: "Patients" }];

    switch (user.role) {
      case "OWNER_ADMIN":
        return [
          { to: "/", label: "Dashboard", end: true },
          { to: "/manage-centers", label: "Centers" },
          { to: "/test-catalog", label: "Test Catalog" },
          { to: "/role-management", label: "Role Management" },
          { to: "/activity-log", label: "Activity Log" },
          ...commonItems,
        ];
      case "DIAGNOSTIC_ADMIN":
        return [
          { to: "/", label: "Dashboard", end: true },
          { to: "/manage-tests", label: "Tests" },
          { to: "/manage-doctors", label: "Clinician" },
          { to: "/appointments", label: "Appointments" },
          { to: "/manage-staff", label: "Staff" },
          { to: "/holiday-calendar", label: "Calendar" },
          { to: "/test-search", label: "Test Search" },
          { to: "/manage-resources", label: "Manage Resources" },
          { to: "/manage-time-based-discounts", label: "Manage Time-Based Discounts" },
          { to: "/role-management", label: "Role Management" },
          { to: "/activity-log", label: "Activity Log" },
          ...commonItems,
        ];
      case "DOCTOR":
        return [
          { to: "/", label: "Dashboard", end: true },
          { to: "/book-appointment", label: "Book Appointment" },
          { to: "/manage-patients", label: "Manage Patients" },
          { to: "/doctor-payments", label: "Clinician Payments" },
          ...commonItems,
        ];
      case "PATIENT":
        return [
          { to: "/", label: "Dashboard", end: true },
          { to: "/book-appointment", label: "Book Appointment" },
          { to: "/doctor-payments", label: "Clinician Payments" },
          ...commonItems,
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  // Function to check if link is active (supporting 'end' like NavLink)
  const isActiveLink = (to, end) => {
    if (end) {
      return pathname === to;
    }
    // For non-end links, check if pathname starts with 'to'
    return pathname.startsWith(to);
  };

  return (
    <div className="sticky top-16 z-10 px-4 py-2 bg-gray-100 border-b border-gray-200 overflow-x-auto">
      <div className="flex space-x-1">
        {navItems.map(({ to, label, end }) => {
          const active = isActiveLink(to, end);
          return (
            <Link
              key={to}
              href={to}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${active
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"
                }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
