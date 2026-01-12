"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import AddService from "@/components/admin/AddService";

const PLATFORM_OPTIONS = [
  "Google",
  "Facebook",
  "Trustpilot",
  "Yelp",
  "IMDB",
  "Zillow",
  "Tripadvisor",
  "Apps-Android",
  "Apps-iPhone",
  "Glassdoor",
  "Indeed",
  "BusinessYab",
  "Custom",
];

type ServiceFormData = {
  platform: string;
  customPlatform?: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
  isActive: boolean;
};

const AdminServices = () => {
  const [open, setOpen] = useState(false);
  const [showCustomPlatform, setShowCustomPlatform] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      platform: "",
      customPlatform: "",
      name: "",
      count: "",
      price: 0,
      deliveryTimeRange: "",
      type: "Standard",
      isFeatured: false,
      isActive: true,
    },
  });

  const selectedPlatform = watch("platform");
  const isFeatured = watch("isFeatured");
  const isActive = watch("isActive");

  const onSubmit = (data: ServiceFormData) => {
    // Use custom platform if "Custom" was selected
    const finalData = {
      ...data,
      platform:
        data.platform === "Custom" ? data.customPlatform : data.platform,
      price: Number(data.price),
    };

    // Remove customPlatform field from final data
    delete finalData.customPlatform;

    console.log("Service Data:", finalData);

    // Reset form and close dialog
    reset();
    setShowCustomPlatform(false);
    setOpen(false);
  };

  return (
    <div className="py-8 space-y-6">
      {/* Page header */}
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Services Management
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            View, filter, and manage all services available to customers in the
            storefront.
          </p>
        </div>

        {/* Add service */}
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="h-4 w-4" />
                <span className="text-sm font-semibold">Add New Service</span>
              </Button>
            </DialogTrigger>

            <AddService/>
          </Dialog>
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Total services</CardDescription>
            <CardTitle className="text-2xl font-semibold">12</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            All services currently configured in the system.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-2xl font-semibold text-emerald-600">
              6
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Visible and available for customers to purchase.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Inactive</CardDescription>
            <CardTitle className="text-2xl font-semibold text-rose-600">
              4
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Hidden from the storefront but kept for later use.
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminServices;
