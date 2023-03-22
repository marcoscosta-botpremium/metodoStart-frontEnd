import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Loadable } from './utils';

const Login = Loadable(lazy(() => import('../pages/Auth/index')));
const Recover = Loadable(lazy(() => import('../pages/authentication/Recover')));
const Forgot = Loadable(lazy(() => import('../pages/authentication/Forgot')));

/*****Routes******/
export const AuthRouter = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'forgot',
    element: <Forgot />,
  },
  {
    path: 'recover/',
    element: <Recover />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
];
