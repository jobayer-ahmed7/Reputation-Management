import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";
import { IService } from "./service.interface";
import statusCode from "http-status";

// Get all services
export const getAllServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  const services = await ServiceServices.getAllServices();
  sendResponse.sendDataResponse<IService>(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Services retrieved successfully",
    data: services,
  });
};

// Get service by ID
export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await ServiceServices.getServiceById(id as string);

    if (!service) {
      sendResponse.sendDataResponse<null>(res, {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Service not found",
        data: null,
      });
      return;
    }

    sendResponse.sendDataResponse<IService>(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "Service retrieved successfully",
      data: service,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Failed to retrieve service",
      data: null,
    });
  }
};

// Create a new service
export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceData = req.body;

    const newService = await ServiceServices.createService(serviceData);

    sendResponse.sendCreateDataResponse<IService>(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Failed to create service",
      data: null,
    });
  }
};

// Update a service
export const updateService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const serviceData = req.body;

    const updatedService = await ServiceServices.updateService(id as string, serviceData);

    if (!updatedService) {
      sendResponse.sendDataResponse<null>(res, {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Service not found",
        data: null,
      });
      return;
    }

    sendResponse.sendUpdateResponse<IService>(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Failed to update service",
      data: null,
    });
  }
};

// Delete a service
export const deleteService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedService = await ServiceServices.deleteService(id as string);

    if (!deletedService) {
      sendResponse.sendDataResponse<null>(res, {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Service not found",
        data: null,
      });
      return;
    }

    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "Service deleted successfully",
      data: null,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Failed to delete service",
      data: null,
    });
  }
};

export const ServiceController = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
