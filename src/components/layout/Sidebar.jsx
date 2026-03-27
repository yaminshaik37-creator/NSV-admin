"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Disclosure, Transition, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ChartPieIcon
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const SIDEBAR_ITEMS = [
  {
    icon: HomeIcon,
    href: "/",
    label: "Home",
  },
  {
    icon: ChartBarIcon,
    href: "/analytics",
    label: "Analytics",
  },
  {
    icon: GlobeAltIcon,
    href: "/global",
    label: "Global",
  },
  {
    icon: ChartPieIcon,
    href: "/reports",
    label: "Reports",
  },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left section - Logo and Welcome */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={80}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>

              {/* Welcome Message */}
              <div>
                <h1 className="text-2xl font-light text-gray-400">
                  Welcome Som
                </h1>
                <p className="text-sm text-gray-500">
                  Executive Executive Dashboard, Program Director
                </p>
              </div>
            </div>

            {/* Right section - Change Role Button and User Profile */}
            <div className="flex items-center gap-4">
              {/* Change Role Button */}
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Change Role
              </button>

              {/* User Profile Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Som</div>
                    <div className="text-xs text-gray-500">Online</div>
                  </div>
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold text-lg">
                      AS
                    </div>
                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                      00
                    </span>
                    {/* Online Indicator */}
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      {/* Vertical Icon Sidebar */}
      <div className="fixed left-0 top-[73px] bottom-0 w-24 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6 space-y-4 z-40">
        {SIDEBAR_ITEMS.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${index === 0
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="pl-24 pt-[73px]">
        <main className="min-h-screen bg-gray-50">{children}</main>
      </div>
    </>
  );
}
