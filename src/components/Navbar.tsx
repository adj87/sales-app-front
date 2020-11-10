import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-blue-dark flex px-4 w-full justify-center shadow-md">
      <span className="px-4 py-6 text-blue-light">Link 1</span>
      <span className="px-4 py-6 text-blue-light">Link 1</span>
      <span className="px-4 py-6 text-white font-extrabold">Link 1</span>
      <span className="absolute right-0 px-4 py-6 text-blue-light">Logout</span>
    </div>
  );
};

export default Navbar;
