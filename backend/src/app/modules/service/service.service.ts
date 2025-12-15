import { Service } from './service.model';
import { IService } from './service.interface';

// Get all services
export const getAllServicesFromDB = async (): Promise<IService[]> => {
  const services = await Service.find();
  return services;
}; 

// Get service by ID
export const getServiceByIdFromDB = async (id: string): Promise<IService | null> => {
  const service = await Service.findById(id);
  return service;
}; 

// Create a new service
export const createServiceFromDB = async (serviceData: IService): Promise<IService> => {
  const newService = await Service.create(serviceData);
  return newService;
};

// Update a service
export const updateServiceIntoDB = async (id: string, serviceData: Partial<IService>): Promise<IService | null> => {
  const updatedService = await Service.findByIdAndUpdate(id, serviceData, {
    new: true,
    runValidators: true,
  });
  return updatedService;
};

// Delete a service
export const deleteServiceFromDB = async (id: string): Promise<IService | null> => {
  const deletedService = await Service.findByIdAndDelete(id);
  return deletedService;
};

export const ServiceServices = {
  getAllServicesFromDB,
  getServiceByIdFromDB,
  createServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};