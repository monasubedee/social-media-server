import mongoose from "mongoose";
import Conversation from "./conversation.js";


const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    text: String,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
