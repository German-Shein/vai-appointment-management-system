import mongoose, { Schema } from 'mongoose';

export const authenticationDatabaseSchema = mongoose.model('users', new Schema({
    email: String,
    password: String,
    userType: String
}));