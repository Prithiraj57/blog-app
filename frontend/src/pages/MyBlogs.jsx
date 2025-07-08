import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import HomePost from '../components/HomePost';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { URL } from '../url';

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { search } = useLocation();
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
      setNoResults(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-24 px-4 md:px-[200px]">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          📚 My Blogs
        </h1>

        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link to={user ? `/posts/post/${post._id}` : "/login"} key={post._id}>
                <HomePost post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="text-center text-lg font-semibold text-gray-500 mt-10">
            No posts available for your account.
          </h3>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBlogs;
