"use client";

import  { useState } from "react";
import ServiceCard from "@/components/shared/ServiceCard";
import { MessageCircle, Users, TrendingUp, Share2, Heart, Star, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ServicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "reviews", label: "Reviews" },
    { id: "engagement", label: "Engagement" },
    { id: "growth", label: "Growth" },
  ];

  const services = [
    {
      id: 1,
      category: "reviews",
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
      id: 2,
      category: "reviews",
      icon: <Users className="w-6 h-6" />,
      title: "Facebook Reviews",
      description:
        "Increase credibility and social proof on Facebook with genuine reviews from verified accounts.",
      platform: "Facebook",
      price: "$39",
      originalPrice: "$69",
      badge: null,
      features: [
        "Verified Facebook reviews",
        "Real accounts only",
        "Safe & secure delivery",
        "Boost social credibility",
        "Quick turnaround",
      ],
    },
    {
      id: 3,
      category: "engagement",
      icon: <Heart className="w-6 h-6" />,
      title: "Instagram Engagement Package",
      description:
        "Grow your Instagram presence with real followers, likes, and comments from genuine accounts.",
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
      id: 4,
      category: "growth",
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
      id: 5,
      category: "growth",
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
      id: 6,
      category: "reviews",
      icon: <Share2 className="w-6 h-6" />,
      title: "YouTube Comments",
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

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <main className="bg-linear-to-b from-white via-slate-50 to-slate-100 min-h-screen">
      {/* Header Section */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              All Services
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
              Social Media Reviews & Engagement
            </h1>

            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Choose from our comprehensive suite of services to boost your online presence, build
              credibility, and grow your social media profiles across all major platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white  border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-linear-to-r from-pblue to-bluegray text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
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

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We stand out with quality, reliability, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "100% Authentic",
                description: "Real accounts, real engagement, no bots or fake activity",
                icon: <CheckCircle className="w-8 h-8" />,
              },
              {
                title: "Fast Delivery",
                description: "Most orders delivered within 24-48 hours",
                icon: <TrendingUp className="w-8 h-8" />,
              },
              {
                title: "Money-Back Guarantee",
                description: "Not satisfied? We offer a full refund guarantee",
                icon: <Users className="w-8 h-8" />,
              },
              {
                title: "24/7 Support",
                description: "Our dedicated team is always ready to help you",
                icon: <MessageCircle className="w-8 h-8" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-linear-to-br from-pblue/10 to-bluegray/10 text-pblue">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Service",
                description: "Select the social media service and package that fits your needs",
              },
              {
                step: "2",
                title: "Make Payment",
                description: "Complete secure payment using your preferred payment method",
              },
              {
                step: "3",
                title: "Provide Details",
                description: "Enter your profile information and service requirements",
              },
              {
                step: "4",
                title: "Get Results",
                description: "Sit back and watch your engagement and reviews grow",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-pblue to-bluegray text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white ">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "Are the reviews and engagement authentic?",
                a: "Yes, all reviews and engagement come from real, verified accounts. We never use bots or fake activity.",
              },
              {
                q: "How long does delivery take?",
                a: "Most orders are delivered within 24-48 hours. Some premium packages may take up to 72 hours.",
              },
              {
                q: "What if I'm not satisfied with the service?",
                a: "We offer a 100% money-back guarantee if you're not satisfied with the results within 30 days.",
              },
              {
                q: "Is it safe to use your services?",
                a: "Absolutely. Our services comply with all platform guidelines and use safe, proven methods.",
              },
              {
                q: "Can I track my order progress?",
                a: "Yes, you'll receive real-time updates via email and can track your order in your account dashboard.",
              },
              {
                q: "Do you offer bulk discounts?",
                a: "Yes! Contact our sales team for custom bulk pricing and enterprise packages.",
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-slate-200 rounded-lg px-4">
                <AccordionTrigger className="text-slate-900 font-semibold cursor-pointer">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

 
    </main>
  );
};

export default ServicePage;