import express from 'express';
const router = express.Router();
import { Comment } from '../models/Comment.js'; 
import { Post } from '../models/Post.js';
import verifyToken from '../verifyToken.js';

// CREATE
router.post("/write",verifyToken,async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id",verifyToken,async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id",verifyToken,async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET all comments for a post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }); // ✅ Correct field
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
