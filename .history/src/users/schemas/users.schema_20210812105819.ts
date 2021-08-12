import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});