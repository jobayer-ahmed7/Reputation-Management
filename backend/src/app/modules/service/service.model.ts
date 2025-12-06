import { model, Schema } from "mongoose";
import { IService } from "./service.interface";

// Define the service schema
const ServiceSchema = new Schema<IService>(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: null,
    },
    features: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Service model
export const Service = model<IService>("Service", ServiceSchema);
