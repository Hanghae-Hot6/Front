import React from 'react';
import Footer from '../components/Footer/Footer';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/Login/LoginForm';

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  return (
    <>
      <div>
        <section style={{width: '1280px', margin: '0 auto'}}>
          <LoginForm />
        </section>
      </div>
    </>
  );
};
export default LoginPage;
