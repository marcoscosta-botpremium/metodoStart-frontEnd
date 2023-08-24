import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Loadable } from './utils';

const Login = Loadable(lazy(() => import('../pages/Auth/index')));
// const Recover = Loadable(lazy(() => import('../pages/Auth/RecoverPassword')));
// const Forgot = Loadable(lazy(() => import('../pages/Auth/ForgotPassword')));

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
  // {
  //   path: 'recover/:`',
  //   element: <Recover />,
  // },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
];
