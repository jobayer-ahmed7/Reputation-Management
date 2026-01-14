"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Pencil } from "lucide-react";
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

export type TUpdateService = {
  _id?: string;
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
};

type TServiceFormData = {
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
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

interface UpdateServiceProps {
  service: TUpdateService;
}

const UpdateService = ({ service }: UpdateServiceProps) => {
  const [open, setOpen] = useState(false);

  // Creatable select options for platforms
  const [platformOptions, setPlatformOptions] = useState(suggestedPlatforms);

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
      platform: service.platform,
      name: service.name,
      count: service.count,
      price: service.price,
      deliveryTimeRange: service.deliveryTimeRange,
      type: service.type,
      isFeatured: service.isFeatured,
    },
  });

  const isFeatured = watch("isFeatured");

  // Reset form when service changes
  useEffect(() => {
    reset({
      platform: service.platform,
      name: service.name,
      count: service.count,
      price: service.price,
      deliveryTimeRange: service.deliveryTimeRange,
      type: service.type,
      isFeatured: service.isFeatured,
    });
  }, [service, reset]);

  const onSubmit = (data: TServiceFormData) => {
    const finalData = {
      _id: service._id,
      ...data,
      price: Number(data.price),
    };

    console.log("Update Service Data:", finalData);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs"
        >
          <Pencil className="mr-1 h-3 w-3" />
          Edit service
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service details for this platform.
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
                    ? platformOptions.find(
                        (opt) => opt.value === field.value
                      ) || { value: field.value, label: field.value }
                    : null;

                  return (
                    <CreatableSelect
                      isClearable
                      options={platformOptions}
                      value={selectedOption}
                      placeholder="Select or create platform"
                      onChange={(newValue) => {
                        const option = newValue as {
                          value: string;
                          label: string;
                        } | null;
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
                <p className="text-xs text-red-500">Service name is required</p>
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
            <div className="grid gap-2 ">
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
                onCheckedChange={(checked) => setValue("isFeatured", checked)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Update Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateService
