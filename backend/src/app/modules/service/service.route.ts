import { Router } from 'express';
import { ServiceController } from './service.controller';

const router = Router();

// Get all services
router.get('/', ServiceController.getAllServices);

// Create a new service
router.post('/', ServiceController.createService); 
 
// Get service by ID
router.get('/:id', ServiceController.getServiceById);

// Update a service
router.patch('/:id', ServiceController.updateService);

// Delete a service
router.delete('/:id', ServiceController.deleteService);

export const ServiceRoutes = router;