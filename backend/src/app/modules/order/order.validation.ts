import { z } from "zod";
import { paymentStatus, workingStatus } from "./order.constant";



const orderValidationSchema = z.object({
  body: z.object({
    orderId: z.string().optional(),
    orderedService: z.string(),
    user: z.string(),
    totalPrice: z.number().min(0, "Total price cannot be negative").optional(),
    cancelRequested: z.boolean().optional(),
    workingStatus: z.enum([...workingStatus] as [string, ...string[]]).optional(),
    paymentStatus: z.enum([...paymentStatus] as [string, ...string[]]).optional(),
    transactionId: z.string().optional(),
    isDeleted: z.boolean().optional(),
  })
}); 

const updateOrderValidationSchema = z.object({
  body: z.object({
    orderedService: z.string().optional(),
    user: z.string().optional(),
    totalPrice: z.number().optional(),
    cancelRequested: z.boolean().optional(),
    workingStatus: z.enum([...workingStatus] as [string, ...string[]]).optional(),
    paymentStatus: z.enum([...paymentStatus] as [string, ...string[]]).optional(),
    transactionId: z.string().optional().optional(),
    isDeleted: z.boolean().optional().optional(),
  })
});
export const OrderValidation = {
  orderValidationSchema,
  updateOrderValidationSchema,
};
