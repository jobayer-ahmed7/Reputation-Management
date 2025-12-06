import { Service } from './service.model';
import { IService } from './service.interface';

// Get all services
export const getAllServices = async (): Promise<IService[]> => {
  const services = await Service.find();
  return services;
};

// Get service by ID
export const getServiceById = async (id: string): Promise<IService | null> => {
  const service = await Service.findById(id);
  return service;
}; 

// Create a new service
export const createService = async (serviceData: IService): Promise<IService> => {
  const newService = await Service.create(serviceData);
  return newService;
};

// Update a service
export const updateService = async (id: string, serviceData: Partial<IService>): Promise<IService | null> => {
  const updatedService = await Service.findByIdAndUpdate(id, serviceData, {
    new: true,
    runValidators: true,
  });
  return updatedService;
};

// Delete a service
export const deleteService = async (id: string): Promise<IService | null> => {
  const deletedService = await Service.findByIdAndDelete(id);
  return deletedService;
};

export const ServiceServices = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};