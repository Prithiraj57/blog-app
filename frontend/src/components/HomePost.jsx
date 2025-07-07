import React from 'react';
import { IF } from '../url';

const HomePost = ({ post }) => {
  const createdAt = new Date(post.updatedAt);
  const date = createdAt.toLocaleDateString();
  const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full flex flex-col md:flex-row mt-10 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white border border-gray-200">
      {/* Image */}
      <div className="w-full md:w-[35%] h-[200px] overflow-hidden rounded-lg">
        <img
          src={`${IF}${post.photo}`}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300 rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col w-full md:w-[65%] md:pl-6 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition duration-200">
          {post.title}
        </h1>

        <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-3">
          <p>By <span className="text-black font-semibold">{post.username}</span></p>
          <div className="flex space-x-2">
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>

        <p className="text-gray-700 text-base leading-relaxed line-clamp-3">
          {post.desc.slice(0, 200)}
          <span className="text-blue-600 cursor-pointer hover:underline">... Read more</span>
        </p>
      </div>
    </div>
  );
};

export default HomePost;
