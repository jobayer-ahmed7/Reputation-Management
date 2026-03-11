"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MessageSquare, Phone, User, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
 email: z.string().check(z.email({ message: "Please enter a valid email address." })),
  whatsapp: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact Form Data:", data);
    alert("Check console for form data!");
    reset();
  };

  return (
    <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-pblue/5 px-3 py-1 rounded-full border border-pblue/10">
                  Get in touch
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Ready to boost your <br />
                  <span className="bg-linear-to-r from-pblue to-blue-600 bg-clip-text text-transparent">
                    Online Reputation?
                  </span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                  Have questions about our services or need a custom package? 
                  Send us a message and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 text-pblue">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email Us</p>
                    <p className="text-slate-600">support@reputationmanage.com</p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pblue/20 focus:border-pblue transition-all"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pblue/20 focus:border-pblue transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>
                  )}
                </div>

                {/* WhatsApp Field (Optional) */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    WhatsApp Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      {...register("whatsapp")}
                      type="text"
                      placeholder="+1 234 567 890"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pblue/20 focus:border-pblue transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">How can we help?</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Tell us about your business or requirements..."
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pblue/20 focus:border-pblue transition-all resize-none"
                    />
                  </div>
                  {errors.message && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-8 py-4 bg-linear-to-r from-pblue to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-pblue/20 hover:shadow-xl hover:shadow-pblue/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-pblue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
