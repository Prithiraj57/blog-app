import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
const Navbar = () => {
  const [prompt, setPrompt] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(prompt.trim() ? `/?search=${prompt}` : "/");
    setMenuOpen(false);
  };

  const handleLogout = async () => {
  try {
    await axios.post(`${URL}/api/auth/logout`, {}, { withCredentials: true });
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  } catch (err) {
    console.log("Logout error:", err);
  }
};

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-[200px]">
        <Link to="/" className="text-2xl font-bold text-white">BlogKaro</Link>

        <div className="hidden md:flex items-center bg-white text-black rounded-full px-3 py-1 w-full max-w-sm shadow mx-4">
          <BsSearch onClick={handleSearch} className="cursor-pointer text-gray-500" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search a post"
            className="outline-none px-3 py-1 bg-transparent w-full placeholder-gray-500"
          />
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          {user ? (
            <>
              <Link to={`/profile/${user._id}`} className="hover:underline">Profile</Link>
              <Link to="/write" className="hover:underline">Write</Link>
              <Link to={`/myblogs/${user._id}`} className="hover:underline">My Blogs</Link>
              <button onClick={handleLogout} className="hover:underline text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          {menuOpen ? (
            <FaTimes className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <FaBars className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white text-black w-full px-6 pb-4 transition-all">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-4 shadow">
            <BsSearch onClick={handleSearch} className="cursor-pointer text-gray-500" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search a post"
              className="outline-none px-3 py-1 bg-transparent w-full placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col space-y-3">
            {user ? (
              <>
                <Link to={`/profile/${user._id}`} onClick={() => setMenuOpen(false)}>Profile</Link>
                <Link to="/write" onClick={() => setMenuOpen(false)}>Write</Link>
                <Link to={`/myblogs/${user._id}`} onClick={() => setMenuOpen(false)}>My Blogs</Link>
                <button onClick={handleLogout} className="text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
