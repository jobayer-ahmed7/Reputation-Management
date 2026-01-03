import httpStatus from 'http-status';
import Stripe from 'stripe';
import config from '../../config/index';
import AppError from '../../errors/AppErrors';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OrderService } from './order.service';

const getStripeClient = () => {
  if (!config.stripe_secret_key) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'STRIPE_SECRET_KEY is not configured'
    ); 
  }

  return new Stripe(config.stripe_secret_key);
};

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created succesfully',
    data: result,
  });
});

// Stripe Checkout success return URL
const successOrder = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const stripeSessionId = req.query.session_id as string | undefined;

  const result = await OrderService.successOrderIntoDB(
    transactionId as string,
    stripeSessionId
  );

  if (result.modifiedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order was not updated');
  }

  return res.redirect(`${config.frontendBaseUrl}/successfull-order`);
});

// Stripe Checkout cancel return URL
const failOrder = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const result = await OrderService.failOrderIntoDB(transactionId as string);

  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete order');
  }

  return res.redirect(`${config.frontendBaseUrl}/failed-order`);
});

// Stripe webhook (recommended)
const stripeWebhook = catchAsync(async (req, res) => {
  if (!config.stripe_webhook_secret) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'STRIPE_WEBHOOK_SECRET is not configured'
    );
  }

  const signature = req.headers['stripe-signature'] as string | undefined;

  if (!signature) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Missing Stripe signature');
  }

  const rawBody = (req as any).rawBody as Buffer | undefined;

  if (!rawBody) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Webhook raw body not available (check express.json verify middleware)'
    );
  }

  const stripe = getStripeClient();

  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    config.stripe_webhook_secret
  );

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const transactionId = session.metadata?.transactionId;
      if (transactionId && session.payment_status === 'paid') {
        await OrderService.markOrderPaidByTransactionId(transactionId);
      }
      break;
    }
    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const transactionId = session.metadata?.transactionId;
      if (transactionId) {
        await OrderService.failOrderIntoDB(transactionId);
      }
      break;
    }
  }

  return res.status(200).json({ received: true });
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
  const result = await OrderService.deleteOrderFromDB(id as string  );
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Deleted succesfully',
    data: result,
  });
});


export const OrderControllers = {
  createOrder,
  getAllOrder,
  updateSingleOrder,
  deleteSingleOrder,
  successOrder,
  failOrder,
  stripeWebhook,
};
