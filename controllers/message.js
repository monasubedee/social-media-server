import mongoose from "mongoose";
import Message from "../models/message.js";

export const saveMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  try {
    const newMessage = new Message({
      _id: new mongoose.Types.ObjectId(),
      conversationId,
      sender,
      text,
    });

    const message = await newMessage.save();
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const conversationId = req.params.id;
 
  try {
    const message = await Message.find({conversationId}).exec();
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
