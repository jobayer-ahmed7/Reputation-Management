import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bell, Shield, CreditCard } from "lucide-react";

const items = [
  {
    value: "notifications",
    trigger: "Notification Settings",
    icon: Bell,
    badge: "3 active",
    content:
      "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.",
  },
  {
    value: "privacy",
    trigger: "Privacy & Security",
    icon: Shield,
    badge: "2FA on",
    content:
      "Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences. You can also download your data or delete your account.",
  },
  {
    value: "billing",
    trigger: "Billing & Subscription",
    icon: CreditCard,
    badge: "Pro plan",
    content:
      "View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.",
  },
];

const FAQ = () => {
  return (
    <div className="flex justify-center mb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-medium mb-2">
            Account
          </p>
          <h2
            className="text-3xl font-bold text-slate-800"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            Settings
          </h2>
          <div className="mt-3 mx-auto w-8 h-px bg-linear-to-r from-transparent via-slate-400 to-transparent" />
        </div>

        {/* Accordion */}
        <Accordion
          type="multiple"
          className="w-full space-y-2"
          defaultValue={["notifications"]}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 data-[state=open]:border-slate-300 data-[state=open]:shadow-md"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50/80 transition-colors data-[state=open]:bg-slate-50/80 group">
                  <div className="flex items-center gap-4 w-full">
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-data-[state=open]:bg-slate-800 transition-colors duration-200">
                      <Icon className="w-4 h-4 text-slate-500 group-data-[state=open]:text-white transition-colors duration-200" />
                    </div>

                    {/* Label + badge */}
                    <div className="flex items-center gap-3 flex-1 text-left">
                      <span
                        className="text-sm font-semibold text-slate-700"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {item.trigger}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 group-data-[state=open]:bg-slate-800 group-data-[state=open]:text-slate-200 group-data-[state=open]:border-slate-700 transition-colors duration-200">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5 pt-1">
                  {/* Thin rule */}
                  <div className="h-px bg-slate-100 mb-4" />
                  <p className="text-sm text-slate-500 leading-relaxed pl-13" style={{ paddingLeft: "3.25rem" }}>
                    {item.content}
                  </p>
                  <div className="mt-4 pl-13 flex gap-2" style={{ paddingLeft: "3.25rem" }}>
                    <button className="text-xs font-medium text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-150">
                      Manage
                    </button>
                    <button className="text-xs font-medium text-slate-400 hover:text-slate-600 px-3 py-1.5 transition-colors">
                      Learn more →
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-6 tracking-wide">
          Changes are saved automatically
        </p>
      </div>
    </div>
  );
};

export default FAQ;