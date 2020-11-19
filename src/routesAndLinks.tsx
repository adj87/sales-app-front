import React from 'react';
import { Orders } from './app/Orders';
import { LinkProps, RouteProps } from 'react-router-dom';

export interface RouteInterface extends RouteProps {
  authIsRequired?: boolean;
}

export interface LinkInterface extends LinkProps {
  label: String;
}

export interface LinksInterface {
  [key: string]: Array<LinkInterface>;
}

export const links: LinksInterface = {
  'main-layout': [
    { to: '/orders', label: 'Orders', className: 'px-4 py-6 text-primary-light' },
    { to: '/delivery-notes', label: 'Delivery notes', className: 'px-4 py-6 text-primary-light' },
  ],
};

export const routes: Array<RouteInterface> = [
  { component: () => <div>Login</div>, exact: true, path: 'login' },
  {
    path: '/',
    component: Orders,
    exact: true,
    authIsRequired: true,
  },
  {
    component: () => <div>Delivery Notes</div>,
    exact: true,
    authIsRequired: true,
  },
  { path: '*', component: () => <div>404</div> },
];
