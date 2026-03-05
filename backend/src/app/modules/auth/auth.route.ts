import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { userValidations } from '../user/user.validation';

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(userValidations.userValidationSchema),
  authController.register,
);

authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);

export default authRouter; 
 