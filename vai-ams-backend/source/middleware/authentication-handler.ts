import jwt, {Secret} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { responseCodes } from '../utilities/response-codes';
import { responseMessages } from '../utilities/response-messages';
import { RequestWithSession } from '../types/request-with-session';

export const authenticationHandler = (request: Request, response: Response, next: NextFunction) => 
{
	const token = request.header('Authorization')?.replace('Bearer ', '') as string;
	if (!token) 
	{
		response.status(responseCodes.FORBIDDEN).json({
			errorMessage: 'A JSON Web Token is required for authentication',
			message: responseMessages.ERROR.FORBIDDEN,
			status: responseCodes.FORBIDDEN
		});
	}
	try 
	{
		(request as RequestWithSession).session = {token: jwt.verify(token, process.env.SECRET as Secret)};
		next();
	} 
	catch (err) 
	{
		response.status(responseCodes.UNAUTHORIZED).json({
			errorMessage: 'Invalid JSON Web Token',
			message: responseMessages.ERROR.UNAUTHORIZED,
			status: responseCodes.UNAUTHORIZED
		});
	}	
};