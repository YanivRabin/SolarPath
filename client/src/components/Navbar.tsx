"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../public/logo/solarpath-logo.png";

export default function Navbar() {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [applicationsDropdownOpen, setApplicationsDropdownOpen] =
    useState(false);

  return (
    <nav className="h-24 shadow-md fixed top-0 left-0 w-full bg-white z-50">
      <div className="flex justify-between items-center h-full px-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="SolarPath Logo"
            width={180}
            height={50}
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="relative space-x-8 text-title text-lg font-medium flex items-center">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <span className="hover:text-amber-400 transition cursor-pointer">
              Products
            </span>
            {productsDropdownOpen && (
              <div className="absolute left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-200 pt-2">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/products/bollards"
                      className="block px-6 py-3 hover:bg-amber-400 hover:text-white transition"
                    >
                      Bollards
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/cobra"
                      className="block px-6 py-3 hover:bg-amber-400 hover:text-white transition"
                    >
                      Cobra
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/deco"
                      className="block px-6 py-3 hover:bg-amber-400 hover:text-white transition"
                    >
                      Deco
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/all-in-one"
                      className="block px-6 py-3 hover:bg-amber-400 hover:text-white transition"
                    >
                      All in One
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/all-in-two"
                      className="block px-6 py-3 hover:bg-amber-400 hover:text-white transition"
                    >
                      All in Two
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Applications Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setApplicationsDropdownOpen(true)}
            onMouseLeave={() => setApplicationsDropdownOpen(false)}
          >
            <span className="hover:text-amber-400 transition cursor-pointer">
              Applications
            </span>
            {applicationsDropdownOpen && (
              <div className="absolute left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-200 pt-2">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/applications/streets-lighting"
                      className="block px-6 py-3 hover:bg-amber-400 hover:text-white transition"
                    >
                      Streets Lighting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/applications/parking-lots"
                      className="block px-6 py-3 hover:bg-amber-400 hover:text-white transition"
                    >
                      Parking Lots
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link href="/services" className="hover:text-amber-400 transition">
            Services
          </Link>
          <Link href="/projects" className="hover:text-amber-400 transition">
            Projects
          </Link>
          <Link href="/about" className="hover:text-amber-400 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-amber-400 transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
