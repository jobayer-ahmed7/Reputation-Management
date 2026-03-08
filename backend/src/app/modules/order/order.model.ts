import { model, Schema } from "mongoose";
import { paymentStatus, workingStatus } from "./order.constant";
import { TOrder } from "./order.interface";


const orderSchema = new Schema<TOrder>(
  {
    orderedService:{ type: Schema.Types.ObjectId, ref: "Service",  required: [true, "Product is required"] },
    user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
    totalPrice: { type: Number, required: [true, "Total price is required"] },
    workingStatus: {
      type: String,
      enum: workingStatus,
      default: "PENDING",
    }, 
    paymentStatus: {
      type: String,
      enum: paymentStatus,
      default: "UNPAID",
    },
    transactionId: String,


    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>("Order", orderSchema);
