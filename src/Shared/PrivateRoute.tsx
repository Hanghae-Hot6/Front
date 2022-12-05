import React from 'react';
import styles from './private_route.module.css';
import {Navigate, Outlet} from 'react-router-dom';
import {getAccessToken} from '../utils';

type PrivateRouteProps = {};

const PrivateRoute = ({}: PrivateRouteProps) => {
  // 토큰값이 만료에 따라 로그인 로그아웃
  const login = getAccessToken();

  if (!login) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};
export default PrivateRoute;
