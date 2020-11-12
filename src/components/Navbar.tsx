import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-primary-dark flex px-4 w-full justify-center shadow-md">
      <span className="px-4 py-6 text-primary-light">Link 1</span>
      <span className="px-4 py-6 text-primary-light">Link 1</span>
      <span className="px-4 py-6 text-white font-extrabold">Link 1</span>
      <span className="absolute right-0 px-4 py-6 text-primary-light">Logout</span>
    </div>
  );
};

export default Navbar;
