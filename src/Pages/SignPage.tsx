import React from 'react';
import Layout from '../components/Layout/Layout';
import SignUp from '../components/SignUp/SignUp';

type SignPageProps = {};

const SignPage = ({}: SignPageProps) => {
  return (
    <>
      <Layout>
        <SignUp></SignUp>
      </Layout>
    </>
  );
};
export default SignPage;
