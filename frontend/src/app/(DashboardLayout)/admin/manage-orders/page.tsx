"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllOrders, updateOrderStatus } from "@/services/order";
import { TOrder, TWorkingStatus, workingStatus } from "@/types/order";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServiceCard from "@/components/shared/ServiceCard";

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "border-amber-100 bg-amber-50 text-amber-700",
  },
  PROCESSING: {
    label: "Processing",
    className: "border-sky-100 bg-sky-50 text-sky-700",
  },
  COMPLETED: {
    label: "Completed",
    className: "border-emerald-100 bg-emerald-50 text-emerald-700",
  },
  CANCELED: {
    label: "Canceled",
    className: "border-rose-100 bg-rose-50 text-rose-700",
  },
};

const ManageOrder = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        console.log(res)
        if (res?.success) {
          setOrders(res.data.data); // Updated to handle new structure
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: TWorkingStatus) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res?.success) {
        toast.success("Order status updated successfully");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, workingStatus: newStatus } : order
          )
        );
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
      console.error("Status update error:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return true;
    return order._id.toLowerCase().includes(term);
  });

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const startIndex =
    filteredOrders.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, filteredOrders.length);

  return (
    <main className="py-8 space-y-6">
      <section>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Manage Orders
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            View orders and update their status.
          </p>
        </div>
      </section>

      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              Orders
            </CardTitle>
            <CardDescription>
              Monitor and manage customer orders across all services.
            </CardDescription>
            <div className="mt-4">
              <Input
                placeholder="Search by Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredOrders.length === 0 ? (
              <p className="px-4 py-12 text-center text-sm text-slate-500">
                No orders found.
              </p>
            ) : (
              <>
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold">
                        Order ID
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold">
                        Customer
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold">
                        Service
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold">
                        Price
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold">
                        Status
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold text-right">
                        Update Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.map((order) => {
                      const statusMeta =
                        statusConfig[order.workingStatus] || statusConfig.PENDING;

                      return (
                        <TableRow
                          key={order._id}
                          className="border-t border-slate-100 bg-white hover:bg-slate-50/50"
                        >
                          <TableCell className="px-4 py-4 align-middle">
                            <span className="text-[11px] font-mono text-slate-500 uppercase">
                              #{order._id.slice(-8)}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-900">
                                {order.user?.name || "Unknown"}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {order.user?.email}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="text-sm text-blue-600 hover:underline cursor-pointer text-left font-medium">
                                  {order.orderedService?.name}
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Service Details</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center py-4">
                                  <ServiceCard
                                    service={order.orderedService}
                                    buyNowDisabled={true}
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle text-sm font-semibold text-slate-900">
                            ${order.totalPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-tighter ${statusMeta.className}`}
                            >
                              {statusMeta.label}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle text-right">
                            <Select
                              value={order.workingStatus}
                              onValueChange={(value: TWorkingStatus) =>
                                handleStatusChange(order._id, value)
                              }
                            >
                              <SelectTrigger className="w-35 ml-auto h-8 text-[11px] font-medium border-slate-200">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                {workingStatus.map((status) => (
                                  <SelectItem
                                    key={status}
                                    value={status}
                                    className="text-[11px] font-medium"
                                  >
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-4">
                  <p className="text-[11px] text-slate-500 font-medium">
                    Showing {startIndex}-{endIndex} of {filteredOrders.length}{" "}
                    orders
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(event) => {
                            event.preventDefault();
                            setPage((prev) => Math.max(1, prev - 1));
                          }}
                          aria-disabled={currentPage === 1}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50 h-8 text-[11px]"
                              : "h-8 text-[11px] cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              href="#"
                              isActive={pageNumber === currentPage}
                              onClick={(event) => {
                                event.preventDefault();
                                setPage(pageNumber);
                              }}
                              className="h-8 w-8 text-[11px] cursor-pointer"
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(event) => {
                            event.preventDefault();
                            setPage((prev) => Math.min(totalPages, prev + 1));
                          }}
                          aria-disabled={currentPage === totalPages}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50 h-8 text-[11px]"
                              : "h-8 text-[11px] cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default ManageOrder;
