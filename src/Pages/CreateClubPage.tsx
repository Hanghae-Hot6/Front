import React from 'react';
import NavigationButton from '../common/NavigationButton';
import CreateClubBody from '../components/CreateClub/Body/CreateClubBody';
import CreateClubTitle from '../components/CreateClub/Title/CreateClubTitle';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';

type CreateClubPageProps = {};

const CreateClubPage = ({}: CreateClubPageProps) => {
  return (
    <>
      <Layout>
        <CreateClubTitle />
        <CreateClubBody />
      </Layout>
    </>
  );
};
export default CreateClubPage;
