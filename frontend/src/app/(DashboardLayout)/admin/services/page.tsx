"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddService from "@/components/admin/AddService";
import UpdateService from "@/components/admin/UpdateService";
import { TService } from "@/types/service";
import { getAllServices } from "@/services/service";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const AdminServices = () => {
  const [services, setServices] = useState<TService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const allServices = await getAllServices();
      setServices(allServices.data);
    };
    fetchServices();
  }, []);

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
                <TableHead className="px-4 py-3 ">Update</TableHead>
                <TableHead className="px-4 py-3 ">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services?.map((service) => (
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
                  <TableCell className="px-4 py-3 align-top ">
                    <UpdateService service={service} />
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top text-right">
                    <Trash2 className="text-red-300 cursor-pointer"/>
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
