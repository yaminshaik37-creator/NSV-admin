"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/images/logos/IC-logo1.png";
import Navigation from "../UI/Navigation";

const MainLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pattern-container z-1">
      {/* ===== NAVBAR ===== */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Image
                className="w-10 h-10"
                src={logo}
                alt="Internal Capsule"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-transparent bg-clip-text">
                Internal Capsule
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-3 space-y-1 bg-white/95 shadow-inner">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>

      {/* Optional Static Navigation Section */}
      <Navigation />

      {/* ===== PAGE CONTENT ===== */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
