
import { TOrder } from './order.interface';
import { Order } from './order.model';

// const createOrderIntoDB = async (payload) => {
//   const user_id = payload.user.toString();
//   const transactionId = `${uuidv4()}-${Date.now()}`;
//   const DBuser = await UserServices.getSingleUser(user_id);

//   if (!DBuser) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User not found');
//   }

//   const orderData = {
//     ...payload,
//     paymentStatus: 'UNPAID' as const,
//     transactionId,
//   };

//   const createdOrder = await Order.create(orderData);

//   return createdOrder;
// };


// get order by user id

const getOrderByUserIdFromDB = async (userId: string) => {
  const result = await Order.find({ user: userId, isDeleted: { $ne: true } })
    .populate('products.product');
    console.log({result})
  return result;
}

// Get all orders with pagination and filtering


const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1; // Default to page 1 if not provided
  const limit = Number(query.limit) || 10; // Default to 10 items per page if not provided
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
    .populate('user')
    .populate('products.product')
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
    { new: true },
  );
  return result;
};

// Soft delete order
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const OrderService = {
  getAllOrdersFromDB,
  getOrderByUserIdFromDB,
  // createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
