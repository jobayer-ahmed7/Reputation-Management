"use client";

import { useMemo, useState } from "react";
import { PlusCircle, Search, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const mockServices = [
  {
    id: "srv-101",
    name: "Google Review Boost",
    platform: "Google",
    category: "Reviews",
    price: 49,
    status: "active",
    orders: 120,
    createdAt: "Jan 02, 2026",
  },
  {
    id: "srv-102",
    name: "Facebook Page Likes",
    platform: "Facebook",
    category: "Engagement",
    price: 29,
    status: "active",
    orders: 85,
    createdAt: "Dec 18, 2025",
  },
  {
    id: "srv-103",
    name: "Instagram Followers Starter",
    platform: "Instagram",
    category: "Followers",
    price: 39,
    status: "inactive",
    orders: 40,
    createdAt: "Nov 30, 2025",
  },
  {
    id: "srv-104",
    name: "Google Premium Reviews",
    platform: "Google",
    category: "Reviews",
    price: 199,
    status: "active",
    orders: 32,
    createdAt: "Nov 12, 2025",
  },
];

const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [platformFilter, setPlatformFilter] = useState<string | "all">("all");

  const stats = useMemo(() => {
    const total = mockServices.length;
    const active = mockServices.filter((s) => s.status === "active").length;
    const inactive = mockServices.filter((s) => s.status === "inactive").length;

    return { total, active, inactive };
  }, []);

  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesSearch = searchTerm
        ? service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.platform.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesStatus =
        statusFilter === "all" ? true : service.status === statusFilter;

      const matchesPlatform =
        platformFilter === "all"
          ? true
          : service.platform.toLowerCase() === platformFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [searchTerm, statusFilter, platformFilter]);

  return (
    <main className="py-8 space-y-6">
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
        <div className="flex gap-2">
          <Button className="gap-2 bg-pblue hover:bg-bluegray">
            <PlusCircle className="h-4 w-4" />
            <span className="text-sm font-semibold">Add New Service</span>
          </Button>
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Total services</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {stats.total}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            All services currently configured in the system.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-2xl font-semibold text-emerald-600">
              {stats.active}
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
              {stats.inactive}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Hidden from the storefront but kept for later use.
          </CardContent>
        </Card>
      </section>

      {/* Filters + table */}
      <section>
        <Card className="border-slate-200">
          <CardHeader className="gap-4 border-b border-slate-100 pb-4 sm:flex sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-slate-900">
                All services
              </CardTitle>
              <CardDescription>
                Search and filter services by platform, category, or status.
              </CardDescription>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or platform"
                  className="pl-8 text-xs md:text-sm"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs outline-none focus-visible:border-pblue focus-visible:ring-2 focus-visible:ring-pblue/30 md:text-sm"
              >
                <option value="all">All status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Platform filter */}
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value as typeof platformFilter)}
                className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs outline-none focus-visible:border-pblue focus-visible:ring-2 focus-visible:ring-pblue/30 md:text-sm"
              >
                <option value="all">All platforms</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-600 md:text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                  <tr>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Platform</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Orders</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-xs text-slate-500 md:text-sm"
                      >
                        No services found. Try adjusting your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((service) => (
                      <tr
                        key={service.id}
                        className="border-t border-slate-100 bg-white/80 hover:bg-slate-50/80"
                      >
                        <td className="max-w-xs px-4 py-3 align-top">
                          <div className="space-y-0.5">
                            <p className="truncate text-sm font-medium text-slate-900">
                              {service.name}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              ID: {service.id}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                            {service.platform}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-slate-600">
                          {service.category}
                        </td>
                        <td className="px-4 py-3 align-top text-sm font-semibold text-slate-900">
                          ${service.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-slate-600">
                          {service.orders}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                              service.status === "active"
                                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                : "border-rose-100 bg-rose-50 text-rose-700"
                            }`}
                          >
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                            {service.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs"
                            >
                              {service.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="h-8 w-8 text-slate-500 hover:text-slate-700"
                              aria-label="More actions"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AdminServices;
