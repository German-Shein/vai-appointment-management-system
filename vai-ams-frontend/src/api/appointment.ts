import { axiosAPIHandler } from "./axios";
import { GetAppointments, CreateAppointment, UpdateAppointment } from "../types/appointment";

export const appointmentAPI = 
{
    getAppointment: async (appointmentID: string) => await axiosAPIHandler.get(`/appointment/${appointmentID}`),
    getAppointments: async (request: GetAppointments) => await axiosAPIHandler.post('/appointment', request),
    createAppointment: async (request: CreateAppointment) => await axiosAPIHandler.post('/appointment', request),
    updateAppointment: async (request: UpdateAppointment) => await axiosAPIHandler.put('/appointment', request),
    deleteAppointment: async (appointmentID: string) => await axiosAPIHandler.delete(`/appointment/${appointmentID}`),
}