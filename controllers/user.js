import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/config.js";

export const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    profilePicture,
    coverPicture,
    followers,
    followings,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser)
      return res.status(409).json({ message: "User Already Exists." });
    else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        password: hashPassword,
        email,
        profilePicture,
        coverPicture,
        followers,
        followings,
      });

      const result = await user.save();

      const token = jwt.sign(
        {
          userId: result._id,
          email: result.email,
        },
        JWT_SECRET_KEY
      );
      res.status(200).json({
        token: token,
        userId: result._id,
        name: result.name,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser == null)
      return res.status(401).json({ message: "You need to sign up first" });

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword)
      return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      JWT_SECRET_KEY
    );

    res.status(200).json({
      token: token,
      userId: existingUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.params.id)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("You followed the user");
      } else {
        return res.status(403).json("You have already followed the user");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You cant follow yourself");
  }
};

//get a user

export const getUserInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).exec();
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(403).json("No id with this user");
    }
  } catch (error) {
    console.log(error);
  }
};
