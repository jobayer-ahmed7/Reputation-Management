import { Testimonial } from './testimonial.model';
import { ITestimonial } from './testimonial.interface';

// Get all testimonials
export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
  const testimonials = await Testimonial.find();
  return testimonials;
};

// Get testimonial by ID
export const getTestimonialById = async (id: string): Promise<ITestimonial | null> => {
  const testimonial = await Testimonial.findById(id);
  return testimonial;
};


// Create a new testimonial
export const createTestimonial = async (testimonialData: ITestimonial): Promise<ITestimonial> => {
  const newTestimonial = await Testimonial.create(testimonialData);
  return newTestimonial;
};

// Update a testimonial
export const updateTestimonial = async (
  id: string,
  testimonialData: Partial<ITestimonial>
): Promise<ITestimonial | null> => {
  const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, testimonialData, {
    new: true,
    runValidators: true,
  });
  return updatedTestimonial;
};

// Delete a testimonial
export const deleteTestimonial = async (id: string): Promise<ITestimonial | null> => {
  const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
  return deletedTestimonial;
};

export const TestimonialServices = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
