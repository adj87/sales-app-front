import React, { useCallback } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { LinkInterface } from '../routesAndLinks';
import { HOME } from '../constants';
import { useTranslation } from 'react-i18next';

interface NavbarProps extends RouteComponentProps {
  links: LinkInterface[];
  asideLink?: LinkInterface;
  classNameNormalLink: String;
  classNameActiveLink: String;
}

const Navbar = (props: NavbarProps) => {
  const { links, location, classNameActiveLink, classNameNormalLink, asideLink } = props;
  const { t } = useTranslation();
  const isActive = (el: LinkInterface) => el.to === location.pathname || (location.pathname === '/' && HOME === el.to);
  return (
    <div className="bg-primary-dark flex px-4 w-full justify-center shadow-md">
      {links.map((el: LinkInterface) => {
        return (
          <Link to={el.to} className={`${isActive(el) ? classNameActiveLink : classNameNormalLink}`} key={el.to.toString()}>
            {t(el.i18nLabel)}
          </Link>
        );
      })}
      {asideLink && (
        <Link
          to={asideLink.to}
          className={`${isActive(asideLink) ? classNameActiveLink : classNameNormalLink} absolute right-0`}
          key={asideLink.to.toString()}
        >
          {t(asideLink.i18nLabel)}
        </Link>
      )}
    </div>
  );
};

export default withRouter(Navbar);
