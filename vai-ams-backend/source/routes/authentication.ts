import { authenticationController } from '../controllers/authentication';
import { responseHandler } from '../middleware/response-handler';
import { Router } from 'express';

export const authenticationRouter = Router();

authenticationRouter.post ('/log-in', authenticationController.logIn, responseHandler);
authenticationRouter.post ('/register', authenticationController.register, responseHandler);