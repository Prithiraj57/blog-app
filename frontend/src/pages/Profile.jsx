import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePosts from '../components/ProfilePosts';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';

const Profile = () => {
  const { id: param } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);

  const { user, setUser } = useContext(UserContext);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(""); 
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (err) {
      console.log("Posts fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [param]);

  const handleUpdate = async () => {
    const updateData = { username, email };
    if (password.trim()) {
      updateData.password = password;
    }

    try {
      await axios.put(`${URL}/api/users/${user._id}`, updateData, {
        withCredentials: true,
      });
      await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      alert("Profile updated! Please log in again.");
      navigate("/login");
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      navigate("/register");
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow px-4 sm:px-6 md:px-12 lg:px-[200px] pt-28 pb-16 flex flex-col-reverse md:flex-row md:items-start gap-y-16 md:gap-x-16">
        
        {/* Posts Section */}
        <div className="w-full md:w-[68%]">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">📝 Your Posts</h1>
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-gray-500">You haven't written any posts yet.</p>
            ) : (
              posts.map((p) => <ProfilePosts key={p._id} p={p} />)
            )}
          </div>
        </div>

        {/* Profile Form */}
        <div className="w-full md:w-[32%] md:mt-10">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">👤 Profile</h1>
            <div className="flex flex-col space-y-4">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="Your username"
                type="text"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="Your email"
                type="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="New password (leave blank to keep current)"
                type="password"
              />
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={handleUpdate}
                  className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
