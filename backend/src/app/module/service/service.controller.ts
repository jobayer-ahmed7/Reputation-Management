import { Request, Response } from 'express';
import * as ServiceService from './service.service';

// Get all services
export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await ServiceService.getAllServices();
    res.status(200).json({
      success: true,
      message: 'Services retrieved successfully',
      data: services,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve services',
      error: error,
    });
  }
};

