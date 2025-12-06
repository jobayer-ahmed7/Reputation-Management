import { Router } from 'express';
import { TestimonialController } from './testimonial.controller';

const router = Router();

// Get all testimonials
router.get('/', TestimonialController.getAllTestimonials);


// Create a new testimonial
router.post('/', TestimonialController.createTestimonial);

// Get testimonial by ID
router.get('/:id', TestimonialController.getTestimonialById);

// Update a testimonial
router.patch('/:id', TestimonialController.updateTestimonial);

// Delete a testimonial
router.delete('/:id', TestimonialController.deleteTestimonial);

export const TestimonialRoutes = router;
