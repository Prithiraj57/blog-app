import React from 'react';
import { Link } from 'react-router-dom'; 

const Register = () => {
  return (
    <>
   < div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-900 text-white">
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

        <input
          className="w-full px-4 py-3 border border-black rounded outline-none"
          type="text"
          placeholder="Enter Username"
        />
        <input
          className="w-full px-4 py-3 border border-black rounded outline-none"
          type="email"
          placeholder="Enter Email"
        />
        <input
          className="w-full px-4 py-3 border border-black rounded outline-none"
          type="password"
          placeholder="Enter Password"
        />
        
        <button className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded hover:bg-gray-700 hover:text-white">
          Register
        </button>

        <div className="flex justify-center items-center space-x-2 text-sm">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
