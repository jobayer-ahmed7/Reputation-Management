"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getServiceById } from "@/services/service";
import { TService } from "@/types/service";
import Loading from "@/components/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Info } from "lucide-react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/services/order";

const paymentOptions = [
  {
    id: "binance",
    name: "Binance",
    details: "Binance Pay ID: 123456789\nEmail: binance@example.com",
  },
  {
    id: "payoneer",
    name: "Payoneer",
    details: "Payoneer Email: payoneer@example.com",
  },
  {
    id: "wise",
    name: "Wise",
    details: "Wise Email: wise@example.com\nAccount Name: Example Corp",
  },
];

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const [service, setService] = useState<TService | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/login?redirectPath=${currentUrl}`);
      return;
    }

    if (!serviceId) {
      router.push("/services");
      return;
    }

    const fetchService = async () => {
      setLoading(true);
      try {
        const response = await getServiceById(serviceId);
        if (response.success) {
          setService(response.data);
        } else {
          toast.error("Service not found");
          router.push("/services");
        }
      } catch (error) {
        toast.error("Error fetching service details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId, router, user, isUserLoading]);

  const selectedPaymentDetail = paymentOptions.find(
    (opt) => opt.id === selectedPayment,
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      router.push("/login");
      return;
    }

    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    if (!transactionId) {
      toast.error("Please enter the transaction ID");
      return;
    }

    try {
      // Logic to create order
      const orderData = {
        orderedService: serviceId,
        user: user._id,
        totalPrice: service?.price,
        transactionId: transactionId,
      };

      const response = await createOrder(orderData);
      if (response.success) {
        toast.success("Order placed successfully!");
        router.push("/customer"); // Redirect to orders page
      } else {
        toast.error(response.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order");
    }
  };

  if (loading) return <Loading />;
  if (!service) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section: Product Details */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100">
                <CardTitle className="text-xl font-bold">Service Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-pblue uppercase tracking-widest mb-1">
                      {service.platform}
                    </p>
                    <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                      {service.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-pblue">
                      ${service.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Quantity</p>
                      <p className="text-lg font-bold text-slate-900">{service.count}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Delivery Time</p>
                      <p className="text-lg font-bold text-slate-900">{service.deliveryTimeRange}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Service Type</p>
                    <p className="text-lg font-bold text-slate-900">{service.type}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4">
                  <Info className="w-6 h-6 text-pblue shrink-0" />
                  <div>
                    <h4 className="font-bold text-pblue text-sm mb-1">Order Process</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your order will be processed automatically once our team verifies the transaction ID. 
                      Standard delivery times apply after verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section: Payment Options */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="bg-white border-b border-slate-100">
                <CardTitle className="text-xl font-bold">Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="payment-method" className="text-sm font-bold text-slate-700">
                    1. Choose Payment Method
                  </Label>
                  <Select onValueChange={setSelectedPayment}>
                    <SelectTrigger id="payment-method" className="w-full h-12 border-slate-200 focus:ring-pblue">
                      <SelectValue placeholder="Select how you'll pay" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentOptions.map((opt) => (
                        <SelectItem key={opt.id} value={opt.id} className="cursor-pointer">
                          {opt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPaymentDetail && (
                  <div className="p-5 bg-linear-to-br from-slate-50 to-white rounded-xl border-2 border-dashed border-slate-200 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-pblue animate-pulse" />
                      <p className="text-sm font-bold text-slate-800">Payment Details for {selectedPaymentDetail.name}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                      <p className="text-sm text-slate-600 whitespace-pre-wrap font-mono leading-relaxed">
                        {selectedPaymentDetail.details}
                      </p>
                    </div>
                    <p className="mt-3 text-[11px] text-slate-500 leading-tight">
                      * Please make sure to send the exact amount to avoid delays in processing your order.
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <Label htmlFor="transaction-id" className="text-sm font-bold text-slate-700">
                    2. Verification
                  </Label>
                  <Input
                    id="transaction-id"
                    placeholder="Enter your Transaction Hash / ID"
                    className="h-12 border-slate-200 focus:ring-pblue font-mono"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                  <p className="text-[11px] text-slate-500 px-1">
                    Enter the unique ID provided by your payment platform after the transfer.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-600 font-medium">Payable Amount</span>
                    <span className="text-3xl font-black text-slate-900">${service.price.toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full h-14 bg-linear-to-r from-pblue to-bluegray text-white text-lg font-black rounded-xl shadow-[0_10px_20px_-5px_rgba(1,122,255,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(1,122,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    COMPLETE ORDER
                  </Button>
                  <p className="mt-4 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    SECURE PAYMENT VERIFICATION SYSTEM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;
