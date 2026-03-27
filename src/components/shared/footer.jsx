'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <footer id="footer" className="bg-[url('/images/footer-bg.png')] bg-center relative bg-cover bg-no-repeat ">
        <div className="absolute top-0 left-0 w-full h-full bg-[#383F40]"></div>
        <div className="relative footer-top  z-10 py-10 md:py-20 text-white w-[90%] mx-auto">
          <div className="grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 w-full">
              <Link href='#' className="">
                <img src="/images/logos/IC-logo-vertical.svg" alt="" className="border border-white w-60 h-20"/>
              </Link>
              <div className="flex justify-center gap-6 mt-5 b">
                <Link href='#' target="_blank">
                  <img src="/images/facebook.svg" alt="" className="w-14 h-14"/>
                </Link>
                <Link href='#' target="_blank">
                  <img src="/images/whatsapp.svg" alt=""className="w-14 h-14" />
                </Link>
                <Link href='#' target="_blank">
                  <img src="/images/insta.svg" alt="" className="w-14 h-14"/>
                </Link>
                <Link href='#' target="_blank">
                  <img src="/images/yt.svg" alt="" className="w-14 h-14"/>
                </Link>
              </div>
            </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 manrope-regular-sm text-white border-t border-[#565C5D] mt-6 pt-10">
            <div>Copyright © 2024 All Rights Reserved.</div>
            <div className="flex flex-col md:flex-row gap-3 text-start md:justify-end md:gap-5">
              <Link href='/'>Term & Condition</Link>
              <Link href='/'>Support</Link>
              <Link href='/'>Privacy Policy</Link>
            </div>
          </div>

        </div>
      </footer>

    </>
  )
}
