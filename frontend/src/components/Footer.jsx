import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-400 px-6 py-6 mt-10 border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {/* Explore Section */}
        <div>
          <h3 className="text-white font-semibold mb-2">Explore</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white transition">Featured Blogs</a></li>
            <li><a href="#" className="hover:text-white transition">Most Viewed</a></li>
            <li><a href="#" className="hover:text-white transition">Readers' Choice</a></li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="text-white font-semibold mb-2">Community</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white transition">Forum</a></li>
            <li><a href="#" className="hover:text-white transition">Support</a></li>
            <li><a href="#" className="hover:text-white transition">Recent Posts</a></li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-white font-semibold mb-2">About</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Blogging. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
