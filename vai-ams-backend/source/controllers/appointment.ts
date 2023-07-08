import { Request, Response, NextFunction } from 'express';
import { ResponseWithResult } from '../types/response-with-result';
import { appointmentValidationSchemas } from '../schemas/appointment';
import { responseCodes } from '../utilities/response-codes';
import { responseMessages } from '../utilities/response-messages';
import { appointmentDatabaseSchema } from '../database/appointment';
import { USER_TYPE } from '../constants/user-type';
import { APPOINTMENT_STATUS } from '../constants/appointment-status';

const getAppointment = async (request: Request, response: Response, next: NextFunction) => 
{
	const appointmentID = request.params.appointmentID;
	const validationResult = appointmentValidationSchemas.GET_APPOINTMENT.validate(appointmentID);
	if (validationResult.error === undefined)
	{
		const appointment = await appointmentDatabaseSchema.findById(appointmentID);
		try
		{
			if (appointment)
			{
				(response as ResponseWithResult).result = 
				{
					data: appointment,
					message: responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_RETRIEVED,
					status: responseCodes.SUCCESS
				};
			}
			else
			{
				(response as ResponseWithResult).result = 
				{
					errorMessage: 'No appointment with such ID exists',
					message: responseMessages.ERROR.APPOINTMENT.APPOINTMENT_NOT_FOUND,
					status: responseCodes.NOT_FOUND
				};
			}
		}
		catch (errorObject)
		{
			(response as ResponseWithResult).result = 
			{
				errorMessage: errorObject,
				message: responseMessages.ERROR.APPOINTMENT.APPOINTMENT_RETRIEVAL_ERROR,
				status: responseCodes.INTERNAL_SERVER_ERROR
			};
		}
	}
	else
	{
		(response as ResponseWithResult).result = 
		{
			errorMessage: validationResult.error,
			message: responseMessages.ERROR.VALIDATION_ERROR,
			status: responseCodes.VALIDATION_ERROR
		};
	}
	next();
}

const getAppointments = async (request: Request, response: Response, next: NextFunction) => 
{
	const validationResult = appointmentValidationSchemas.GET_APPOINTMENTS_BY_USER_ID.validate(request.body);
	if (validationResult.error === undefined)
	{
		const appointments = await appointmentDatabaseSchema.find(request.body.userType === USER_TYPE.DOCTOR ? { doctorID: request.body.userID } : { doctorID: request.body.patientID } );
		try
		{
			if (appointments.length > 0)
			{
				(response as ResponseWithResult).result = 
				{
					data: appointments,
					message: responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_RETRIEVED,
					status: responseCodes.SUCCESS
				};
			}
			else
			{
				(response as ResponseWithResult).result = 
				{
					errorMessage: 'No appointments for this user exist',
					message: responseMessages.ERROR.APPOINTMENT.APPOINTMENT_NOT_FOUND,
					status: responseCodes.NOT_FOUND
				};
			}
		}
		catch (errorObject)
		{
			(response as ResponseWithResult).result = 
			{
				errorMessage: errorObject,
				message: responseMessages.ERROR.APPOINTMENT.APPOINTMENT_RETRIEVAL_ERROR,
				status: responseCodes.INTERNAL_SERVER_ERROR
			};
		}
	}
	else
	{
		(response as ResponseWithResult).result = 
		{
			errorMessage: validationResult.error,
			message: responseMessages.ERROR.VALIDATION_ERROR,
			status: responseCodes.VALIDATION_ERROR
		};
	}
	next();
}

const createAppointment = async (request: Request, response: Response, next: NextFunction) => 
{
	const validationResult = appointmentValidationSchemas.CREATE_APPOINTMENT.validate(request.body);
	if (validationResult.error === undefined)
	{
		const appointments = await appointmentDatabaseSchema.create(request.body);
		try
		{
			(response as ResponseWithResult).result = 
			{
				data: appointments,
				message: responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_CREATED,
				status: responseCodes.CREATED
			};
		}
		catch (errorObject)
		{
			(response as ResponseWithResult).result = 
			{
				errorMessage: errorObject,
				message: responseMessages.ERROR.APPOINTMENT.APPOINTMENT_CREATION_ERROR,
				status: responseCodes.INTERNAL_SERVER_ERROR
			};
		}
	}
	else
	{
		(response as ResponseWithResult).result = 
		{
			errorMessage: validationResult.error,
			message: responseMessages.ERROR.VALIDATION_ERROR,
			status: responseCodes.VALIDATION_ERROR
		};
	}
	next();
}

const updateAppointment = async (request: Request, response: Response, next: NextFunction) => 
{
	const validationResult = appointmentValidationSchemas.UPDATE_APPOINTMENT.validate(request.body);
	if (validationResult.error === undefined)
	{
		const appointments = await appointmentDatabaseSchema.findByIdAndUpdate(request.body.id, (({ id, ...parameters }) => parameters) (request.body));
		try
		{
			(response as ResponseWithResult).result = 
			{
				data: appointments,
				message: responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_CREATED,
				status: responseCodes.SUCCESS
			};
		}
		catch (errorObject)
		{
			(response as ResponseWithResult).result = 
			{
				errorMessage: errorObject,
				message: responseMessages.ERROR.APPOINTMENT.APPOINTMENT_CREATION_ERROR,
				status: responseCodes.INTERNAL_SERVER_ERROR
			};
		}
	}
	else
	{
		(response as ResponseWithResult).result = 
		{
			errorMessage: validationResult.error,
			message: responseMessages.ERROR.VALIDATION_ERROR,
			status: responseCodes.VALIDATION_ERROR
		};
	}
	next();
}

const deleteAppointment = async (request: Request, response: Response, next: NextFunction) => 
{
	const validationResult = appointmentValidationSchemas.DELETE_APPOINTMENT.validate(request.body);
	if (validationResult.error === undefined)
	{
		const appointments = await appointmentDatabaseSchema.findByIdAndUpdate(request.body.id, { status: APPOINTMENT_STATUS.CANCELLED });
		try
		{
			(response as ResponseWithResult).result = 
			{
				data: appointments,
				message: responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_CREATED,
				status: responseCodes.SUCCESS
			};
		}
		catch (errorObject)
		{
			(response as ResponseWithResult).result = 
			{
				errorMessage: errorObject,
				message: responseMessages.ERROR.APPOINTMENT.APPOINTMENT_CREATION_ERROR,
				status: responseCodes.INTERNAL_SERVER_ERROR
			};
		}
	}
	else
	{
		(response as ResponseWithResult).result = 
		{
			errorMessage: validationResult.error,
			message: responseMessages.ERROR.VALIDATION_ERROR,
			status: responseCodes.VALIDATION_ERROR
		};
	}
	next();
}

export const appointmentController = 
{
	getAppointment,
	getAppointments,
	createAppointment,
	updateAppointment,
	deleteAppointment
};