"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ServiceCard from "@/components/shared/ServiceCard";
import { mockServices } from "@/constants/service";

const ServicePage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const services = mockServices;

  // Get unique platforms from services
  const uniquePlatforms = Array.from(
    new Set(services.map((service) => service.platform))
  );


  const handlePlatformClick = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const filteredServices =
    selectedPlatform === "all"
      ? services
      : services.filter((service) => service.platform === selectedPlatform);

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
              Choose from our comprehensive suite of services to boost your
              online presence, build credibility, and grow your social media
              profiles across all major platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-10 bg-linear-to-b from-slate-50 via-white to-slate-100 pb-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <p className="inline-flex items-center rounded-full  border border-pblue/10 bg-pblue/5 px-3 py-1 text-xs font-semibold tracking-widest text-pblue uppercase">
              Choose platform
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 sm:gap-6">
            {/* All platforms filter */}
            <button
              key="all"
              onClick={() => handlePlatformClick("all")}
              className={`group cursor-pointer relative flex h-full flex-col justify-between rounded-2xl border bg-white/90 p-4 text-left text-sm backdrop-blur-sm transition-all duration-200
            ${
              selectedPlatform === "all"
                ? "border-pblue shadow-[0_16px_40px_rgba(37,99,235,0.25)] -translate-y-1"
                : "border-slate-200 hover:-translate-y-1 hover:border-pblue/50 hover:shadow-md"
            }`}
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  All platforms
                </h3>
                <p className="mt-1 text-[11px] text-slate-500">
                  {services.length} services
                </p>
              </div>

              <span className="mt-3 inline-flex items-center justify-between rounded-full bg-slate-50 px-3 py-1 text-[10px] font-medium text-slate-500">
                Choose
                <span className="ml-1 text-pblue transition-transform group-hover:translate-x-0.5">
                  &gt;
                </span>
              </span>

              {selectedPlatform === "all" && (
                <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-100" />
              )}
            </button>

            {uniquePlatforms.map((platform) => {
              const isActive = selectedPlatform === platform;
              const platformServiceCount = services.filter(
                (service) => service.platform === platform
              ).length;

              return (
                <button
                  key={platform}
                  onClick={() => handlePlatformClick(platform)}
                  className={`group cursor-pointer relative flex h-full flex-col justify-between rounded-2xl border bg-white/90 p-4 text-left text-sm backdrop-blur-sm transition-all duration-200
            ${
              isActive
                ? "border-pblue shadow-[0_16px_40px_rgba(37,99,235,0.25)] -translate-y-1"
                : "border-slate-200 hover:-translate-y-1 hover:border-pblue/50 hover:shadow-md"
            }`}
                >
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {platform}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {platformServiceCount} services
                    </p>
                  </div>

                  <span className="mt-3 inline-flex items-center justify-between rounded-full bg-slate-50 px-3 py-1 text-[10px] font-medium text-slate-500">
                    Choose
                    <span className="ml-1 text-pblue transition-transform group-hover:translate-x-0.5">
                      &gt;
                    </span>
                  </span>

                  {isActive && (
                    <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-100" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="p-20 bg-linear-to-b from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              {selectedPlatform === "all"
                ? "All services"
                : `${selectedPlatform} services`}
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredServices.length} service
              {filteredServices.length === 1 ? "" : "s"}
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-10">
              No services found for this platform.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={`${service.platform}-${service.name}-${service.count}`}
                  service={service}
                />
              ))}
            </div>
          )}
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
                description:
                  "Select the social media service and package that fits your needs",
              },
              {
                step: "2",
                title: "Provide Details",
                description:
                  "Enter your profile information and service requirements",
              },
              {
                step: "3",
                title: "Make Payment",
                description:
                  "Complete secure payment using your preferred payment method",
              },
              {
                step: "4",
                title: "Get Results",
                description:
                  "Sit back and watch your engagement and reviews grow",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-pblue to-bluegray text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
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
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-200 rounded-lg px-4"
              >
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
