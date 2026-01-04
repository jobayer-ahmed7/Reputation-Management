"use client";

import Link from "next/link";

// type TService = {
//   _id?: string;
//   category: string;
//   title: string;
//   description: string;
//   platform: string;
//   price: string;
//   originalPrice: string;
//   badge: string | null;
//   features: string[];
//   createdAt?: Date;
//   updatedAt?: Date;
// };

const ServiceSection = () => {
  const services = [
    {
      id: 1,
      service_name: "Review Management",
      description:
        "Managing, responding, and improving reviews on social media and other platform",
    },
    {
      id: 2,
      service_name: "Social Media Reputation Management",
      description:
        "Handling comments/messages, posting positive content, and managing customer reactions on social media and other platform",
    },
    {
      id: 3,
      service_name: "Negative Content Removal / Suppression",
      description:
        "Removing fake or harmful content (where possible) and pushing down negative search results",
    },
    {
      id: 4,
      service_name: "Rating Improvement Services",
      description:
        "Boosting and maintaining ratings on social media and other platform",
    },
    {
      id: 5,
      service_name: "Search Engine Reputation Management",
      description:
        "Improving Google search results by ranking positive content and suppressing negative results",
    },
    {
      id: 6,
      service_name: "Reputation Monitoring",
      description:
        "Tracking brand mentions, reviews, and online conversations across all platforms",
    },
    {
      id: 7,
      service_name: "Reputation Repair",
      description:
        "Fixing damaged political career/brand reputation and rebuilding trust through strategic actions",
    },
    {
      id: 8,
      service_name: "Crisis Management",
      description:
        "Fast, strategic response to sudden reputation issues or negative publicity",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-linear-to-b from-white via-blue-50 to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center space-y-4">
          <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-pblue/5 px-3 py-1 rounded-full border border-pblue/10">
            Our core services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Protect and grow your online reputation
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From review management to crisis response, we combine strategy and
            execution to keep your brand trusted across every platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              href="/services"
              key={service.id}
              className="group block h-full no-underline"
            >
              <div className="relative h-full rounded-3xl border border-slate-200/60 bg-linear-to-br from-white via-white to-slate-50/30 p-8 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-500 ease-out  group-hover:shadow-2xl group-hover:shadow-pblue/20 overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-pblue/2 via-transparent to-bluegray/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-pblue via-blue-500 to-bluegray transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

                {/* Content wrapper */}
                <div className="relative z-10">
                  {/* Service number badge */}
                  <div className="mb-6 flex items-center justify-between">
            
                      <div className="h-0.5 w-2/4 bg-linear-to-r from-pblue/30 to-transparent" />
                 

                    {/* Service category label */}
                    <span className="inline-flex items-center rounded-full bg-pblue/5 px-3 py-1 text-[10px] font-semibold tracking-wider text-pblue uppercase border border-pblue/10">
                      Service
                    </span>
                  </div>

                  {/* Service title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight transition-colors duration-300 group-hover:text-pblue">
                    {service.service_name}
                  </h3>

                  {/* Service description */}
                  <p className="text-sm text-slate-600 leading-relaxed min-h-20 mb-6">
                    {service.description}
                  </p>

                  {/* Bottom action area */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-pblue/20 transition-colors duration-300">
                    <span className="text-xs font-semibold text-pblue/80 group-hover:text-pblue transition-colors duration-300">
                      Explore service
                    </span>

                    {/* Arrow icon with animated background */}
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-all duration-300">
                      <svg
                        className="h-4 w-4 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

             </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
