import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsed = await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    req.body = parsed.body;
    req.cookies = parsed.cookies;
    next();
  });
};

export default validateRequest;
