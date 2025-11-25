"use client";

import Image from "next/image";

const AboutUsPage = () => {
  return (
    <main className="bg-linear-to-b from-white via-slate-50 to-slate-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              About Reputation Manage
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Helping you take control of your online reputation.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Reputation Manage was founded with a clear mission — to help businesses,
              professionals, and organizations take control of their online reputation.
              In today&apos;s digital world, what people say about you online can make or
              break your success. That&apos;s why we provide comprehensive reputation
              management services designed to help you monitor, protect, and enhance
              your brand image across multiple platforms.
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We make it easier and faster for our clients to collect positive reviews,
              respond to customer feedback, and build trust with their audience. By
              improving your online visibility and credibility, Reputation Manage helps
              you stand out from the competition, attract more customers, and drive
              long-term growth.
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Whether you&apos;re a small local business or a large enterprise, our goal is
              to empower you with the tools and strategies needed to create a strong,
              positive presence online — one that reflects the true quality of your
              products, services, and values.
            </p>

            {/* Key Points */}
            <div className="grid gap-4 sm:grid-cols-3 pt-4">
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-pblue uppercase mb-1">
                  Our Focus
                </p>
                <p className="text-sm text-slate-700">
                  Monitor, protect, and enhance your brand image across the platforms
                  that matter most.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-pblue uppercase mb-1">
                  How We Help
                </p>
                <p className="text-sm text-slate-700">
                  Streamlined tools to collect real reviews, respond to feedback, and
                  build lasting customer trust.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-pblue uppercase mb-1">
                  Who We Serve
                </p>
                <p className="text-sm text-slate-700">
                  From local businesses to global brands, we support growth at every
                  stage.
                </p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="space-y-6 max-w-xl ml-auto">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-pblue/10 via-transparent to-bluegray/10 pointer-events-none" />
              <Image
                src="/reputationmanage1.webp"
                alt="Team managing online reputation dashboards"
                width={640}
                height={480}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-[auto,1fr] items-center gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <Image
                  src="/reputationmanage2.webp"
                  alt="Customer reviews and ratings illustration"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Built for transparency, trust, and long-term growth.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Every feature we create is designed to help you earn genuine
                  customer confidence and turn positive experiences into powerful
                  social proof.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;