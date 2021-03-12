import React, { ReactNode, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { LinkInterface, links } from '../routesAndLinks';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <>
      <Navbar
        links={links['main-layout'].filter((el: LinkInterface) => el.to !== '/config')}
        classNameNormalLink="px-4 py-6 text-primary-light"
        classNameActiveLink="px-4 py-6 text-white font-extrabold"
        asideLink={links['main-layout'].find((el: LinkInterface) => el.to === '/config')}
      />
      <div className="container mx-auto px-4">
        <div className="w-full my-16">{children}</div>
      </div>
    </>
  );
};

export default Main;
