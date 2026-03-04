import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {

  const aboutLinks = [
    { name: "About Us", href: "about-us" },
    { name: "FAQs", href: "#" },
    { name: "Blogs", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "privacy-policy" },
    { name: "Terms and Conditions", href: "terms-condition" },
    { name: "Refund Policy", href: "#" },
    { name: "Working Policy", href: "#" },
  ];


  return (
    <footer className="bg-linear-to-b from-[#2c3e50] to-[#1a252f] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
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
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-pblue hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-pblue hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
     
      </div>
         <div className=" flex-col justify-center pb-3">
                  {/* Footer note */}
        <p className="text-center text-xs text-gray-400 pb-2">
          © 2026 Reputation Manage. All rights reserved.
        </p>

        <Link
          className="text-xs text-center  block text-blue-300"
          target="_blank"
          href="https://jobayerahmed.vercel.app"
        >
          Developed by Jobayer Ahmed
        </Link>
        </div>
    </footer>
  );
};

export default Footer;
