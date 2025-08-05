import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Comments from '../components/Comments';
import { URL } from '../url.js';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const PostDetails = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err.message);
    }
    setLoader(false);
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log("Error fetching comments:", err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `${URL}/api/comments/write`,
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComments([...comments, res.data]);
      setComment("");
    } catch (err) {
      console.log("Error posting comment:", err);
    }
  };

  const handleDeleteComment = (id) => {
    setComments((prev) => prev.filter((comm) => comm._id !== id));
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-blue-50">


      {loader ? (
        <div className="flex-grow flex items-center justify-center mt-32">
          <Loader />
        </div>
      ) : post ? (
        <div className="flex-grow px-4 sm:px-8 md:px-[200px] mt-[120px] mb-20">
          {/* Title and actions */}
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-extrabold text-indigo-800">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center space-x-2 text-2xl text-gray-700">
                <p className="cursor-pointer hover:text-blue-600" onClick={() => navigate(`/edit/${postId}`)}>
                  <BiEdit />
                </p>
                <p className="cursor-pointer hover:text-red-600" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>

          {/* Post metadata */}
          <div className="flex justify-between text-sm text-gray-600">
            <p className="text-pink-700 font-medium">
              {user?._id === post.userId ? "You" : `@${post.username}`}
            </p>
            <div className="flex space-x-3 text-xs italic text-gray-500">
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              <p>{new Date(post.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Post image */}
          {post.photo && (
            <img
              src={`${URL}/images/${post.photo}`}
              className="w-full max-h-[500px] object-cover mt-6 rounded-lg shadow-lg"
              alt={post.title}
            />
          )}

          {/* Post description */}
          <p className="mt-8 text-gray-800 leading-relaxed tracking-wide text-[17px]">
            {post.desc}
          </p>

          {/* Categories */}
          <div className="flex items-center mt-8 space-x-3 font-semibold text-sm">
            <p className="text-indigo-700">Categories:</p>
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((cat, index) => (
                <div
                  key={index}
                  className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs shadow"
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Comments:</h2>

            {comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet. Be the first to add one!</p>
            ) : (
              comments.map((c) => (
                <Comments key={c._id} c={c} post={post} onDelete={handleDeleteComment} />
              ))
            )}
          </div>

          {/* Add Comment */}
          <form onSubmit={postComment} className="w-full flex flex-col md:flex-row mt-6 items-center">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment..."
              className="md:w-[80%] w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white text-sm px-4 py-2 mt-4 md:mt-0 md:ml-4 rounded-md shadow hover:bg-indigo-700 transition"
            >
              Add Comment
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mt-20 text-red-500 text-lg">Post not found.</div>
      )}

      <Footer />
    </div>
  );
};

export default PostDetails;
