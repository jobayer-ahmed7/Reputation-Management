import { Service } from './service.model';
import { IService } from './service.interface';

// Get all services
export const getAllServices = async (): Promise<IService[]> => {
  const services = await Service.find();
  return services;
};

