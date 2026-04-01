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
import { getAllOrders, updateOrderStatus, updateOrderPaymentStatus } from "@/services/order";
import { TOrder, TWorkingStatus, workingStatus, paymentStatus, TPaymentStatus } from "@/types/order";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
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

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  UNPAID: {
    label: "Unpaid",
    className: "border-rose-100 bg-rose-50 text-rose-700",
  },
  PAID: {
    label: "Paid",
    className: "border-emerald-100 bg-emerald-50 text-emerald-700",
  },
};

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ManageOrder = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
    orderId: string;
    newStatus: TWorkingStatus | TPaymentStatus;
    type: "working" | "payment";
  } | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getAllOrders();
        console.log(res);
        if (res?.success) {
          setOrders(res.data.data); // Updated to handle new structure
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    orderId: string,
    newStatus: TWorkingStatus,
  ) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res?.success) {
        toast.success("Order status updated successfully");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, workingStatus: newStatus }
              : order,
          ),
        );
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
      console.error("Status update error:", error);
    }
  };

  const handlePaymentStatusChange = async (
    orderId: string,
    newStatus: TPaymentStatus,
  ) => {
    try {
      const res = await updateOrderPaymentStatus(orderId, newStatus);
      if (res?.success) {
        toast.success("Payment status updated successfully");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, paymentStatus: newStatus }
              : order,
          ),
        );
      } else {
        toast.error(res?.message || "Failed to update payment status");
      }
    } catch (error) {
      toast.error("An error occurred while updating payment status");
      console.error("Payment status update error:", error);
    }
  };

  const onStatusSelect = (orderId: string, newStatus: TWorkingStatus) => {
    setPendingUpdate({ orderId, newStatus, type: "working" });
    setConfirmOpen(true);
  };

  const onPaymentStatusSelect = (orderId: string, newStatus: TPaymentStatus) => {
    setPendingUpdate({ orderId, newStatus, type: "payment" });
    setConfirmOpen(true);
  };

  const confirmUpdate = () => {
    if (pendingUpdate) {
      if (pendingUpdate.type === "working") {
        handleStatusChange(pendingUpdate.orderId, pendingUpdate.newStatus as TWorkingStatus);
      } else {
        handlePaymentStatusChange(pendingUpdate.orderId, pendingUpdate.newStatus as TPaymentStatus);
      }
    }
    setConfirmOpen(false);
    setPendingUpdate(null);
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return true;
    return order.orderId.toLowerCase().includes(term);
  });

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const startIndex =
    filteredOrders.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, filteredOrders.length);

  if (loading) return <Loading />;

  return (
    <main className="py-8 space-y-6">
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update {pendingUpdate?.type === 'working' ? 'Order' : 'Payment'} Status?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status to{" "}
              <span className="font-bold text-slate-900">
                {pendingUpdate?.newStatus}
              </span>
              ? This action will be visible to the customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingUpdate(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmUpdate}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                <div className="overflow-x-auto">
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
                        TX ID
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold">
                        Payment
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold">
                        Working
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-bold text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.map((order) => {
                      const statusMeta =
                        statusConfig[order.workingStatus] ||
                        statusConfig.PENDING;
                      
                      const paymentMeta = 
                        paymentStatusConfig[order.paymentStatus] ||
                        paymentStatusConfig.UNPAID;

                      return (
                        <TableRow
                          key={order._id}
                          className="border-t border-slate-100 bg-white hover:bg-slate-50/50"
                        >
                          <TableCell className="px-4 py-4 align-middle">
                            {order.cancelRequested ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="text-[11px] font-mono text-red-600 font-bold uppercase cursor-help">
                                      #{order.orderId}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">
                                      Customer has requested to cancel this
                                      order.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              <span className="text-[11px] font-mono text-slate-500 uppercase">
                                #{order.orderId}
                              </span>
                            )}
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
                                <div className="space-y-4 py-4">
                                  <div className="flex justify-center">
                                    <ServiceCard
                                      service={order.orderedService}
                                      buyNowDisabled={true}
                                    />
                                  </div>
                                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Promoted Links</h4>
                                    <div className="space-y-2">
                                      {order.links && order.links.length > 0 ? (
                                        order.links.map((link, idx) => (
                                          <a 
                                            key={idx} 
                                            href={link.startsWith('http') ? link : `https://${link}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs font-medium text-pblue hover:underline flex items-center gap-2 break-all"
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-pblue shrink-0" />
                                            {link}
                                          </a>
                                        ))
                                      ) : (
                                        <p className="text-xs text-slate-500 italic">No links provided</p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Transaction ID</p>
                                      <p className="text-xs font-mono font-bold text-slate-700 break-all">{order.transactionId || "N/A"}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Payment Method</p>
                                      <p className="text-xs font-bold text-slate-700 uppercase">{order.paymentMethod || "N/A"}</p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle text-sm font-semibold text-slate-900">
                            ${order.totalPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle">
                             <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded break-all max-w-[100px] inline-block">
                                {order.transactionId || "N/A"}
                             </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle">
                            <span
                              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${paymentMeta.className}`}
                            >
                              {paymentMeta.label}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle">
                            <span
                              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${statusMeta.className}`}
                            >
                              {statusMeta.label}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 align-middle text-right">
                             <div className="flex flex-col gap-2 items-end">
                                <Select
                                  value={order.paymentStatus}
                                  onValueChange={(value: TPaymentStatus) =>
                                    onPaymentStatusSelect(order._id, value)
                                  }
                                >
                                  <SelectTrigger className="w-28 h-7 text-[10px] font-medium border-slate-200">
                                    <SelectValue placeholder="Payment" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {paymentStatus.map((status) => (
                                      <SelectItem
                                        key={status}
                                        value={status}
                                        className="text-[10px] font-medium"
                                      >
                                        {status}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Select
                                  value={order.workingStatus}
                                  onValueChange={(value: TWorkingStatus) =>
                                    onStatusSelect(order._id, value)
                                  }
                                >
                                  <SelectTrigger className="w-28 h-7 text-[10px] font-medium border-slate-200">
                                    <SelectValue placeholder="Working" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {workingStatus.map((status) => (
                                      <SelectItem
                                        key={status}
                                        value={status}
                                        className="text-[10px] font-medium"
                                      >
                                        {status}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                             </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                </div>

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
