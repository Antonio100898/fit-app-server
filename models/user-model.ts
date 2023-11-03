import mongoose, { Document } from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    },
    token: {
        type: String
    }
});

export const User = mongoose.model('User', UserSchema);
export type IResponseUser = Document<unknown, {}, { name: string; email: string; password: string; createdAt?: Date | undefined; token?: string | undefined; }> 