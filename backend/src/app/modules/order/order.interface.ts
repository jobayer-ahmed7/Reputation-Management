import { Types } from "mongoose";
import { paymentStatus, workingStatus } from "./order.constant";

export type TWorkingStatus = (typeof workingStatus)[number];
export type TPaymentStatus = (typeof paymentStatus)[number];



export type TOrder = { 
  orderId: string;
  orderedService: Types.ObjectId;
  user: Types.ObjectId;
  totalPrice: number;
  cancelRequested: boolean;
  workingStatus: TWorkingStatus;
  paymentStatus: TPaymentStatus;
  transactionId?: string;
  isDeleted?: boolean;
  createdAt?: Date; 
  updatedAt?: Date;
};
