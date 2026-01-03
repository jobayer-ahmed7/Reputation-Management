import { z } from 'zod'
import { paymentStatus, workingStatus } from './order.constant'

const orderItemValidationSchema = z.object({
    product: z.string(),
    quantity: z.number(),
    price: z.number()
})

const orderValidationSchema = z.object({
    products: z.array(orderItemValidationSchema).nonempty('Order must contain at least one product'),
    user: z.string(),
    totalPrice: z.number().optional(),
    workingStatus: z.enum([...workingStatus] as [string, ...string[]]).optional(),
    paymentStatus: z.enum([...paymentStatus] as [string, ...string[]]).optional(), 
    transactionId: z.string().optional(),
    isDeleted: z.boolean().optional(),
})
const updateOrderValidationSchema = z.object({ 
    products: z.array(orderItemValidationSchema).optional(),
    user: z.string().optional(),
    totalPrice: z.number().optional(),
    workingStatus: z.enum([...workingStatus] as [string, ...string[]]).optional(),
    paymentStatus: z.enum([...paymentStatus] as [string, ...string[]]).optional(),
    transactionId: z.string().optional().optional(),
    isDeleted: z.boolean().optional().optional(),
})


export const OrderValidation = { orderValidationSchema, updateOrderValidationSchema }