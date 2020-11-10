import React from 'react';

const Navbar = () => {
  return <div className="bg-main-blue flex px-4 w-full justify-center shadow-md">
   
    <span className="px-4 py-6 text-main-blue-500">Link 1</span>
    <span className="px-4 py-6 text-main-blue-500">Link 1</span>
    <span className="px-4 py-6 text-main-blue-500">Link 1</span>


    <span className="absolute right-0 px-4 py-6">Logout</span>
  </div>;
};

export default Navbar;
