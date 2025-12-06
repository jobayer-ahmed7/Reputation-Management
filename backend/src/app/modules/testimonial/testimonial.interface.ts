// Interface for testimonial document
export interface ITestimonial {
  _id?: string;
  clientName: string;
  clientImage?: string;
  title: string;
  description: string;
  rating: number;
  platform?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
