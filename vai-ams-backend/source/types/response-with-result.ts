import { Response } from "express";

export interface ResponseWithResult extends Response
{
    result: 
    {
        data?: any;
        errorMessage?: any;
        message: string;
        status: number;
    };
}