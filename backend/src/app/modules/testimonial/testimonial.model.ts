import mongoose, { Schema } from 'mongoose';
import { ITestimonial } from './testimonial.interface';

// Define the testimonial schema
const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientImage: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    platform: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Testimonial model
export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
