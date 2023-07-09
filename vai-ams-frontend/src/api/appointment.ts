import { axiosAPIHandler } from "./axios";
import { GetAppointments, CreateAppointment, UpdateAppointment } from "../types/appointment";
import { APIResponse } from "../types/api-response";

export const appointmentAPI = 
{
    getAppointment: async (appointmentID: string, token: string) => await axiosAPIHandler.get(`/appointment/${appointmentID}`, { headers: { Authorization: `Bearer ${token}` } }) as APIResponse,
    getAppointments: async (request: GetAppointments, token: string) => await axiosAPIHandler.post('/appointment/all', request, { headers: { Authorization: `Bearer ${token}` } }) as APIResponse,
    createAppointment: async (request: CreateAppointment, token: string) => await axiosAPIHandler.post('/appointment', request, { headers: { Authorization: `Bearer ${token}` } }) as APIResponse,
    updateAppointment: async (request: UpdateAppointment, token: string) => await axiosAPIHandler.put('/appointment', request, { headers: { Authorization: `Bearer ${token}` } }) as APIResponse,
    deleteAppointment: async (appointmentID: string, token: string) => await axiosAPIHandler.delete(`/appointment/${appointmentID}`, { headers: { Authorization: `Bearer ${token}` } }) as APIResponse,
}