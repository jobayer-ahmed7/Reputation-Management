import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const aboutLinks = [
    { name: "Jobs", href: "#jobs" },
    { name: "FAQs", href: "#faqs" },
    { name: "Blogs", href: "#blogs" },
    { name: "Contact Us", href: "#contact" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Refund Policy", href: "#refund" },
    { name: "Working Policy", href: "#working" },
  ];

  const paymentMethods = [
    { name: "Credit Card", icon: "💳" },
    { name: "Google Pay", icon: "G" },
    { name: "Apple Pay", icon: "" },
    { name: "Visa", icon: "VISA" },
    { name: "Mastercard", icon: "MC" },
  ];

  return (
    <footer className="bg-linear-to-b from-[#2c3e50] to-[#1a252f] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info Section */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg inline-block">
              <Image
                alt="Company logo"
                width={150}
                height={300}
                src={"/logo.webp"}
              />
            </div>

            <p className="text-gray-300 leading-relaxed max-w-sm">
              Explore top quick tasks and quick tasks on Explore top rs, your
              gateway tasks on g online.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="#facebook"
                className="w-12 h-12 rounded-full border-2 border-pblue flex items-center justify-center hover:bg-pblue hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#linkedin"
                className="w-12 h-12 rounded-full border-2 border-pblue flex items-center justify-center hover:bg-pblue hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#instagram"
                className="w-12 h-12 rounded-full border-2 border-pblue flex items-center justify-center hover:bg-pblue hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About Company Section */}
          <div>
            <h3 className="text-xl font-semibold text-pblue mb-6 relative inline-block">
              About Company
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-linear-to-r from-pblue to-bluegray"></span>
            </h3>
            <ul className="space-y-3 mt-8">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-pblue hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Pages Section */}
          <div>
            <h3 className="text-xl font-semibold text-pblue mb-6 relative inline-block">
              Policy Pages
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-linear-to-r from-pblue to-bluegray"></span>
            </h3>
            <ul className="space-y-3 mt-8">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-pblue hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods Bar */}
      <div className="bg-black/30 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              © {currentYear} Reputation Manage, All Rights Reserved.
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="privacy-policy"
                className="text-gray-300 hover:text-pblue text-sm transition-colors"
              >
                Privacy Policy
              </Link>

              {/* Payment Icons */}
              <div className="flex items-center gap-2 ml-4">
                <div className="bg-white rounded px-3 py-1.5 text-xs font-semibold text-pblue">
                  💳
                </div>
                <div className="bg-white rounded px-3 py-1.5 text-xs font-semibold">
                  <span className="text-pblue">G</span> Pay
                </div>
                <div className="bg-white rounded px-3 py-1.5 text-xs font-semibold text-gray-800">
                  Pay
                </div>
                <div className="bg-white rounded px-3 py-1.5 text-xs font-semibold text-[#1A1F71]">
                  VISA
                </div>
                <div className="bg-white rounded px-3 py-1.5 text-xs font-semibold">
                  <span className="text-red-600">●</span>
                  <span className="text-orange-500">●</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#1a252f] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-400 text-sm">
            Copyright © {currentYear} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
