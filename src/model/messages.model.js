//ejemplo de modelo en caso de usar mongoDB para así suplantar persistencia en archivos
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true
    },

    message: {
        type: String,
    }
})


const Message = mongoose.model('Message', messageSchema)

export default Message
