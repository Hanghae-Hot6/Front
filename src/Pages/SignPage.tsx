import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Layout from '../components/Layout/Layout';
import RegistLayout from '../components/Layout/RegistLayout';
import SignUp from '../components/SignUp/SignUp';

type SignPageProps = {};

const SignPage = ({}: SignPageProps) => {
  return (
    <RegistLayout>
      <SignUp />
    </RegistLayout>
  );
};
export default SignPage;
