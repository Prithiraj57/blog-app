import React, { useState } from 'react';
import { Link,Navigate,useNavigate } from 'react-router-dom'; 
import Footer from '../components/Footer';
import axios from 'axios'
import {URL} from '../url'
const Register = () => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(""); 
  const navigate=useNavigate()
 const handleRegister = async () => {
  try {
    await axios.post(URL + '/api/auth/register', {
      username,
      email,
      password
    });
    setError(false);
    navigate("/login");
  } catch (err) {
    setError(true);
    console.error("Registration error:", err.response?.data || err.message);
  }
};

  return (
    <>
   <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-900 text-white">
            <h1 className="text-lg md:text-xl font-extrabold">
              <Link to="/">Blog Yours</Link>
            </h1>
            <div className="space-x-4">
              <Link to="/login" className="hover:underline">Login</Link>
            </div>
          </div>
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
        <h1 className="text-xl font-bold text-center w-full">
          Create Account
        </h1>
      <input onChange={(e)=>setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-black rounded outline-none"
          type="text"
          placeholder="Enter Username"
        />
        <input onChange={(e)=>setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-black rounded outline-none"
          type="email"
          placeholder="Enter Email"
        />
        <input onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-black rounded outline-none"
          type="password"
          placeholder="Enter Password"
        />
        
        <button onClick={handleRegister} className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded hover:bg-gray-700 hover:text-white">
          Register
        </button>
        {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
        <div className="flex justify-center items-center space-x-2 text-sm">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
     <Footer/>
    </>
  );
};

export default Register;
