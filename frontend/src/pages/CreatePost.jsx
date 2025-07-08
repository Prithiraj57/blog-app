import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    const updated = [...cats];
    updated.splice(i, 1);
    setCats(updated);
  };

  const addCategory = () => {
    if (cat.trim() !== "") {
      setCats([...cats, cat.trim()]);
      setCat("");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/write", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] pt-24 pb-12 bg-gray-50 min-h-screen">
        {/* ⬆ pt-24 gives space for fixed navbar */}
        <h1 className="font-bold md:text-3xl text-2xl text-center mb-8">Create a New Post</h1>

        <form
          onSubmit={handleCreate}
          className="w-full flex flex-col space-y-6 bg-white p-6 md:p-10 rounded-lg shadow-md"
        >
          {/* Title */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* File */}
          <label className="flex flex-col items-start space-y-2 text-gray-600">
            <span className="text-sm font-medium">Upload Image</span>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
            />
          </label>

          {/* Categories */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter post category"
                type="text"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>

            {/* Display added categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {cats.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  <span>{c}</span>
                  <ImCross
                    onClick={() => deleteCategory(i)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
            placeholder="Enter post description"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-black w-full md:w-1/3 mx-auto text-white font-semibold px-4 py-3 rounded-md text-lg hover:bg-gray-800 transition"
          >
            Create Post
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
