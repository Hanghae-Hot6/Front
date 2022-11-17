import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Layout from '../components/Layout/Layout';
import SignUp from '../components/SignUp/SignUp';

type SignPageProps = {};

const SignPage = ({}: SignPageProps) => {
  return (
    <StLayout>
      <section
        style={{
          width: '1280px',
          margin: '0 auto',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SignUp />
      </section>
    </StLayout>
  );
};
export default SignPage;

const StLayout = styled.div`
  background-color: #fdfcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
