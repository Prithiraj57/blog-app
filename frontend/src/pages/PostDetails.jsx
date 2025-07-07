import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Comments from '../components/Comments';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const PostDetails = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
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

  useEffect(() => {
    const fetchPost = async () => {
      setLoader(true);
      try {
        const res = await axios.get(`${URL}/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("❌ Error fetching post:", err.message);
      }
      setLoader(false);
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {loader ? (
        <div className="flex-grow flex items-center justify-center mt-32">
          <Loader />
        </div>
      ) : post ? (
        <div className="flex-grow px-8 md:px-[200px] mt-[120px] mb-20">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center space-x-2 text-xl">
                <p className="cursor-pointer hover:text-red-600" onClick={()=>navigate("/edit/"+postId)}>
                  <BiEdit/> 
                </p>
                <p className="cursor-pointer hover:text-red-600" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-4 text-sm text-gray-600">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              <p>{new Date(post.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>

          {post.photo && (
            <img
              src={`${URL}/images/${post.photo}`}
              className="w-full mx-auto mt-8 rounded-lg shadow"
              alt={post.title}
            />
          )}

          <p className="mt-8 text-gray-800 leading-relaxed">{post.desc}</p>

          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex items-center space-x-2">
              {post.categories?.map((cat, index) => (
                <div key={index} className="bg-gray-300 rounded-lg px-3 py-1">
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <Comments />
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-red-500 text-lg">Post not found.</div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
