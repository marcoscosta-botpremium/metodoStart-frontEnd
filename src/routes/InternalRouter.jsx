import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Loadable } from './utils';

const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const Home = Loadable(lazy(() => import('../pages/Home')));
const Operation = Loadable(lazy(() => import('../pages/Operation')));
const Robot = Loadable(lazy(() => import('../pages/Operation/Robot')));
const Upgrades = Loadable(lazy(() => import('../pages/Upgrades')));
const Tutorials = Loadable(lazy(() => import('../pages/Tutorials')));
const Config = Loadable(lazy(() => import('../pages/Config')));
const Bot = Loadable(lazy(() => import('../pages/Bot')));
const Strategies = Loadable(lazy(() => import('../pages/Strategies')));
const Reports = Loadable(lazy(() => import('../pages/Reports')));
const Help = Loadable(lazy(() => import('../pages/Help')));
const Settings = Loadable(lazy(() => import('../pages/Settings')));
const Calculator = Loadable(lazy(() => import('../pages/Calculator')));
const LoginBinary = Loadable(lazy(() => import('../pages/LoginBinary')));
const RecoverFirst = Loadable(
  lazy(() => import('../pages/authentication/RecoverFirst'))
);

/*****Routes******/
export const InternalRouter = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },

  {
    path: 'dashboard',
    element: <Dashboard />,
  },

  {
    path: 'home',
    element: <Home />,
  },

  {
    path: 'operation',
    element: <Operation />,
  },
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
    path: 'config',
    element: <Config />,
  },

  {
    path: '*',
    element: <Navigate to="/home" />,
  },
];
