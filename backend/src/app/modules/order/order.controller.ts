import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created succesfully',
    data: result,
  });
});

// get order by user id
const getOrderByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await OrderService.getOrderByUserIdFromDB(userId as string);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

// get all orders
const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrdersFromDB(req.query);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Got All Order succesfully',
    data: result,
  });
});

const updateSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderService.updateOrderIntoDB(id as string, req.body);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Updated succesfully',
    data: result,
  });
});

const deleteSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrderFromDB(id as string);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Deleted succesfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getOrderByUserId,
  getAllOrder,
  updateSingleOrder,
  deleteSingleOrder,
};
