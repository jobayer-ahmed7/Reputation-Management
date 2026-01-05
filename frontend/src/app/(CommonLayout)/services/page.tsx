"use client";

import { useState } from "react";
import {
  MessageCircle,
  Users,
  TrendingUp,
  CheckCircle,
  X,
} from "lucide-react";
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
import { Label } from "@/components/ui/label";

const ServicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    package: "",
    price: 0,
    quantity: 1,
    totalPrice: 0,
  });

  const categories = [
    { id: "all", label: "All Services" },
    { id: "reviews", label: "Reviews" },
    { id: "engagement", label: "Engagement" },
    { id: "growth", label: "Growth" },
  ];

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

  const handlePlatformClick = (service) => {
    setSelectedPlatform(service);
    setSelectedPackage(null);
    setFormData({
      package: "",
      price: 0,
      quantity: 1,
      totalPrice: 0,
    });
  };

  const handlePackageChange = (packageId) => {
    const service = services.find((s) => s.platform === selectedPlatform.platform);
    const pkg = service.packages.find((p) => p.id === packageId);
    
    if (pkg) {
      setSelectedPackage(pkg);
      setFormData({
        package: packageId,
        price: pkg.price,
        quantity: 1,
        totalPrice: pkg.price,
      });
    }
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 1;
    setFormData({
      ...formData,
      quantity: qty,
      totalPrice: formData.price * qty,
    });
  };

  const handleSubmit = () => {
    console.log("Order submitted:", {
      platform: selectedPlatform.platform,
      ...formData,
    });
    alert(`Order placed for ${selectedPlatform.platform}!\nTotal: $${formData.totalPrice}`);
  };

  const closeForm = () => {
    setSelectedPlatform(null);
    setSelectedPackage(null);
    setFormData({
      package: "",
      price: 0,
      quantity: 1,
      totalPrice: 0,
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

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-slate-200">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handlePlatformClick(service)}
                className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left ${
                  selectedPlatform?.platform === service.platform
                    ? "border-pblue bg-blue-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-pblue hover:shadow-md"
                }`}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {service.platform}
                </h3>
                <p className="text-slate-600">
                  {service.packages.length} packages available
                </p>
              </button>
            ))}
          </div>

          {/* Order Form */}
          {selectedPlatform && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-pblue shadow-xl p-8 relative">
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

              <div className="mb-6">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  Order {selectedPlatform.platform} Service
                </h3>
                <p className="text-slate-600">
                  Select a package and quantity to place your order
                </p>
              </div>

              <div className="space-y-6">
                {/* Package Selection */}
                <div className="space-y-2">
                  <Label htmlFor="package" className="text-slate-900 font-semibold">
                    Select Package
                  </Label>
                  <Select onValueChange={handlePackageChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedPlatform.packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.description} - ${pkg.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Field */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-slate-900 font-semibold">
                    Price per Unit
                  </Label>
                  <Input
                    id="price"
                    type="text"
                    value={formData.price > 0 ? `$${formData.price}` : "$0"}
                    readOnly
                    className="bg-slate-50"
                  />
                </div>

                {/* Quantity Field */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-slate-900 font-semibold">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleQuantityChange}
                    className="w-full"
                  />
                </div>

                {/* Total Price Field */}
                <div className="space-y-2">
                  <Label htmlFor="totalPrice" className="text-slate-900 font-semibold">
                    Total Price
                  </Label>
                  <Input
                    id="totalPrice"
                    type="text"
                    value={formData.totalPrice > 0 ? `$${formData.totalPrice}` : "$0"}
                    readOnly
                    className="bg-slate-50 text-xl font-bold text-pblue"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedPackage}
                  className="w-full bg-linear-to-r from-pblue to-bluegray text-white py-6 text-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </Button>
              </div>
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