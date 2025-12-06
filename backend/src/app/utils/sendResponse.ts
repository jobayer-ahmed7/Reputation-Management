import { Response } from "express";

type TResponse<T> = {
  status?: boolean;
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  data: T | T[] | null;
};
 
const sendDataResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    token: data.token,
    refreshToken: data.refreshToken,
    data: data.data,
  });
};
const sendCreateDataResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    token: data.token,
    refreshToken: data.refreshToken,
    data: data.data, 
  });
};
const sendUpdateResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export const sendResponse = {
  sendDataResponse,
  sendUpdateResponse,
  sendCreateDataResponse,
};
