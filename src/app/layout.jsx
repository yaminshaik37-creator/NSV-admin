"use client";

import { Lora, Manrope } from "next/font/google";

/* ===== Global & Vendor CSS ===== */
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-medium-image-zoom/dist/styles.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./globals.css";

/* ===== Layout Components ===== */
import Sidebar from "@/components/layout/Sidebar";

/* ===== Fonts ===== */
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${manrope.variable}`}
    >
      <body>
        {/* Sidebar wraps page content */}
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
