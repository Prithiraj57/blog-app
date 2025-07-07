import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { URL } from "../url";
import { Link } from 'react-router-dom';

// React Icons
import { FaUser, FaPen, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBlog } from 'react-icons/fa';

const Menu = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      console.log(res);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white w-[220px] flex flex-col items-start absolute top-12 right-6 rounded-lg p-4 space-y-3 shadow-xl border z-50">
      {!user && (
        <>
          <Link to="/login" className="text-black text-sm hover:text-blue-600 cursor-pointer flex items-center gap-2 transition">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/register" className="text-black text-sm hover:text-blue-600 cursor-pointer flex items-center gap-2 transition">
            <FaUserPlus /> Register
          </Link>
        </>
      )}
      {user && (
        <>
          <Link to="/profile" className="text-black text-sm hover:text-blue-600 cursor-pointer flex items-center gap-2 transition">
            <FaUser /> Profile
          </Link>
          <Link to="/write" className="text-black text-sm hover:text-blue-600 cursor-pointer flex items-center gap-2 transition">
            <FaPen /> Write
          </Link>
          <Link to="/myblogs" className="text-black text-sm hover:text-blue-600 cursor-pointer flex items-center gap-2 transition">
            <FaBlog /> My Blogs
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 text-sm hover:text-red-800 cursor-pointer flex items-center gap-2 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Menu;
