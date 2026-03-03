import type { Request, Response } from 'express';
import HttpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { authService } from './auth.service';
import config from '../../config';
import { sendResponse } from '../../utils/sendResponse';

// login a user
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  const { refreshToken, token } = result;

  res.cookie('refreshToken', refreshToken, { 
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'none',
  });

  sendResponse.sendDataResponse(res, {
    success: true,
    message: 'User login successful',
    statusCode: HttpStatus.OK,
    token: result.token! || token!,
    refreshToken: result.refreshToken! || refreshToken!,
    data: result.user,
  });
});

export const authController = {
  login,
};
