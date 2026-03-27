"use client";

import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/images/logos/IC-logo1.png";
import Image from "next/image";
import Navigation from "../UI/Navigation";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userMessages, setUserMessages] = useState([]);

  const userMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);

  // Update userMessages filtered for this user
  useEffect(() => {
    if (user && Array.isArray(user.messages)) {
      const filteredMessages = user.messages.filter(
        (msg) => msg.recipientId === user.id
      );
      setUserMessages(filteredMessages);
    } else {
      setUserMessages([]);
    }
  }, [user]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markMessageAsRead = (id) => {
    setUserMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, readStatus: true } : msg
      )
    );
  };

  const unreadCount = userMessages.filter((msg) => !msg.readStatus).length;

  const getDashboardLink = () => {
    if (!user) return null;
    return "/";
  };

  const dashboardLink = getDashboardLink();

  return (
    <div className="min-h-screen bg-pattern-container z-1">
      <nav className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Image className="w-10 h-10" src={logo} alt="Internal Capsule" />
              <span className="text-2 xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-transparent bg-clip-text">
                Internal Capsule
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user && (
                <>
                  {dashboardLink && (
                    <Link
                      href={dashboardLink}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Dashboard
                    </Link>
                  )}

                  {/* Notifications */}
                  <div className="relative" ref={notificationMenuRef}>
                    <button
                      onClick={() => setShowNotifications((v) => !v)}
                      className="text-gray-600 hover:text-indigo-600 relative"
                      aria-label="Notifications"
                    >
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-30">
                        <div className="py-2">
                          <div className="px-4 py-2 bg-gray-100 flex justify-between text-sm font-medium text-gray-800">
                            <span>Notifications</span>
                            {userMessages.length > 0 && (
                              <button
                                onClick={() =>
                                  userMessages.forEach((msg) =>
                                    markMessageAsRead(msg.id)
                                  )
                                }
                                className="text-indigo-600 hover:text-indigo-800 text-xs"
                              >
                                Mark all as read
                              </button>
                            )}
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {userMessages.length > 0 ? (
                              userMessages.map((msg) => (
                                <div
                                  key={msg.id}
                                  onClick={() => markMessageAsRead(msg.id)}
                                  className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${!msg.readStatus ? "bg-blue-50" : ""
                                    }`}
                                >
                                  <p className="text-sm font-medium text-gray-900">
                                    {msg.subject}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {msg.body}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(msg.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-sm text-gray-500">
                                No notifications
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu((v) => !v)}
                      className="flex items-center space-x-2"
                      aria-label="User menu"
                    >
                      <span className="hidden sm:block text-gray-600 truncate max-w-[120px]">
                        {user.email}
                      </span>
                      <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                        {user.name
                          ? user.name[0]?.toUpperCase()
                          : user.email[0]?.toUpperCase()}
                      </div>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-30">
                        <div className="py-1">
                          <div className="px-4 py-2 bg-gray-100">
                            <p className="text-sm font-medium text-gray-800">{user.name || user.email}</p>
                            <p className="text-xs text-gray-500">{user.role === 'OWNER_ADMIN' ? 'Admin' :
                              user.role === 'DIAGNOSTIC_ADMIN' ? 'Diagnostic' : 'Clinician'}</p>
                          </div>
                          <a
                            href="#"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={(e) => e.preventDefault()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Profile
                          </a>
                          <a
                            href="#"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={(e) => e.preventDefault()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </a>
                          <div className="border-t border-gray-100"></div>
                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
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

        {/* Mobile menu */}
        {mobileMenuOpen && user && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white/95 shadow-inner">
            {dashboardLink && (
              <Link
                href={dashboardLink}
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {user && <Navigation />}

      {/* Page content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
