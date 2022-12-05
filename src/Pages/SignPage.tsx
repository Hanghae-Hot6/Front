import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Layout from '../components/Layout/Layout';
import RegistLayout from '../components/Layout/RegistLayout';
import SignUp from '../components/SignUp/SignUp';

const SignPage = () => {
  return (
    <RegistLayout>
      <SignUp />
    </RegistLayout>
  );
};
export default SignPage;
