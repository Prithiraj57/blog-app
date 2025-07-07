import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import Menu from './Menu.jsx';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [prompt, setPrompt] = useState('');
  const [menu, setMenu] = useState(false);
  const { user } = useContext(UserContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenu(!menu);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleSearch = () => {
    if (prompt.trim()) {
      navigate(`/?search=${prompt}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white shadow-lg`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-[200px] py-4 gap-4 md:gap-0">

        {/* Logo and mobile hamburger */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-xl font-extrabold">
            <Link to="/">BlogKaro</Link>
          </h1>

          {/* Mobile Menu Button */}
          <div onClick={toggleMenu} className="md:hidden text-2xl cursor-pointer">
            <FaBars />
            {menu && <Menu />}
          </div>
        </div>

        {/* Search bar always visible and before menu on desktop */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <div className="flex items-center space-x-2 bg-white text-black rounded-full px-3 py-1 shadow w-full md:w-auto">
            <button onClick={handleSearch}>
              <BsSearch className="text-gray-600 hover:text-black cursor-pointer" />
            </button>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder="Search a Post"
              className="outline-none px-2 py-1 bg-transparent w-full md:w-44 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Links / Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/write" className="hover:underline">Write</Link>
              <div onClick={toggleMenu} className="relative cursor-pointer">
                <FaBars />
                {menu && <Menu />}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
