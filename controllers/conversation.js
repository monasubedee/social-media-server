import mongoose from "mongoose";
import Conversation from "../models/conversation.js";

export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const newConversation = new Conversation({
      _id: new mongoose.Types.ObjectId(),
    });
    newConversation.members.push(senderId, receiverId);

    await newConversation.save();
    return res.status(200).json(newConversation);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getConversations = async (req, res) => {
  const userId = req.params.id;
  try {
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });
    
    return res.status(200).json(conversations);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
