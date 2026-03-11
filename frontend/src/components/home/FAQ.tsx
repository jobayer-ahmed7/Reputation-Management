import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, Zap, UserCheck, RefreshCcw } from "lucide-react";

const items = [
  {
    value: "authenticity",
    trigger: "Are these reviews from real people or bots?",
    icon: UserCheck,
    badge: "100% Real Users",
    content:
      "We strictly use 100% real, active accounts for all reviews. We do not use bots or automated software, ensuring that every review looks natural and complies with platform standards.",
  },
  {
    value: "safety",
    trigger: "Will these reviews get my business account banned?",
    icon: ShieldCheck,
    badge: "Safe & Secure",
    content:
      "No. Because we use real human accounts and drip-feed the reviews naturally, they appear as organic growth. Our methods are designed to be safe and have zero risk of getting your account suspended.",
  },
  {
    value: "timing",
    trigger: "How long does it take for reviews to appear?",
    icon: Zap,
    badge: "Fast Delivery",
    content:
      "Most orders start within 24-48 hours. We deliver reviews gradually to maintain a natural growth pattern, which is crucial for staying under the radar of platform algorithms.",
  },
  {
    value: "nondrop",
    trigger: "What happens if a review is removed?",
    icon: RefreshCcw,
    badge: "Non-Drop Guarantee",
    content:
      "We offer a 'Non-Drop' guarantee. If any review we provided is removed within 30 days, we will replace it free of charge, no questions asked.",
  },
];

const FAQ = () => {
  return (
    <div className="flex justify-center mb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-pblue/5 px-3 py-1 rounded-full border border-pblue/10 mb-4">
            Common Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently Asked <span className="bg-linear-to-r from-pblue to-blue-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Everything you need to know about our reputation management services.
          </p>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          defaultValue="authenticity"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:border-pblue/30 data-[state=open]:shadow-lg data-[state=open]:shadow-pblue/5"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-slate-50/50 transition-colors data-[state=open]:bg-slate-50/50 group">
                  <div className="flex items-center gap-5 w-full">
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-data-[state=open]:bg-pblue group-data-[state=open]:text-white transition-all duration-300">
                      <Icon className="w-6 h-6 text-slate-600 group-data-[state=open]:text-white transition-colors duration-300" />
                    </div>

                    {/* Label + badge */}
                    <div className="flex flex-col items-start gap-1.5 flex-1 text-left">
                      <span className="text-base sm:text-lg font-bold text-slate-800 group-data-[state=open]:text-pblue transition-colors">
                        {item.trigger}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 group-data-[state=open]:bg-pblue/10 group-data-[state=open]:text-pblue">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-8 pt-2">
                  <div className="ml-16 pr-4">
                    <div className="h-px bg-slate-100 mb-6" />
                    <p className="text-[15px] text-slate-600 leading-relaxed border-l-4 border-pblue/20 pl-5">
                      {item.content}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
