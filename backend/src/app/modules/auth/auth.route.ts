import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);

export default authRouter; 
