import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar';
import { links } from '../../routesAndLinks';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <>
      <Navbar links={links['main-layout']} />
      <div className="container mx-auto px-4">
        <div className="w-full my-16">{children}</div>
      </div>
    </>
  );
};

export default Main;
