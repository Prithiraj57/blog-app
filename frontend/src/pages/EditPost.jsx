import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';

const EditPost = () => {
  const [title, setTitle] = useState('10 Uses of Artificial Intelligence');
  const [desc, setDesc] = useState('AI is revolutionizing industries such as healthcare, transportation, and education...');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState(['Tech', 'AI']);

  // Add new category to list
  const addCategory = () => {
    if (cat.trim() === '') return;
    setCats([...cats, cat]);
    setCat('');
  };

  // Remove category by index
  const deleteCategory = (index) => {
    const updated = [...cats];
    updated.splice(index, 1);
    setCats(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow px-6 md:px-[200px] mt-12 mb-12">
        <h1 className="font-extrabold md:text-3xl text-2xl mb-8 text-center text-gray-800">
          ✏️ Edit Blog Post
        </h1>

        <form className="w-full flex flex-col space-y-6 md:space-y-10 bg-white shadow-lg rounded-xl p-6 md:p-10 border border-gray-200">
          {/* Title Input */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit post title"
            className="px-4 py-3 outline-none border border-gray-300 rounded-md focus:border-black focus:ring-2 focus:ring-gray-100 transition"
          />

          {/* Existing Image (preview) */}
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://miro.medium.com/v2/resize:fit:1100/1*JyoSgGJE0E7E5Wdl66WFjQ.png'
            }
            alt="Preview"
            className="w-full h-64 object-cover rounded-md"
          />

          {/* File Upload */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
          />

          {/* Category Input */}
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                placeholder="Enter post category"
                className="px-4 py-3 outline-none border border-gray-300 rounded-md w-full"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 font-medium rounded-md text-center cursor-pointer transition"
              >
                ➕ Add Category
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mt-2">
              {cats.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  <span className="mr-2">{c}</span>
                  <span
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-gray-800 hover:bg-black rounded-full p-1 cursor-pointer"
                  >
                    <ImCross size={10} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description Textarea */}
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
            className="px-4 py-3 outline-none border border-gray-300 rounded-md resize-none focus:border-black focus:ring-2 focus:ring-gray-100"
            placeholder="Edit your post description..."
          />

          {/* Update Button */}
          <button
            type="submit"
            className="bg-black hover:bg-gray-900 w-full md:w-[30%] mx-auto text-white font-semibold px-6 py-3 rounded-md transition"
          >
            ✅ Update Post
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditPost;
