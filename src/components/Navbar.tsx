import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { LinkInterface } from '../routesAndLinks';

interface NavbarProps {
  links?: any;
}

const Navbar = (props: NavbarProps) => {
  return (
    <div className="bg-primary-dark flex px-4 w-full justify-center shadow-md">
      {props.links.map((el: LinkInterface) => {
        return (
          <Link to={el.to} className={el.className}>
            {el.label}
          </Link>
        );
      })}

      <span className="absolute right-0 px-4 py-6 text-primary-light">Logout</span>
    </div>
  );
};

export default Navbar;
