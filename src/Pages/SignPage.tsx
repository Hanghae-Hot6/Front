import React from 'react';
import Footer from '../components/Footer/Footer';
import Layout from '../components/Layout/Layout';
import SignUp from '../components/SignUp/SignUp';

type SignPageProps = {};

const SignPage = ({}: SignPageProps) => {
  return (
    <div style={{}}>
      <section
        style={{
          width: '1280px',
          margin: '0 auto',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SignUp />
      </section>
    </div>
  );
};
export default SignPage;
