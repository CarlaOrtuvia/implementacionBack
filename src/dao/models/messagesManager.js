import { messageModel } from "./messages.models.js"

class MessageDAO {
    async findAll(limit) {
        return await messageModel.find().limit(limit);
    }

    async create(messageData) {
        return await messageModel.create(messageData);
    }
}

export const MessageManager = new MessageDAO();