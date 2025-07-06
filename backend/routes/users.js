import express from 'express'
import bcrypt from 'bcrypt'
const router=express.Router();
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import {Comment} from '../models/Comment.js'
import verifyToken from '../verifyToken.js';
//Update
router.put("/:id",verifyToken,async(req,res)=>{
try{
if(req.body.password)
{
    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt);
}
const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
res.status(200).json(updatedUser);
}
catch(error)
{
res.status(500).json(error);
}
})
//Delete
router.delete("/:id",verifyToken,async(req,res)=>{
try{
await User.findByIdAndDelete(req.params.id);
await Post.deleteMany({userId:req.params.id})
await Comment.deleteMany({userId:req.params.id});
res.status(200).json("User has been deleted")

}
catch(error)
{
res.status(500).json(error);
}
})
//Get User
router.get("/:id",async(req,res)=>{
try{
const user=await User.findById(req.params.id);
const {password,...info}=user._doc;
res.status(200).json(info);
}
catch(error)
{
res.status(500).json(error);
}
})
export default router;