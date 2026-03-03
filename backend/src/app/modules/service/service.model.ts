import { model, Schema } from "mongoose";
import { IService, serviceTypes } from "./service.interface";

// Define the service schema
const ServiceSchema = new Schema<IService>(
  {
    platform: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    count:{
      type:String,
      required:true,
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryTimeRange: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: serviceTypes,
      default: serviceTypes[0],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Service model
export const Service = model<IService>("Service", ServiceSchema);
