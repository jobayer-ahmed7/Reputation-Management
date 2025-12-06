import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { TestimonialServices } from './testimonial.service';
import { ITestimonial } from './testimonial.interface';
import statusCode from 'http-status';

// Get all testimonials
export const getAllTestimonials = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const testimonials = await TestimonialServices.getAllTestimonials();
    sendResponse.sendDataResponse<ITestimonial>(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Testimonials retrieved successfully',
      data: testimonials,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || 'Failed to retrieve testimonials',
      data: null,
    });
  }
};

// Get testimonial by ID
export const getTestimonialById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonial = await TestimonialServices.getTestimonialById(id as string);

    if (!testimonial) {
      sendResponse.sendDataResponse<null>(res, {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: 'Testimonial not found',
        data: null,
      });
      return;
    }

    sendResponse.sendDataResponse<ITestimonial>(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Testimonial retrieved successfully',
      data: testimonial,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || 'Failed to retrieve testimonial',
      data: null,
    });
  }
};



// Create a new testimonial
export const createTestimonial = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const testimonialData = req.body;

    const newTestimonial = await TestimonialServices.createTestimonial(testimonialData);

    sendResponse.sendCreateDataResponse<ITestimonial>(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: 'Testimonial created successfully',
      data: newTestimonial,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || 'Failed to create testimonial',
      data: null,
    });
  }
};

// Update a testimonial
export const updateTestimonial = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonialData = req.body;

    const updatedTestimonial = await TestimonialServices.updateTestimonial(id as string, testimonialData);

    if (!updatedTestimonial) {
      sendResponse.sendDataResponse<null>(res, {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: 'Testimonial not found',
        data: null,
      });
      return;
    }

    sendResponse.sendUpdateResponse<ITestimonial>(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Testimonial updated successfully',
      data: updatedTestimonial,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || 'Failed to update testimonial',
      data: null,
    });
  }
};

// Delete a testimonial
export const deleteTestimonial = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTestimonial = await TestimonialServices.deleteTestimonial(id as string);

    if (!deletedTestimonial) {
      sendResponse.sendDataResponse<null>(res, {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: 'Testimonial not found',
        data: null,
      });
      return;
    }

    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Testimonial deleted successfully',
      data: null,
    });
  } catch (error: any) {
    sendResponse.sendDataResponse<null>(res, {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || 'Failed to delete testimonial',
      data: null,
    });
  }
};

export const TestimonialController = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
