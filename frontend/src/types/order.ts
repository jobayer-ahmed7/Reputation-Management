import { IUser } from "@/contexts/userContext";
import { TService } from "./service";

export const workingStatus = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELED",
] as const;
export const paymentStatus = ["UNPAID", "PAID"] as const;

export type TWorkingStatus = (typeof workingStatus)[number];
export type TPaymentStatus = (typeof paymentStatus)[number];

export type TOrder = {
  _id: string;
  orderId: string;
  orderedService: TService;
  user: IUser;
  totalPrice: number;
  cancelRequested: boolean;
  workingStatus: TWorkingStatus;
  paymentStatus: TPaymentStatus;
  transactionId?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
