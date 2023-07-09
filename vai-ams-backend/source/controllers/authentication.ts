import { Request, Response, NextFunction } from 'express';
import { ResponseWithResult } from '../types/response-with-result';
import { authenticationValidationSchemas } from '../schemas/authentication';
import { responseCodes } from '../utilities/response-codes';
import { responseMessages } from '../utilities/response-messages';
import { authenticationDatabaseSchema } from '../database/authentication';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomInt } from 'crypto';

const logIn = async (request: Request, response: Response, next: NextFunction) => 
{
	const validationResult = authenticationValidationSchemas.LOG_IN.validate(request.body);
	if (validationResult.error === undefined)
	{
		const user = await authenticationDatabaseSchema.findOne({ email: request.body.email });
		try
		{
			if (user)
			{
                if (await bcrypt.compare(request.body.password, user.password as string))
                {
                    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET as string, { expiresIn: '1h' });
					delete user.password;
                    (response as ResponseWithResult).result = 
                    {
                        data: {user, token: token},
                        message: responseMessages.SUCCESS.AUTHENTICATION.USER_LOGGED_IN,
                        status: responseCodes.SUCCESS
                    };
                }
				else
                {
                    (response as ResponseWithResult).result = 
                    {
                        errorMessage: 'Incorrect credentials',
                        message: responseMessages.ERROR.AUTHENTICATION.USER_AUTHENTICATION_ERROR,
                        status: responseCodes.UNAUTHORIZED
                    };
                }
			}
			else
			{
				(response as ResponseWithResult).result = 
				{
					errorMessage: 'User does not exist',
					message: responseMessages.ERROR.AUTHENTICATION.USER_NOT_FOUND,
					status: responseCodes.NOT_FOUND
				};
			}
		}
		catch (errorObject)
		{
			(response as ResponseWithResult).result = 
			{
				errorMessage: errorObject,
				message: responseMessages.ERROR.UNKNOWN_ERROR,
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

const register = async (request: Request, response: Response, next: NextFunction) => 
{
	const validationResult = authenticationValidationSchemas.REGISTER.validate(request.body);
	if (validationResult.error === undefined)
	{
		const oldUser = await authenticationDatabaseSchema.findOne({ email: request.body.email });
		try
		{
			if (oldUser)
			{
                (response as ResponseWithResult).result = 
                {
                    errorMessage: `User with email ${request.body.email} already exists`,
                    message: responseMessages.ERROR.AUTHENTICATION.USER_DUPLICATED,
                    status: responseCodes.EXISTING_DATA
                };
			}
			else
			{
                request.body.password = await bcrypt.hash(request.body.password, randomInt(5, 50));
                const user = await authenticationDatabaseSchema.create(request.body);
				delete request.body.password;
                const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET as string, { expiresIn: '1h' });
				(response as ResponseWithResult).result = 
				{
					data: {user, token},
					message: responseMessages.SUCCESS.AUTHENTICATION.USER_REGISTERED,
					status: responseCodes.CREATED
				};
			}
		}
		catch (errorObject)
		{
			(response as ResponseWithResult).result = 
			{
				errorMessage: errorObject,
				message: responseMessages.ERROR.UNKNOWN_ERROR,
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

export const authenticationController = 
{
	logIn,
	register
};