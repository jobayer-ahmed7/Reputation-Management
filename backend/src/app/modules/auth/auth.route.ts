import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { authValidation } from './auth.validation.js';
import { authController } from './auth.controller.js';

const authRouter = Router();

authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);

export default authRouter;
