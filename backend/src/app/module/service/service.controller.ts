import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { ServiceServices } from './service.service';
import { IService } from './service.interface';

// Get all services
export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await ServiceServices.getAllServices();
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

export const ServiceController = {
  getAllServices,
};