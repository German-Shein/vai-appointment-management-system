export type GetAppointments = 
{
    userID: string,
    userType: string
}

export type CreateAppointment = 
{
    patientID: string,
    doctorID: string,
    timeSlot: Date,
    status: string
}

export type UpdateAppointment =
{
    id: string,
    timeSlot: Date,
    status: string
}