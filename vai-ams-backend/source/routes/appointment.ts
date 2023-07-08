import { appointmentController } from '../controllers/appointment';
import { authenticationHandler } from '../middleware/authentication-handler';
import { responseHandler } from '../middleware/response-handler';
import { Router } from 'express';

export const appointmentRouter = Router();

appointmentRouter.get('/:appointmentID', authenticationHandler, appointmentController.getAppointment, responseHandler);
appointmentRouter.post('', authenticationHandler, appointmentController.getAppointments, responseHandler);
appointmentRouter.post('', authenticationHandler, appointmentController.createAppointment, responseHandler);
appointmentRouter.put('', authenticationHandler, appointmentController.updateAppointment, responseHandler);
appointmentRouter.delete('/:appointmentID', authenticationHandler, appointmentController.deleteAppointment, responseHandler);