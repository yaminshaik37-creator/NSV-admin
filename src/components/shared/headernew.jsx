'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PrimaryBtn from '../UI/PrimaryBtn';


const NAV_ITEMS = [
  // { label: 'Login', href: '/' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 600;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldUseLightTheme = isScrolled;

  const navbarBg = shouldUseLightTheme ? '' : '';
  const textColor = shouldUseLightTheme ? 'text-black' : '';
  const logoUrl = shouldUseLightTheme ? '/images/patient/logo.png' : '/images/patient/logo.png';

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className={`${navbarBg} ${textColor} backdrop-blur-sm  transition-colors duration-300`}>
          <div className="mx-40 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Logo"
                width={48}
                height={42}
                className="w-30 md:w-40"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8 text-lg tracking-widest">
              {/* {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-light cursor-pointer"
                >
                  {item.label}
                </Link>
              ))} */}
              <Link className='text-white font-medium bg-[#652FCF] text-base text-uppercase tracking-widest px-12 py-1.5 rounded-md font-sans' href="/">LOGIN</Link>

            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="focus:outline-none"
                aria-label="Open menu"
              >
                <svg className={`w-6 h-6 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed top-0 right-0 h-full w-full z-40 bg-black/70 backdrop-blur-sm transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
        >
          <div className="relative flex text-white flex-col items-center justify-center h-full space-y-6 text-xl px-8">
            {/* {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-bold"
                >
                  {item.label}
                </Link>
              ))} */}

            <PrimaryBtn title={"Login"} />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-white text-3xl"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
