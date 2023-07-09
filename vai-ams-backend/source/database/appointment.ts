import mongoose, { Schema } from 'mongoose';

export const appointmentDatabaseSchema = mongoose.model("appointments", new Schema({
    patientID: String,
    doctorID: String,
    timeSlot: Date,
    status: String
}));