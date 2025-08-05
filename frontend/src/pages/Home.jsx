import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import HomePost from '../components/HomePost';
import axios from 'axios';
import { URL } from '../url';
import { useLocation, Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { search } = useLocation();

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow px-8 md:px-[200px] mt-[100px]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link to={`/posts/post/${post._id}`} key={post._id}>
              <HomePost post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center text-lg font-semibold text-gray-500 mt-10">
            No posts available for your search.
          </h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
