import mongoose, { Schema } from 'mongoose';

export const authenticationDatabaseSchema = mongoose.model('Authentication', new Schema({
    email: String,
    password: String,
    type: String
}));