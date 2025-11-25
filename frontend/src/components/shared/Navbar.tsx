"use client";

import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-linear-to-r from-pblue to-bluegray text-white py-2 px-4 text-center text-sm md:text-base font-medium">
        <span>
          10% Off! Use Code: <span className="font-bold">REVIEZ10</span>
        </span>
        <button className="ml-4 bg-white text-pblue px-4 py-1 rounded-md font-semibold hover:bg-gray-100 transition-colors">
          Buy Now
        </button>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Image alt="Company logo" width={150} height={300} src={'/logo.webp'}/>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-2 text-gray-700 font-medium hover:text-pblue transition-colors relative group ${
                    link.name === "Home" ? "text-pblue" : ""
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-pblue transform origin-left transition-transform ${
                      link.name === "Home"
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </a>
              ))}
            </div>

            {/* Contact & Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {/* WhatsApp Contact */}
              <a
                href="https://wa.me/8801722291667"
                className="flex items-center gap-2 text-gray-700 hover:text-[#25D366] transition-colors"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-sm">8801722291667</span>
              </a>

              {/* Login/Signup Button */}
              <button className="bg-linear-to-r from-pblue to-bluegray text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                Login/Signup
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-pblue transition-colors ${
                    link.name === "Home" ? "bg-blue-50 text-pblue" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile Contact */}
              <a
                href="https://wa.me/8801722291667"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-700">
                  8801722291667
                </span>
              </a>

              {/* Mobile Login Button */}
              <button className="w-full bg-linear-to-r from-pblue to-bluegray text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                Login/Signup
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
