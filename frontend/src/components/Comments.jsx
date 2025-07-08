import React, { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { URL } from '../url.js';
import { UserContext } from '../context/UserContext.jsx';

const Comments = ({ c, post, onDelete }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async () => {
    try {
      await axios.delete(`${URL}/api/comments/${c._id}`, { withCredentials: true });
      onDelete(c._id); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative px-5 py-4 bg-gradient-to-br from-pink-100 to-blue-100 border border-pink-200 rounded-2xl shadow-md my-5 transition-transform hover:scale-[1.01]">
      {/* Top row: author + delete */}
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-purple-700 tracking-wide text-sm md:text-base">
          {user?._id === c?.userId ? (
            <span className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full text-xs md:text-sm shadow-sm">You</span>
          ) : (
            `@${c.author}`
          )}
        </h3>

        {(user && (user._id === post?.userId || user._id === c?.userId)) && (
          <button
            className="text-red-500 hover:text-red-700 transition"
            onClick={deleteComment}
            title="Delete comment"
          >
            <MdDelete className="text-xl" />
          </button>
        )}
      </div>

      {/* Comment text */}
      <p className="mt-3 text-gray-800 font-medium leading-relaxed tracking-wide">
        {c.comment}
      </p>

      {/* Timestamp */}
      <div className="text-[11px] md:text-xs text-right text-gray-600 mt-3 italic">
        {new Date(c.updatedAt).toLocaleDateString()} •{' '}
        {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Comments;
