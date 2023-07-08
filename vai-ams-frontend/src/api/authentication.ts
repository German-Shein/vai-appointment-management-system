import { axiosAPIHandler } from "./axios";
import { LogIn, Register } from "../types/authentication";

export const authenticationAPI = 
{
    logIn: async (request: LogIn) => await axiosAPIHandler.post('/authentication/log-in', request),
    register: async (request: Register) => await axiosAPIHandler.post('/authentication/register', request),
}