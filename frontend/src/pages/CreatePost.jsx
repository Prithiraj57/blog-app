import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);

  const addCategory = () => {
    if (cat.trim() === '') return;
    const updatedCats = [...cats];
    updatedCats.push(cat);
    setCats(updatedCats);
    setCat('');
  };

  const deleteCategory = (index) => {
    const updatedCats = [...cats];
    updatedCats.splice(index, 1);
    setCats(updatedCats);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow px-6 md:px-[200px] mt-12 mb-12">
        <h1 className="font-extrabold md:text-3xl text-2xl mb-8 text-center text-gray-800">
          ✍️ Create a New Blog Post
        </h1>

        <form className="w-full flex flex-col space-y-6 md:space-y-10 bg-white shadow-lg rounded-xl p-6 md:p-10 border border-gray-200">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="px-4 py-3 outline-none border border-gray-300 rounded-md"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
          />

          <div className="flex flex-col space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-3 outline-none border border-gray-300 rounded-md w-full"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-6 py-2 font-medium rounded-md text-center cursor-pointer"
              >
                ➕ Add Category
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {cats.map((cat, i) => (
                <div
                  key={i}
                  className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  <span className="mr-2">{cat}</span>
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

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
            className="px-4 py-3 outline-none border border-gray-300 rounded-md resize-none"
            placeholder="Write your post description..."
          />

          <button className="bg-black hover:bg-gray-900 w-full md:w-[30%] mx-auto text-white font-semibold px-6 py-3 rounded-md transition">
            🚀 Publish Post
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreatePost;
