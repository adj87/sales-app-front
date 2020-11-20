import React from 'react';
import { Orders } from './app/Orders';
import { LinkProps, RouteProps } from 'react-router-dom';
import { Customers } from './app/Customers';

export interface RouteInterface extends RouteProps {
  authIsRequired?: boolean;
}

export interface LinkInterface extends LinkProps {
  i18nLabel: string;
}

export interface LinksInterface {
  [key: string]: Array<LinkInterface>;
}

export const links: LinksInterface = {
  'main-layout': [
    {
      to: '/orders',
      i18nLabel: 'main-layout.orders',
    },
    { to: '/customers', i18nLabel: 'main-layout.customers' },
  ],
};

export const routes: Array<RouteInterface> = [
  { component: () => <div>Login</div>, exact: true, path: 'login' },
  {
    path: ['/', '/orders'],
    component: Orders,
    exact: true,
    authIsRequired: true,
  },
  {
    path: '/customers',
    component: Customers,
    exact: true,
    authIsRequired: true,
  },
  { path: '*', component: () => <div>404</div> },
];
