import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Loadable } from './utils';

const Home = Loadable(lazy(() => import('../pages/Home')));
const Operation = Loadable(lazy(() => import('../pages/Operation')));
const Robot = Loadable(lazy(() => import('../pages/Operation/Robot')));
const Upgrades = Loadable(lazy(() => import('../pages/Upgrades')));
const Tutorials = Loadable(lazy(() => import('../pages/Tutorials')));
const Config = Loadable(lazy(() => import('../pages/Config')));
const LoginBinary = Loadable(lazy(() => import('../pages/LoginBinary')));

/*****Routes******/
export const InternalRouter = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },

  {
    path: '/binary',
    element: <LoginBinary />,
  },

  {
    path: 'home',
    element: <Home />,
  },

  // {
  //   path: 'operation',
  //   element: <Operation />,
  // },
  {
    path: 'upgrades',
    element: <Upgrades />,
  },

  {
    path: 'robot',
    element: <Robot />,
  },

  {
    path: 'tutorials',
    element: <Tutorials />,
  },
  {
    path: 'tutorials/:id',
    element: <Tutorials />,
  },
  {
    path: 'config',
    element: <Config />,
  },

  {
    path: '*',
    element: <Navigate to="/home" />,
  },
];
