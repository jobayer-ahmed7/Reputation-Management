import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppErrors";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import config from "../../config";
import { UserServices } from "../user/user.service";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

const getStripeClient = () => {
  if (!config.stripe_secret_key) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "STRIPE_SECRET_KEY is not configured"
    );
  }

  return new Stripe(config.stripe_secret_key);
};

const getBackendBaseUrl = () => {
  if (config.backendBaseUrl) return config.backendBaseUrl;

  // Best-effort local fallback (useful for dev). In production you should set BACKEND_BASE_URL.
  const port = config.port || "5000";
  return `http://localhost:${port}`;
};

type TCreateOrderPayload = Pick<TOrder, "products" | "user"> & {
  totalPrice?: number;
};

const calculateTotalPrice = (payload: Pick<TCreateOrderPayload, "products" | "totalPrice">) => {
  if (typeof payload.totalPrice === "number" && Number.isFinite(payload.totalPrice)) {
    return payload.totalPrice;
  }

  return payload.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const createOrderIntoDB = async (payload: TCreateOrderPayload) => {
  const stripe = getStripeClient();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_id = payload.user.toString();
    const transactionId = `${uuidv4()}-${Date.now()}`;
    const DBuser = await UserServices.getSingleUser(user_id);

    if (!DBuser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const totalPrice = calculateTotalPrice(payload);

    const orderData = {
      ...payload,
      totalPrice,
      paymentStatus: "UNPAID" as const,
      transactionId,
    };

    const createdOrder = await Order.create([orderData], { session });
    const order = createdOrder[0];

    if (!order) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Order was not created");
    }

    const successUrl = `${getBackendBaseUrl()}/api/orders/success/${transactionId}?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${getBackendBaseUrl()}/api/orders/fail/${transactionId}?session_id={CHECKOUT_SESSION_ID}`;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: DBuser.email,
      client_reference_id: transactionId,
      metadata: {
        transactionId,
        orderId: order._id.toString(),
        userId: user_id,
      },
      line_items: payload.products.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: config.stripe_currency || "usd",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: `Product ${item.product.toString()}`,
          },
        },
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    await Order.updateOne(
      { _id: order._id },
      {
        stripeCheckoutSessionId: checkoutSession.id,
        stripePaymentIntentId:
          typeof checkoutSession.payment_intent === "string"
            ? checkoutSession.payment_intent
            : undefined,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      GatewayPageURL: checkoutSession.url,
      order,
      transactionId,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const markOrderPaidByTransactionId = async (transactionId: string) => {
  const order = await Order.findOne({ transactionId });

  if (!order) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No order found with this transaction ID"
    );
  }

  const updatedResult = await Order.updateOne(
    { transactionId },
    {
      workingStatus: "WORKING ON",
      paymentStatus: "PAID",
    }
  );

  if (updatedResult.modifiedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Order was not updated");
  }

  return updatedResult;
};

// Success order (Stripe Checkout return URL)
const successOrderIntoDB = async (transactionId: string, stripeSessionId?: string) => {
  if (!stripeSessionId) {
    // Fallback (if you're not using Stripe return URLs with session_id)
    return markOrderPaidByTransactionId(transactionId);
  }

  const stripe = getStripeClient();
  const checkoutSession = await stripe.checkout.sessions.retrieve(stripeSessionId);

  if (checkoutSession.metadata?.transactionId !== transactionId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Stripe session for this order");
  }

  if (checkoutSession.payment_status !== "paid") {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment is not completed");
  }

  return markOrderPaidByTransactionId(transactionId);
};

// Fail order
const failOrderIntoDB = async (transactionId: string) => {
  // delete the order with the given transactionId
  const deleteOrder = await Order.deleteOne({ transactionId });

  if (deleteOrder.deletedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete order");
  }

  return deleteOrder;
};

// Get all orders with pagination and filtering
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  let page = Number(query.page) || 1; // Default to page 1 if not provided
  let limit = Number(query.limit) || 10; // Default to 10 items per page if not provided
  const skip = (page - 1) * limit;
  const userId = query.id as string;

  // filter object
  const filter: Record<string, unknown> = {
    isDeleted: { $ne: true },
  };
  if (userId) {
    filter.user = userId;
  }
  // console.log(filter);
  // exclude the deleted orders

  const result = await Order.find(filter)
    .populate("user")
    .populate("products.product")
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments(filter);
  return {
    data: result,
    totalOrders,
    totalPages: Math.ceil(totalOrders / limit),
    currentPage: page,
  };
};

// Update order
const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const workingStatus = payload.workingStatus;
  const result = await Order.findByIdAndUpdate(
    id,
    { workingStatus },
    { new: true }
  );
  return result;
};

// Soft delete order
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const OrderService = {
  getAllOrdersFromDB,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
  successOrderIntoDB,
  failOrderIntoDB,
  markOrderPaidByTransactionId,
};
