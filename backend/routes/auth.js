import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({_id: user._id,username:user.username,email:user.email }, process.env.SECRET, { expiresIn: "3d" });
    const { password: pass, ...info } = user._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json(info);

  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});
//Logout 
router.get("/logout",async(req,res)=>
{
  try{
    res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out Successfully")

  }
  catch(error)
  {
    res.status(500).json(error);
  }
})
//REFETCH USER
router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Token invalid", error: err });
    }
    return res.status(200).json(data);
  });
});


export default router;
