import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const Comments = () => {
  const dummyComments = [
    {
      username: '@senhashish',
      date: '16/06/2023',
      time: '16:45',
      text: 'This is a very insightful post about AI!',
    },
    {
      username: '@prithiraj',
      date: '17/06/2023',
      time: '10:12',
      text: 'Thanks for sharing this, really helpful.',
    },
    {
      username: '@tech_guru',
      date: '18/06/2023',
      time: '08:30',
      text: 'AI is definitely transforming the future!',
    },
  ];

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {dummyComments.map((comment, index) => (
        <div
          key={index}
          className="px-4 py-3 bg-gray-200 rounded-lg mb-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-gray-700">{comment.username}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <p>{comment.date}</p>
              <p>{comment.time}</p>
              <div className="flex items-center space-x-2 text-black text-lg">
                <BiEdit className="cursor-pointer" />
                <MdDelete className="cursor-pointer" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-800">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
