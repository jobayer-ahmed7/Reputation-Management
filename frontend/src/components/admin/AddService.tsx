"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import CreatableSelect from "react-select/creatable";

import { Button } from "@/components/ui/button";
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

/* ---------------- Types ---------------- */

type TServiceFormData = {
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
  isActive: boolean;
};


  const suggestedPlatforms = [
  { value: "Google", label: "Google" },
  { value: "Facebook", label: "Facebook" },
  { value: "Trustpilot", label: "Trustpilot" }, 
  { value: "Yelp", label: "Yelp" },
  { value: "IMDB", label: "IMDB" },
  { value: "Zillow", label: "Zillow" },
  { value: "Tripadvisor", label: "Tripadvisor" },
  { value: "Apps-Android", label: "Apps-Android" },
  { value: "Apps-iPhone", label: "Apps-iPhone" },
  { value: "Glassdoor", label: "Glassdoor" },
  { value: "Indeed", label: "Indeed" },
  { value: "BusinessYab", label: "BusinessYab" },
  ];


/* ---------------- Component ---------------- */

const AddService = () => {
  const [open, setOpen] = useState(false);

  // Creatable select options for platforms
  const [platformOptions, setPlatformOptions] = useState(
    suggestedPlatforms,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<TServiceFormData>({
    defaultValues: {
      platform: "",
      name: "",
      count: "",
      price: 0,
      deliveryTimeRange: "",
      type: "Standard",
      isFeatured: false,
      isActive: true,
    },
  });

  const isFeatured = watch("isFeatured");
  const isActive = watch("isActive");

  const onSubmit = (data: TServiceFormData) => {
    const finalData = {
      ...data,
      price: Number(data.price),
    };

    console.log("Service Data:", finalData);

    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="h-4 w-4" />
          Add New Service
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service offering for your platform.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            {/* Platform */}
            <div className="grid gap-2">
              <Label>
                Platform <span className="text-red-500">*</span>
              </Label>

              <Controller
                name="platform"
                control={control}
                rules={{ required: "Platform is required" }}
                render={({ field }) => {
                  const selectedOption = field.value
                    ?
                        platformOptions.find(
                          (opt) => opt.value === field.value,
                        ) || { value: field.value, label: field.value }
                    : null;

                  return (
                    <CreatableSelect
                      isClearable
                      options={platformOptions}
                      value={selectedOption}
                      placeholder="Select or create platform"
                      onChange={(newValue) => {
                        const option = newValue as
                          | { value: string; label: string }
                          | null;
                        const value = option?.value ?? "";
                        field.onChange(value);

                        if (
                          value &&
                          !platformOptions.some((opt) => opt.value === value)
                        ) {
                          setPlatformOptions((prev) => [
                            ...prev,
                            { value, label: value },
                          ]);
                        }
                      }}
                      onCreateOption={(inputValue) => {
                        const value = inputValue.trim();
                        if (!value) return;

                        const newOption = { value, label: value };
                        setPlatformOptions((prev) => [...prev, newOption]);
                        field.onChange(value);
                      }}
                    />
                  );
                }}
              />

              {errors.platform && (
                <p className="text-xs text-red-500">
                  {errors.platform.message || "Platform is required"}
                </p>
              )}
            </div>

            {/* Service Name */}
            <div className="grid gap-2">
              <Label>
                Service Name <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g. Google 5 Star Reviews"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-xs text-red-500">
                  Service name is required
                </p>
              )}
            </div>

            {/* Count */}
            <div className="grid gap-2">
              <Label>
                Count / Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g. 1, 10, 20-25"
                {...register("count", { required: true })}
              />
            </div>

            {/* Price */}
            <div className="grid gap-2">
              <Label>
                Price ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                {...register("price", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Delivery */}
            <div className="grid gap-2">
              <Label>
                Delivery Time <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g. 3-5 Days, 30 Days"
                {...register("deliveryTimeRange", { required: true })}
              />
            </div>

            {/* Service Type */}
            <div className="grid gap-2">
              <Label>Service Type</Label>
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

            {/* Featured */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Featured Service</Label>
              <Switch
                checked={isFeatured}
                onCheckedChange={(checked) =>
                  setValue("isFeatured", checked)
                }
              />
            </div>

            {/* Active */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Active Status</Label>
              <Switch
                checked={isActive}
                onCheckedChange={(checked) =>
                  setValue("isActive", checked)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;
