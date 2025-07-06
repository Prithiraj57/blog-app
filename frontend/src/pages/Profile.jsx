import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePosts from '../components/ProfilePosts';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow px-4 sm:px-6 md:px-12 lg:px-[200px] mt-12 mb-16 flex flex-col-reverse md:flex-row md:items-start gap-y-16 md:gap-x-16">

        {/* Left - Posts Section */}
        <div className="w-full md:w-[68%]">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">📝 Your Posts</h1>
          <div className="space-y-6">
            <ProfilePosts />
            <ProfilePosts />
            <ProfilePosts />
          </div>
        </div>

        {/* Right - Profile Form */}
        <div className="w-full md:w-[32%] md:mt-10">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">👤 Profile</h1>
            <div className="flex flex-col space-y-4">
              <input
                className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="Your username"
                type="text"
              />
              <input
                className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="Your email"
                type="email"
              />
              <input
                className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="Your password"
                type="password"
              />
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition">
                  Update
                </button>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Profile;
