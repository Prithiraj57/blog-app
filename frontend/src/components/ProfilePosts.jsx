import React from 'react';
import { Link } from 'react-router-dom';
import { URL } from '../url';

const ProfilePosts = ({ p }) => {
  return (
    <Link to={`/posts/post/${p._id}`}>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200 cursor-pointer">
        {/* Image */}
        <img
          src={p?.photo ? `${URL}/images/${p.photo}` : "/default.png"}
          alt="Post Cover"
          className="w-full h-48 object-cover rounded-md"
        />

        {/* Title */}
        <h2 className="text-xl font-semibold mt-4 text-gray-800">{p.title}</h2>

        {/* Date and Time */}
        <p className="text-sm text-gray-500 mt-1">
          Posted on {new Date(p.createdAt).toLocaleDateString()} at{" "}
          {new Date(p.createdAt).toLocaleTimeString()}
        </p>

        {/* Description */}
        <p className="text-gray-700 mt-3 line-clamp-3">
          {p.desc?.slice(0, 120)}...
        </p>

        {/* Read more */}
        <div className="mt-2 text-right">
          <span className="text-blue-600 text-sm font-medium hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProfilePosts;
