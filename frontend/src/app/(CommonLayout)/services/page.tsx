"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle, Users, TrendingUp, CheckCircle, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type OrderFormValues = {
  packageId: string;
  quantity: number;
};

const ServicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);

  const form = useForm<OrderFormValues>({
    defaultValues: {
      packageId: "",
      quantity: 1,
    },
  });

  const watchPackageId = form.watch("packageId");
  const watchQuantity = form.watch("quantity") || 1;

  const services = [
    {
      id: 1,
      platform: "Google",
      packages: [
        {
          id: "google-1",
          description: "5 Google Reviews - Basic Package",
          price: 49,
        },
        {
          id: "google-2",
          description: "10 Google Reviews - Standard Package",
          price: 89,
        },
        {
          id: "google-3",
          description: "25 Google Reviews - Premium Package",
          price: 199,
        },
      ],
    },
    {
      id: 2,
      platform: "Facebook",
      packages: [
        {
          id: "facebook-1",
          description: "50 Facebook Likes - Starter Package",
          price: 29,
        },
        {
          id: "facebook-2",
          description: "100 Facebook Likes - Growth Package",
          price: 49,
        },
        {
          id: "facebook-3",
          description: "500 Facebook Likes - Pro Package",
          price: 199,
        },
      ],
    },
    {
      id: 3,
      platform: "Instagram",
      packages: [
        {
          id: "instagram-1",
          description: "100 Instagram Followers - Basic Package",
          price: 39,
        },
        {
          id: "instagram-2",
          description: "500 Instagram Followers - Standard Package",
          price: 149,
        },
        {
          id: "instagram-3",
          description: "1000 Instagram Followers - Premium Package",
          price: 279,
        },
      ],
    },
  ];

  const selectedServicePackages = selectedPlatform?.packages || [];
  const selectedPkg = selectedServicePackages.find(
    (pkg: any) => pkg.id === watchPackageId
  );
  const unitPrice = selectedPkg?.price || 0;
  const totalPrice = unitPrice * watchQuantity;

  const handlePlatformClick = (service: any) => {
    setSelectedPlatform(service);
    form.reset({
      packageId: "",
      quantity: 1,
    });
  };

  const onSubmit = (values: OrderFormValues) => {
    if (!selectedPlatform) return;

    const service = services.find(
      (s) => s.platform === selectedPlatform.platform
    );
    const pkg = service?.packages.find((p) => p.id === values.packageId);

    console.log("Order submitted:", {
      platform: selectedPlatform.platform,
      packageId: values.packageId,
      quantity: values.quantity,
      pricePerUnit: pkg?.price ?? 0,
      totalPrice,
    });

    alert(
      `Order placed for ${
        selectedPlatform.platform
      }!\nTotal: $${totalPrice.toFixed(2)}`
    );
  };

  const closeForm = () => {
    setSelectedPlatform(null);
    form.reset({
      packageId: "",
      quantity: 1,
    });
  };

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
      <section className="py-10 bg-linear-to-b from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <p className="inline-flex items-center rounded-full  border border-pblue/10 bg-pblue/5 px-3 py-1 text-xs font-semibold tracking-widest text-pblue uppercase">
              Choose platform
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 sm:gap-6">
            {services.map((service) => {
              const isActive = selectedPlatform?.platform === service.platform;

              return (
                <button
                  key={service.id}
                  onClick={() => handlePlatformClick(service)}
                  className={`group relative flex h-full flex-col justify-between rounded-2xl border bg-white/90 p-4 text-left text-sm backdrop-blur-sm transition-all duration-200
            ${
              isActive
                ? "border-pblue shadow-[0_16px_40px_rgba(37,99,235,0.25)] -translate-y-1"
                : "border-slate-200 hover:-translate-y-1 hover:border-pblue/50 hover:shadow-md"
            }`}
                >
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {service.platform}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {service.packages.length} packages
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

      {/* Service Choosing & Order Form */}
      <section className="py-16 lg:py-20 bg-linear-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedPlatform && (
            <>
              <div className="mb-8 text-center">
                <p className="inline-flex items-center rounded-full border border-pblue/10 bg-pblue/5 px-3 py-1 text-xs font-semibold tracking-widest text-pblue uppercase">
                  Choose package & order
                </p>
              </div>
              <div className="relative mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white/95 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                {/* Close */}
                <button
                  onClick={closeForm}
                  className="absolute top-4 right-4 rounded-md p-2 transition hover:bg-slate-100"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>

                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {selectedPlatform.platform} Service
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose a package and quantity to continue.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Package */}
                      <div className="md:col-span-2 space-y-3">
                        <FormField
                          control={form.control}
                          name="packageId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Package
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a package" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {selectedPlatform.packages.map((pkg: any) => (
                                    <SelectItem key={pkg.id} value={pkg.id}>
                                      {pkg.description} c ${pkg.price}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {selectedPkg && (
                          <div className="rounded-xl bg-slate-50 p-3">
                            <p className="text-[11px] font-semibold text-slate-600">
                              Package details
                            </p>
                            <p className="mt-1 text-[12px] text-slate-600">
                              {selectedPkg.description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Unit Price */}
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Unit Price
                        </FormLabel>
                        <Input
                          readOnly
                          value={unitPrice ? `$${unitPrice.toFixed(2)}` : "$0"}
                          className="bg-slate-50"
                        />
                      </FormItem>

                      {/* Quantity */}
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Quantity
                            </FormLabel>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              value={field.value ?? 1}
                              onChange={(e) =>
                                field.onChange(
                                  Math.max(1, Number(e.target.value))
                                )
                              }
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Total */}
                      <div className="md:col-span-2 border-t pt-6">
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Total
                          </FormLabel>
                          <Input
                            readOnly
                            value={
                              totalPrice ? `$${totalPrice.toFixed(2)}` : "$0"
                            }
                            className="bg-slate-50 text-lg font-semibold text-pblue"
                          />
                        </FormItem>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      type="submit"
                      disabled={!selectedPkg}
                      className="w-full h-12 text-base font-semibold bg-linear-to-r from-pblue to-bluegray hover:brightness-110 hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </Form>
              </div>
            </>
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
                description:
                  "Real accounts, real engagement, no bots or fake activity",
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
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
                description:
                  "Select the social media service and package that fits your needs",
              },
              {
                step: "2",
                title: "Make Payment",
                description:
                  "Complete secure payment using your preferred payment method",
              },
              {
                step: "3",
                title: "Provide Details",
                description:
                  "Enter your profile information and service requirements",
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
