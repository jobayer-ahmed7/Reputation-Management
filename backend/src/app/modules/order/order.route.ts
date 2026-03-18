import express from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { OrderControllers } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = express.Router();

// create order
router.post(
  "/create-order",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(OrderValidation.orderValidationSchema),
  OrderControllers.createOrder,
);

// get all orders
router.get('/', OrderControllers.getAllOrder);


// get order by user id

router.get(
  '/my-orders/:userId',
  auth(USER_ROLE.customer),
  OrderControllers.getOrderByUserId,
);

// update order by id
router.patch(
  '/:id',
  validateRequest(OrderValidation.updateOrderValidationSchema),
  OrderControllers.updateSingleOrder,
);

// // delete order by id
router.delete('/:id', OrderControllers.deleteSingleOrder);

export const OrderRoutes = router;
