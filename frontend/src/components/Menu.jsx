import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { URL } from "../url";
import { Link, useNavigate } from 'react-router-dom';

// Icons
import {
  FaUser, FaPen, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBlog
} from 'react-icons/fa';

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
      await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <div className="bg-white w-[220px] z-10 flex flex-col items-start absolute top-12 right-6 rounded-xl p-4 space-y-3 shadow-2xl border z-50 transition-all">
      {!user ? (
        <>
          <Link
            to="/login"
            className="text-gray-800 text-sm hover:text-blue-600 flex items-center gap-2 transition"
          >
            <FaSignInAlt /> Login
          </Link>
          <Link
            to="/register"
            className="text-gray-800 text-sm hover:text-blue-600 flex items-center gap-2 transition"
          >
            <FaUserPlus /> Register
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`/profile/${user._id}`}
            className="text-gray-800 text-sm hover:text-blue-600 flex items-center gap-2 transition"
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/write"
            className="text-gray-800 text-sm hover:text-blue-600 flex items-center gap-2 transition"
          >
            <FaPen /> Write
          </Link>
          <Link
            to={`/myblogs/${user._id}`}
            className="text-gray-800 text-sm hover:text-blue-600 flex items-center gap-2 transition"
          >
            <FaBlog /> My blogs
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 text-sm hover:text-red-800 flex items-center gap-2 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Menu;
