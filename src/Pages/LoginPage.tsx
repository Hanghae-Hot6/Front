import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/Login/LoginForm';

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  return (
    <>
      <StLayout>
        <section
          style={{
            width: '1280px',
            margin: '0 auto',
          }}>
          <LoginForm />
        </section>
      </StLayout>
    </>
  );
};
export default LoginPage;

const StLayout = styled.div`
  background-color: #fdfcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
