import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderControllers } from "./order.controller";
import { OrderValidation } from "./order.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-order",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(OrderValidation.orderValidationSchema),
  OrderControllers.createOrder
);

router.get("/", OrderControllers.getAllOrder);
router.patch(
  "/:id",
  validateRequest(OrderValidation.updateOrderValidationSchema),
  OrderControllers.updateSingleOrder
);
router.delete("/:id", OrderControllers.deleteSingleOrder);

// Stripe webhook (no auth)
router.post("/webhook", OrderControllers.stripeWebhook);

// Stripe Checkout return URLs (Stripe redirects via GET)
router.get("/success/:transactionId", OrderControllers.successOrder);
router.get("/fail/:transactionId", OrderControllers.failOrder);

export const OrderRoutes = router;
 