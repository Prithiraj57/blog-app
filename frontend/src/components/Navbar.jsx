import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const Navbar = () => {
  const user =false;

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-900 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Yours</Link>
        </h1>
        <div className="flex items-center space-x-2 bg-white text-black rounded px-2 py-1">
          <BsSearch />
          <input
            type="text"
            placeholder="Search a Post"
            className="outline-none px-2 py-1 bg-transparent"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <h3>
          <Link to={user ? "/write" : "/login"}>{user ? "Create Blog" : "Login"}</Link>
        </h3>
        <h3>
          <Link to={user ? "/profile" : "/register"}>{user ? "Profile" : "Register"}</Link>
        </h3>
      </div>
    </div>
  );
};

export default Navbar;
