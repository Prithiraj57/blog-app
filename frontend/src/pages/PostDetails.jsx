import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const PostDetails = () => {
  return (
    <div>
      <Navbar />

      <div className="px-8 md:px-[200px] mt-8">
        {/* Post Title and Actions */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            10 Uses of Artificial Intelligence
          </h1>
          <div className="flex items-center space-x-2 text-xl">
            <p className="cursor-pointer"><BiEdit /></p>
            <p className="cursor-pointer"><MdDelete /></p>
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
          className="w-full mx-auto mt-8 rounded"
          alt="AI"
        />

        {/* Content */}
        <p className="mx-auto mt-8 text-gray-800 leading-relaxed">
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
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>

          {/* Single Comment */}
          <div className="px-4 py-2 bg-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@senhashish</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <p>16/06/2023</p>
                <p>16:45</p>
                <div className="flex items-center space-x-2 text-black text-lg">
                  <BiEdit className="cursor-pointer" />
                  <MdDelete className="cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Comment Text */}
            <p className="mt-2 text-sm text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, pariatur!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostDetails;
