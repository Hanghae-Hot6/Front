import React from 'react';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/Login/LoginForm';

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  return (
    <>
      <Layout>
        <LoginForm />
      </Layout>
    </>
  );
};
export default LoginPage;
