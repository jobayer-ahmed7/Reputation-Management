import { Router } from 'express';
import { ServiceController } from './service.controller';

const router = Router();

// Get all services
router.get('/', ServiceController.getAllServices);

export const ServiceRoutes = router;