import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { LinkInterface } from '../routesAndLinks';
import { HOME } from '../constants';

interface NavbarProps extends RouteComponentProps {
  links?: any;
  classNameNormalLink: String;
  classNameActiveLink: String;
}

const Navbar = (props: NavbarProps) => {
  const { links, location, classNameActiveLink, classNameNormalLink } = props;
  return (
    <div className="bg-primary-dark flex px-4 w-full justify-center shadow-md">
      {links.map((el: LinkInterface) => {
        const active = el.to === location.pathname || (location.pathname === '/' && HOME === el.to);
        return (
          <Link to={el.to} className={`${active ? classNameActiveLink : classNameNormalLink}`}>
            {el.label}
          </Link>
        );
      })}
      <span className={`absolute right-0 ${classNameNormalLink}`}>Logout</span>;
    </div>
  );
};

export default withRouter(Navbar);
