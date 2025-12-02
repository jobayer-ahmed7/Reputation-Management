'use client';

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Select Category');

  const categories = ['Select Category', 'Trustpilot Review', 'Google Review', 'Amazon Review', 'Facebook Review'];
  const popularCategories = ['Trustpilot Review', 'Other', 'CPA Leads', 'Create Account'];

  return (
    <section className="bg-linear-to-br from-blue-50 via-cyan-50 to-white min-h-screen flex items-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-32 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Subtitle */}
          <p className="text-sm font-medium text-gray-600 tracking-wide">
            Getting Permanent Positive Reviews Online For Your Business Instantly
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Order Online Reviews for Business – 100% Real and Non Drop
          </h1>

          {/* Search Bar */}
          <div className="space-y-4">
            <div className="flex gap-3">
              {/* Category Dropdown */}
              <div className="relative shrink-0">
                <button className="bg-white border-2 border-gray-200 rounded-lg px-4 py-3 flex items-center gap-2 hover:border-blue-300 transition-colors w-48">
                  <span className="text-gray-600 text-sm">{selectedCategory}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                </button>

                {/* Dropdown Menu */}
                <div className="hidden group-hover:block absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-48">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Input */}
              <div className="flex-1 flex items-center bg-white border-2 border-gray-200 rounded-lg px-4 hover:border-blue-300 transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Services"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 ml-2 outline-none text-gray-700 placeholder-gray-400 py-3"
                />
              </div>

              {/* Search Button */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                Search
              </button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-4 pt-4">
            <p className="text-sm font-semibold text-gray-700">
              Popular <span className="text-gray-500">Services</span> Category
            </p>
            <div className="flex flex-wrap gap-3">
              {popularCategories.map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg text-sm font-medium transition-all border border-gray-200 hover:border-blue-300"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative h-96 lg:h-full flex items-center justify-center">
          {/* Illustration Container */}
          <div className="relative w-full max-w-md">
            {/* Woman with chart icon */}
            <div className="flex flex-col items-center">
              {/* Chart Icon */}
              <div className="absolute -top-8 right-12 w-20 h-20 bg-yellow-300 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-4xl">📊</div>
              </div>

              {/* Main Character Illustration */}
              <div className="mt-8 text-center">
                <svg
                  viewBox="0 0 200 300"
                  className="w-full h-auto max-w-xs mx-auto"
                >
                  {/* Head */}
                  <circle cx="100" cy="60" r="35" fill="#8B6F47" />

                  {/* Hair */}
                  <path
                    d="M 65 60 Q 65 20 100 15 Q 135 20 135 60"
                    fill="#6B4423"
                  />

                  {/* Torso */}
                  <ellipse cx="100" cy="140" rx="35" ry="45" fill="#6B9DD9" />

                  {/* Arms */}
                  <ellipse cx="60" cy="130" rx="15" ry="50" fill="#9B8B7E" />
                  <ellipse cx="140" cy="130" rx="15" ry="50" fill="#9B8B7E" />

                  {/* Legs */}
                  <rect x="90" y="180" width="10" height="60" fill="#3D3D3D" />
                  <rect x="100" y="180" width="10" height="60" fill="#3D3D3D" />
                </svg>
              </div>

              {/* Sleeping Cat */}
              <div className="absolute bottom-20 -left-12 text-6xl animate-pulse">
                🐱
              </div>

              {/* Z's indicating sleep */}
              <div className="absolute top-24 right-8 space-y-2 text-2xl opacity-70">
                <p>z</p>
                <p>z</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
