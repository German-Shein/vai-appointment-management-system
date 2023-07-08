import { Request, Response, NextFunction } from 'express';
import { ResponseWithResult } from '../types/response-with-result';

export const responseHandler = (request: Request, response: Response, next: NextFunction) => 
{
	if (response)
	{
		response.status((response as ResponseWithResult).result.status).json((response as ResponseWithResult).result);
	}
	else
	{
		next ();
	}
};