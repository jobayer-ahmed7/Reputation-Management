import mongoose, { Schema } from 'mongoose';
import { ITestimonial } from './testimonial.interface';

// Define the testimonial schema
const TestimonialSchema = new Schema<ITestimonial>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    clientName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Testimonial model
export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
