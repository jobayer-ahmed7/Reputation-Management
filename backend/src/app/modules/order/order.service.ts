import { Types } from 'mongoose';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrderIntoDB = async (payload: TOrder) => {
  const user_id = payload.user.toString();
  
  // Check if user exists
  const DBuser = await User.findById(user_id);
  if (!DBuser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Generate unique Order ID
  const orderId = `ORD-${uuidv4().slice(0, 8).toUpperCase()}-${Date.now()}`;

  const orderData = {
    ...payload,
    orderId,
    paymentStatus: 'UNPAID' as const,
    workingStatus: 'PENDING' as const,
  };

  const createdOrder = await Order.create(orderData);

  return createdOrder;
};

// get order by user id

const getOrderByUserIdFromDB = async (userId: string) => {
  const result = await Order.find({ user: new Types.ObjectId(userId) }).populate('orderedService');
  return result;
};

// Get all orders with pagination and filtering

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1; // Default to page 1 if not provided
  const limit = Number(query.limit) || 10; // Default to 10 items per page if not provided
  const skip = (page - 1) * limit;
  const userId = query.user as string;

  // filter object 
  const filter: Record<string, unknown> = {
    isDeleted: { $ne: true },
  };
  if (userId) {
    filter.user = userId;
  }

  const result = await Order.find()
    .populate('user')
    .populate('orderedService')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // Sort by newest first

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

  // console.log({id, payload})

  const result = await Order.findByIdAndUpdate(
    id,
    payload,
    { returnDocument: 'after' },
  );
  return result;
};

// Soft delete order
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { returnDocument: 'after' },
  );
  return result;
};

export const OrderService = {
  getAllOrdersFromDB,
  getOrderByUserIdFromDB,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
