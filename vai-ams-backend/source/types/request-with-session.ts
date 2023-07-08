import { Request } from "express";
import { JwtPayload } from 'jsonwebtoken';

export interface RequestWithSession extends Request
{
    session: 
    {
        token: string | JwtPayload,
        type?: string;
    };
}