"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

const AddService = () => {
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
    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new service. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Platform Selection */}
          <div className="grid gap-2">
            <Label htmlFor="platform">
              Platform <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedPlatform}
              onValueChange={(value) => {
                setValue("platform", value);
                setShowCustomPlatform(value === "Custom");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORM_OPTIONS.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.platform && (
              <p className="text-xs text-red-500">Platform is required</p>
            )}
          </div>

          {/* Custom Platform Input */}
          {showCustomPlatform && (
            <div className="grid gap-2">
              <Label htmlFor="customPlatform">
                Custom Platform Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customPlatform"
                placeholder="Enter custom platform name"
                {...register("customPlatform", {
                  required: showCustomPlatform,
                })}
              />
            </div>
          )}

          {/* Service Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Service Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., World Wide, County Based"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">Name is required</p>
            )}
          </div>

          {/* Count */}
          <div className="grid gap-2">
            <Label htmlFor="count">
              Count/Quantity <span className="text-red-500">*</span>
            </Label>
            <Input
              id="count"
              placeholder="e.g., 1, 10, 20-25"
              {...register("count", { required: true })}
            />
            <p className="text-xs text-slate-500">
              Can be a number or range (e.g., "20-25")
            </p>
            {errors.count && (
              <p className="text-xs text-red-500">Count is required</p>
            )}
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">
              Price ($) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="49.99"
              {...register("price", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            />
            {errors.price && (
              <p className="text-xs text-red-500">Valid price is required</p>
            )}
          </div>

          {/* Delivery Time Range */}
          <div className="grid gap-2">
            <Label htmlFor="deliveryTimeRange">
              Delivery Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="deliveryTimeRange"
              placeholder="e.g., 3-5 Days, 30 Days"
              {...register("deliveryTimeRange", { required: true })}
            />
            {errors.deliveryTimeRange && (
              <p className="text-xs text-red-500">Delivery time is required</p>
            )}
          </div>

          {/* Service Type */}
          <div className="grid gap-2">
            <Label htmlFor="type">
              Service Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={watch("type")}
              onValueChange={(value: "Standard" | "Monthly") =>
                setValue("type", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Monthly">Monthly Pack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="isFeatured" className="text-sm font-medium">
                Featured Service
              </Label>
              <p className="text-xs text-slate-500">
                Highlight this service on the homepage
              </p>
            </div>
            <Switch
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={(checked) => setValue("isFeatured", checked)}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="isActive" className="text-sm font-medium">
                Active Status
              </Label>
              <p className="text-xs text-slate-500">
                Make service visible to customers
              </p>
            </div>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setShowCustomPlatform(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Save Service
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddService;
