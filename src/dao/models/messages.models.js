import { Schema, model } from "mongoose";

const getCurrentDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; 
    const localDate = new Date(now.getTime() - offset);
    return localDate.toISOString().slice(0, 16).replace("T", " ");
};

const messagesSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    postTime: {
        type: String, 
        default: getCurrentDate
    }
})

export const messageModel = model('messages', messagesSchema)