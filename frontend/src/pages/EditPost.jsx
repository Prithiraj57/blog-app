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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow px-4 sm:px-6 md:px-12 lg:px-[200px] py-12">
        <h1 className="font-extrabold md:text-4xl text-2xl mb-10 text-center text-gray-800">
          ✏️ Edit Blog Post
        </h1>

        <form className="w-full flex flex-col space-y-8 bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100 transition-all">
          
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit post title"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition text-gray-700"
          />

          {/* Image Preview */}
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://miro.medium.com/v2/resize:fit:1100/1*JyoSgGJE0E7E5Wdl66WFjQ.png'
            }
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border border-gray-300"
          />

          {/* File Upload */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="px-4 py-3 border border-dashed border-gray-400 rounded-lg bg-gray-100 hover:border-black transition cursor-pointer file:cursor-pointer"
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
            type="submit"
            className="bg-black hover:bg-gray-900 w-full sm:w-[40%] mx-auto text-white font-semibold px-6 py-3 rounded-lg transition"
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
