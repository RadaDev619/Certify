import React from 'react';

const Public = () => {
  return (
    <div className="pt-36 px-16">
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-2 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </div>
    </div>
  );
};

export default Public;