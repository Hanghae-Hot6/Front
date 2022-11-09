import React from 'react';
import ClubListBody from '../components/ClubList/Body/ClubListBody';
import ClubListTitle from '../components/ClubList/Title/ClubListTitle';
import Layout from '../components/Layout/Layout';

type ClubListPageProps = {};

const ClubListPage = ({}: ClubListPageProps) => {
  return (
    <>
      <Layout>
        <ClubListTitle />
        <ClubListBody />
      </Layout>
    </>
  );
};
export default ClubListPage;
