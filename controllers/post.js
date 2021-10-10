import Post from "../models/post.js";
import mongoose from "mongoose";
import User from "../models/user.js";

//create a post

export const createPost = async (req, res) => {
  const { userId, description, image } = req.body;

  try {
    const newPost = new Post({
      _id: new mongoose.Types.ObjectId(),
      userId,
      description,
      image,
    });

    const createdPost = await newPost.save();
    const post = await Post.findById(createdPost._id).populate('userId').exec();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//update a post

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId, description } = req.body;

  try {
    const post = await Post.findById(id).exec();

    if (post !== null) {
      if (post.userId == userId) {
        await post.updateOne({ $set: req.body });

        return res.status(200).json({ message: "Updated Post" });
      } else {
        return res
          .status(403)
          .json({ message: "You can only update your post" });
      }
    } else {
      return res.status(404).json({ message: "No such post" });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete a post

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).exec();

    if (post !== null) {
      if (post.userId == req.body.userId) {
        await post.deleteOne();

        return res.status(403).json({ message: "Post Deleted" });
      }
    } else {
      return res.status(404).json({ message: "No such post" });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all timiline posts

export const getTimelinePosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();

    const posts = await Post.find({ userId: req.params.id })
      .populate("userId")
      .exec();

    const friendPosts = await Promise.all(
      user.followings.map((friendId) => {
        return Post.find({ userId: friendId }).populate("userId").exec();
      })
    );
    return res.status(200).json(posts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//like or unlike a post

export const likePost = async (req, res) => {
  const { userId } = req.body;
  const postId = req.params.id;
 
  try {
    const post = await Post.findById(postId).exec();
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      return res.status(200).json(post);
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      return res.status(200).json("You unliked the post");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
