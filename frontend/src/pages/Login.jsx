import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-900 text-white">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Yours</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full min-h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-center w-full">
            Log in to your account
          </h1>

          <input
            className="w-full px-4 py-3 border border-black rounded outline-none"
            type="email"
            placeholder="Enter email"
          />
          <input
            className="w-full px-4 py-3 border border-black rounded outline-none"
            type="password"
            placeholder="Enter password"
          />

          <button className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded hover:bg-gray-700 hover:text-white">
            Log In
          </button>

          <div className="flex justify-center items-center space-x-2 text-sm">
            <p>New here?</p>
            <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
