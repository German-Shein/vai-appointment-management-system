import mongoose, { Schema } from 'mongoose';

export const appointmentDatabaseSchema = mongoose.model("Appointment", new Schema({
    patientId: String,
    doctorId: String,
    timeSlot: Date,
    status: String
}));