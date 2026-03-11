import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, ShieldAlert, Zap, Layers } from "lucide-react";

const items = [
  {
    value: "definition",
    trigger: "What exactly is Reputation Management?",
    icon: Search,
    badge: "Digital Vibe Check",
    content:
      "It is the practice of monitoring, influencing, and managing how a brand or individual is perceived online. This involves tracking mentions, responding to reviews, and ensuring that positive content is what people see first.",
  },
  {
    value: "deletion",
    trigger: "Can I just delete bad reviews or articles?",
    icon: ShieldAlert,
    badge: "Policy Info",
    content:
      "Usually, no. Platforms like Google and Yelp won't let you delete a review unless it violates terms of service. Instead, you manage it by responding professionally or creating high-quality content to push negative results down.",
  },
  {
    value: "timing",
    trigger: "How long does it take to see results?",
    icon: Zap,
    badge: "3-6 Months",
    content:
      "Reputation management is a marathon. While responding to reviews happens instantly, pushing down negative search results through SEO typically takes 3 to 6 months of consistent effort.",
  },
  {
    value: "pillars",
    trigger: "What are the core pillars of a good strategy?",
    icon: Layers,
    badge: "Framework",
    content:
      "A solid strategy relies on four things: Monitoring (getting alerts), Response (engaging professionally), Acquisition (asking for happy feedback), and Promotion (publishing blogs/PR).",
  },
];

const FAQ = () => {
  return (
    <div className="flex justify-center mb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center border-b border-slate-100 pb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-bluegray font-bold mb-2">
            Resources
          </p>
          <h2
            className="text-3xl font-bold text-slate-800"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            Reputation FAQ
          </h2>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-3"
          defaultValue="definition"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:border-pblue"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50/50 transition-colors data-[state=open]:bg-slate-50 group">
                  <div className="flex items-center gap-4 w-full">
                    {/* Icon Container */}
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-data-[state=open]:bg-pblue transition-colors duration-300">
                      <Icon className="w-5 h-5 text-bluegray group-data-[state=open]:text-white transition-colors duration-300" />
                    </div>

                    {/* Label + badge */}
                    <div className="flex flex-col items-start gap-1 flex-1 text-left">
                      <span
                        className="text-[15px] font-semibold text-slate-700 group-data-[state=open]:text-pblue transition-colors"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {item.trigger}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-100 text-bluegray group-data-[state=open]:bg-blue-50 group-data-[state=open]:text-pblue">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-6 pt-2">
                  <div className="ml-14 pr-4">
                    <div className="h-px bg-slate-100 mb-4" />
                    <p className="text-[14px] text-slate-600 leading-relaxed italic border-l-2 border-pblue pl-4">
                      {item.content}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <p className="text-center text-[10px] text-slate-400 mt-8 font-medium italic">
          STRATEGY FRAMEWORK • 2026
        </p>
      </div>
    </div>
  );
};

export default FAQ;