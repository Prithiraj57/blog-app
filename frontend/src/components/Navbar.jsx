import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import Menu from './Menu.jsx';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [prompt, setPrompt] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(prompt.trim() ? `/?search=${prompt}` : "/");
  };

  return (
    <div className="sticky top-0 z-50 h-20 bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white shadow-md">
      <div className="flex items-center justify-between h-full px-4 md:px-[200px]">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">BlogKaro</Link>
        </h1>

        {/* Search */}
        <div className="flex items-center bg-white text-black rounded-full px-3 py-1 shadow w-full max-w-sm md:mx-6">
          <BsSearch onClick={handleSearch} className="cursor-pointer text-gray-500" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search a Post"
            className="outline-none px-3 py-1 bg-transparent w-full placeholder-gray-500"
          />
        </div>

        {/* Links or Menu */}
        {user ? (
          <div className="relative">
            <FaBars className="text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && <Menu />}
          </div>
        ) : (
          <div className="space-x-6 hidden md:block">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
