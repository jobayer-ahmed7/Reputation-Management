"use client";

import ServiceCard from "@/components/shared/ServiceCard";
import {
  MessageCircle,
  Users,
  TrendingUp,
  Share2,
  Heart,
  Star,
} from "lucide-react";

const ServiceSection = () => {
  const services = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Google Reviews",
      description:
        "Boost your Google business profile with authentic, high-quality reviews that improve your visibility and attract more customers.",
      platform: "Google",
      price: "$49",
      originalPrice: "$79",
      badge: "Popular",
      features: [
        "5-star authentic reviews",
        "Rapid delivery (24-48 hours)",
        "USA/Global reviewers",
        "Boost local SEO ranking",
        "Money-back guarantee",
      ],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Facebook Reviews & Engagement",
      description:
        "Increase credibility and social proof on Facebook with genuine reviews, likes, and meaningful engagement on your page.",
      platform: "Facebook",
      price: "$39",
      originalPrice: "$69",
      badge: null,
      features: [
        "Verified Facebook reviews",
        "Page likes & followers",
        "Post engagement (likes, comments)",
        "Real & active accounts",
        "Safe & secure delivery",
      ],
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Instagram Engagement Package",
      description:
        "Grow your Instagram presence with real followers, likes, and comments from genuine accounts to expand your reach.",
      platform: "Instagram",
      price: "$44",
      originalPrice: "$74",
      badge: null,
      features: [
        "Real Instagram followers",
        "Post likes & comments",
        "Story interactions",
        "No bot activity",
        "Instant activation",
      ],
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "TikTok Viral Boost",
      description:
        "Accelerate your TikTok growth with authentic views, likes, and followers to help your videos go viral.",
      platform: "TikTok",
      price: "$34",
      originalPrice: "$64",
      badge: "Trending",
      features: [
        "Real TikTok views & likes",
        "Active followers",
        "Video engagement boost",
        "Algorithm-friendly",
        "Quick & safe setup",
      ],
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "LinkedIn Profile Credibility",
      description:
        "Establish professional authority on LinkedIn with endorsements, recommendations, and connection growth.",
      platform: "LinkedIn",
      price: "$54",
      originalPrice: "$84",
      badge: null,
      features: [
        "Professional endorsements",
        "Connection growth",
        "Post engagement",
        "Recommendations",
        "Industry authority boost",
      ],
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "YouTube Comments & Engagement",
      description:
        "Increase video credibility with authentic comments, likes, and engagement from real YouTube accounts.",
      platform: "YouTube",
      price: "$59",
      originalPrice: "$89",
      badge: null,
      features: [
        "Authentic video comments",
        "Video likes boost",
        "Channel subscription help",
        "View increase",
        "Comment moderation friendly",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-16 lg:py-24 bg-linear-to-b from-white via-blue-50 to-slate-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center space-y-4">
          <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Our Services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Social Media Reviews & Engagement
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Boost your online presence across all major social media platforms
            with authentic reviews, followers, and engagement. Build credibility
            and trust with your audience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              platform={service.platform}
              price={service.price}
              originalPrice={service.originalPrice}
              features={service.features}
              badge={service.badge || undefined}
              onBuyNow={() => console.log(`Buy ${service.title}`)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-linear-to-r from-pblue/10 via-transparent to-bluegray/10 p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Ready to Grow Your Online Reputation?
          </h3>
          <p className="text-slate-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            Start with any service above or contact our team for custom packages
            tailored to your business needs.
          </p>
          <button className="inline-flex items-center gap-2 bg-linear-to-r from-pblue to-bluegray text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300">
            Contact Our Sales Team
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
