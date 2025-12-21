"use client";

import React, { useState } from "react";
import { Menu, X, Phone, Badge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/services/AuthService";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading, setIsLoading, setUser } = useUser();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "services" },
    { name: "About", href: "about-us" },
  ];

  const handleLogOut = async () => {
    await logout();
    setUser(null);
    setIsLoading(true);
  };

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-linear-to-r from-pblue to-bluegray text-white py-2 px-4 text-center text-sm md:text-base font-medium">
        <span>
          10% Off! Use Code: <span className="font-bold">REVIEZ10</span>
        </span>
        <button className="ml-4 cursor-pointer bg-white text-pblue px-4 py-1 rounded-md font-semibold hover:bg-gray-100 transition-colors">
          Buy Now
        </button>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={"/"} className="shrink-0">
              <Image
                alt="Company logo"
                width={150}
                height={55}
                src={"/logo.webp"}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/" && pathname === "/") ||
                  (link.href !== "/" && pathname.startsWith("/" + link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-6 py-2 font-medium transition-colors relative group ${
                      isActive ? "text-pblue" : "text-gray-700 hover:text-pblue"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-pblue transition-all duration-500 ${
                        isActive ? "w-2/3" : "w-0 group-hover:w-2/3"
                      }`}
                    ></span>
                  </Link>
                );
              })}
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

              {/* Login/Signup and logout Button */}

              {/* kab jab */}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        className="cursor-pointer"
                        src="https://github.com/shadcn.png"
                      />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href={user?.role === "admin" ? `/admin` : `/customer`}
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      {/* <LogOut /> */}
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={"/login"}
                  className="bg-linear-to-r from-pblue to-bluegray text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Login
                </Link>
              )}

              {/* ghfdhdgh */}
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
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/" && pathname === "/") ||
                  (link.href !== "/" && pathname.startsWith("/" + link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-pblue"
                        : "text-gray-700 hover:bg-gray-50 hover:text-pblue"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

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
