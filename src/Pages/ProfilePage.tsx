import React from 'react';
import {ReactQueryDevtools} from 'react-query/devtools';
import Layout from '../components/Layout/Layout';

type ProfilePageProps = {};

const ProfilePage = ({}: ProfilePageProps) => {
  return (
    <>
      <Layout>test</Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};
export default ProfilePage;
