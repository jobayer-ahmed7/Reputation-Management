import express from "express";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

// create order
// router.post(
//   "/create-order",
//   auth(USER_ROLE.admin, USER_ROLE.customer),
//   validateRequest(OrderValidation.orderValidationSchema),
//   OrderControllers.createOrder,
// );

// get order by user id
router.get(
  "/my-orders/:userId",
  auth(USER_ROLE.admin, USER_ROLE.customer)
);

// get all orders
// router.get("/", OrderControllers.getAllOrder);

// update order by id
// router.patch(
//   "/:id",
//   validateRequest(OrderValidation.updateOrderValidationSchema),
//   OrderControllers.updateSingleOrder,
// ); 

// // delete order by id
// router.delete("/:id", OrderControllers.deleteSingleOrder);
 


export const OrderRoutes = router;
