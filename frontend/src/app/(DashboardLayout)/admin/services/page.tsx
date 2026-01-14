"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddService from "@/components/admin/AddService";

type TService = {
  _id?: string;
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
};

// Temporary mock data – replace with real data from API later
const mockServices: TService[] = [
  {
    platform: "Google",
    name: "Google 5 Star Reviews",
    count: "5",
    price: 49,
    deliveryTimeRange: "3-5 days",
    type: "Standard",
    isFeatured: true,
  },
  {
    platform: "Facebook",
    name: "Facebook Page Likes",
    count: "100",
    price: 29,
    deliveryTimeRange: "1-3 days",
    type: "Standard",
    isFeatured: false,
  },
  {
    platform: "Instagram",
    name: "Instagram Followers",
    count: "500",
    price: 79,
    deliveryTimeRange: "5-7 days",
    type: "Monthly",
    isFeatured: false,
  },
];

const AdminServices = () => {
  const handleEdit = (service: TService) => {
    // Later: open edit dialog and pass this service data
    console.log("Edit service", service);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Services
          </h1>
          <p className="text-sm text-slate-500">
            Simple list of services with edit actions.
          </p>
        </div>

        <AddService />
      </section>

      {/* Simple services table */}
      <section>
        <div className="rounded-md border border-slate-200 bg-white">
          <Table className="text-left text-sm text-slate-700">
            <TableHeader className="bg-slate-50 text-xs font-medium uppercase text-slate-500">
              <TableRow>
                <TableHead className="px-4 py-3">Name</TableHead>
                <TableHead className="px-4 py-3">Platform</TableHead>
                <TableHead className="px-4 py-3">Count</TableHead>
                <TableHead className="px-4 py-3">Price ($)</TableHead>
                <TableHead className="px-4 py-3">Delivery</TableHead>
                <TableHead className="px-4 py-3">Type</TableHead>
                <TableHead className="px-4 py-3">Featured</TableHead>
                <TableHead className="px-4 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockServices.map((service) => (
                <TableRow key={service._id} className="hover:bg-slate-50/80">
                  <TableCell className="px-4 py-3 align-top">
                    {service.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top">
                    {service.platform}
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top">
                    {service.count}
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top">
                    {service.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top">
                    {service.deliveryTimeRange}
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top">
                    {service.type}
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top">
                    {service.isFeatured ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-500">
                        No
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs"
                      onClick={() => handleEdit(service)}
                    >
                      Edit service
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default AdminServices;
