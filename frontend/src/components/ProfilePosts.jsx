import React from 'react';

const ProfilePosts = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {/* Image */}
      <img
        src="https://source.unsplash.com/800x400/?technology"
        alt="Post Cover"
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold mt-4 text-gray-800">
        Sample Blog Post Title
      </h2>

      {/* Date and Time */}
      <p className="text-sm text-gray-500 mt-1">Posted on 05/07/2025 at 12:45 PM</p>

      {/* Description */}
      <p className="text-gray-700 mt-3">
        This is a short description of the blog post content. It gives a preview of what the post is about...
      </p>
    </div>
  );
};

export default ProfilePosts;
