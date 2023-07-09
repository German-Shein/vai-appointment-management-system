import { axiosAPIHandler } from "./axios";
import { LogIn, Register } from "../types/authentication";
import { APIResponse } from "../types/api-response";

export const authenticationAPI = 
{
    logIn: async (request: LogIn) => await axiosAPIHandler.post('/authentication/log-in', request) as APIResponse,
    register: async (request: Register) => await axiosAPIHandler.post('/authentication/register', request) as APIResponse,
}