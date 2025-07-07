import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);
  const [preview, setPreview] = useState('');

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${postId}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCats(res.data.categories);
        setPreview(res.data.photo);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [postId]);

  const addCategory = () => {
    if (cat.trim() === '') return;
    setCats([...cats, cat]);
    setCat('');
  };

  const deleteCategory = (index) => {
    const updated = [...cats];
    updated.splice(index, 1);
    setCats(updated);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title,
      desc,
      categories: cats,
      username: user.username,
      userId: user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('img', filename);
      data.append('file', file);
      updatedPost.photo = filename;

      try {
        await axios.post(`${URL}/api/upload`, data);
      } catch (err) {
        console.log('Image upload failed:', err);
      }
    }

    try {
      await axios.put(`${URL}/api/posts/${postId}`, updatedPost, {
        withCredentials: true,
      });
      navigate(`/posts/post/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow px-4 sm:px-6 md:px-12 lg:px-[200px] py-12">
        <h1 className="font-extrabold md:text-4xl text-2xl mb-10 text-center text-gray-800">
          ✏️ Edit Blog Post
        </h1>

        <form className="w-full flex flex-col space-y-8 bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit post title"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-700"
          />

          {/* Image Preview */}
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : preview
                ? `${URL}/images/${preview}`
                : 'https://via.placeholder.com/600x300?text=No+Image'
            }
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border border-gray-300"
          />

          {/* File Upload */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="px-4 py-3 border border-dashed border-gray-400 rounded-lg bg-gray-100 hover:border-black transition cursor-pointer"
          />

          {/* Category Input */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                placeholder="Enter post category"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none w-full"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-black hover:bg-gray-900 text-white px-6 py-2 rounded-md font-semibold transition w-full sm:w-auto"
              >
                ➕ Add Category
              </button>
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-3">
              {cats.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  <span className="mr-2">{c}</span>
                  <button
                    type="button"
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-gray-800 hover:bg-black rounded-full p-1 transition"
                  >
                    <ImCross size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
            className="px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:outline-none text-gray-700"
            placeholder="Edit your post description..."
          />

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="bg-black hover:bg-gray-900 w-full sm:w-[40%] mx-auto text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Update Post
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditPost;
