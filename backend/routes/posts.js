import express from 'express';
const router = express.Router();
import { Post } from '../models/Post.js';
import verifyToken from '../verifyToken.js';


router.post("/write",verifyToken ,async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id",verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.delete("/:id",verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
    const query=req.query;
    // console.log(query);
  try {
    const searchFilter={
        title:{$regex:query.search,$options:"i"}
    }
    const posts = await Post.find(query.search?searchFilter:null);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Search Post
export default router;
