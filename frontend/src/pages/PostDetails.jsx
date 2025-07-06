import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Comments from '../components/Comments'; // Make sure this is imported correctly

const PostDetails = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow px-8 md:px-[200px] mt-10 mb-20">
        {/* Post Title and Actions */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            10 Uses of Artificial Intelligence
          </h1>
          <div className="flex items-center space-x-2 text-xl">
            <BiEdit className="cursor-pointer hover:text-blue-500" />
            <MdDelete className="cursor-pointer hover:text-red-600" />
          </div>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between mt-2 md:mt-4 text-sm text-gray-600">
          <p>@Prithiraj</p>
          <div className="flex space-x-2">
            <p>16/06/2023</p>
            <p>16:45</p>
          </div>
        </div>

        {/* Image */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/1*JyoSgGJE0E7E5Wdl66WFjQ.png"
          className="w-full mx-auto mt-8 rounded-lg shadow"
          alt="AI"
        />

        {/* Content */}
        <p className="mt-8 text-gray-800 leading-relaxed">
          Prominent examples of AI software include voice assistants and more advanced automation tools
          that learn from data. AI is also being used in medical diagnostics, customer support chatbots,
          recommendation systems, fraud detection, autonomous vehicles, and much more.
        </p>

        {/* Categories */}
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">AI</div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-50">
  
          <Comments />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostDetails;
