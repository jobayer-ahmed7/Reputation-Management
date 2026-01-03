// Interface for testimonial document
export interface ITestimonial {
  _id?: string;
  title: string;
  content: string;
  rating: number;
  clientName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
