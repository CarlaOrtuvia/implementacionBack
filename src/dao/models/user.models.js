import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

userSchema.plugin(mongoosePaginate)

export const userModel = model('users', userSchema)