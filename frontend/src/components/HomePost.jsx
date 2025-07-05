import React from 'react';

const HomePost = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center bg-gray-100">
        <img 
          src="" 
          alt="Post Thumbnail" 
          className="h-full w-full object-cover rounded"
        />
      </div>

      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold mb-1 md:mb-2 md:text-3xl">
          10 Uses of Artificial Intelligence
        </h1>
        <div className="flex justify-between items-center text-sm font-semibold text-gray-500 mb-2 md:mb-4">
          <p>@Prithiraj</p>
          <div className="flex space-x-2">
            <p>16/06/2023</p>
            <p>16:45</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Prominent examples of AI software include voice assistants and more advanced automation tools that learn from data.
        </p>
      </div>
    </div>
  );
};

export default HomePost;
