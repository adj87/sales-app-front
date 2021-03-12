import React from 'react';
import { Orders } from './app/Orders';
import { LinkProps, RouteProps } from 'react-router-dom';
import { Customers } from './app/Customers';
import { Fares } from './app/Fares';
import { Config } from './app/Config';

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
    { to: '/fares', i18nLabel: 'main-layout.fares' },
    { to: '/config', i18nLabel: 'main-layout.config' },
  ],
};

export const routes: Array<RouteInterface> = [
  { component: () => <div>Login</div>, exact: true, path: 'login' },
  {
    path: ['/', '/orders', '/orders/:id', '/orders/new'],
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
  {
    path: ['/', '/fares', '/fares/:id', '/fares/new'],
    component: Fares,
    exact: true,
    authIsRequired: true,
  },
  {
    path: '/config',
    component: Config,
    exact: true,
    authIsRequired: true,
  },
  { path: '*', component: () => <div>404</div> },
];
