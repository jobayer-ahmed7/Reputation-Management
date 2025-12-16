import { Types } from "mongoose"
import { paymentStatus, workingStatus } from "./order.constant"

export type TWorkingStatus = typeof workingStatus[number]
export type TPaymentStatus = typeof paymentStatus[number]

export type TOrderedservice = {
    product: Types.ObjectId,
    quantity: number, 
    price: number
}
 
export type TOrder = {
    products: TOrderedservice[];
    user: Types.ObjectId;
    totalPrice: number;
    workingStatus: TWorkingStatus;
    paymentStatus: TPaymentStatus;
    transactionId?: string;

    // Stripe references (server-managed)
    stripeCheckoutSessionId?: string;
    stripePaymentIntentId?: string;

    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
