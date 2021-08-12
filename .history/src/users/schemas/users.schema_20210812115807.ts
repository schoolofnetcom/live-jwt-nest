import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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

UsersSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hash = await bcrypt.hash(this['password'], 10);
        this['password'] = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});