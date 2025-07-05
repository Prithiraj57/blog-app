import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePost from '../components/HomePost';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Content grows to fill available space */}
      <div className="flex-grow px-8 md:px-[200px]">
        <HomePost />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
