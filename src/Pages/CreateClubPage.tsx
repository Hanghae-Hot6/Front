import React from 'react';
import styled from 'styled-components';
import NavigationButton from '../common/NavigationButton';
import ThinLine from '../common/ThinLine';
import CreateClubBody from '../components/CreateClub2/Body/CreateClubBody';
import CreateClubTitle from '../components/CreateClub2/Title/CreateClubTitle';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import Theme from '../theme/Theme';

type CreateClubPageProps = {};

const CreateClubPage = ({}: CreateClubPageProps) => {
  return (
    <>
      <Layout>
        <CreateClubPageLayout>
          <CreateClubTitle />
          <ThinLine color={Theme.MainColor} />
          <CreateClubBody />
        </CreateClubPageLayout>
      </Layout>
    </>
  );
};
export default CreateClubPage;

const CreateClubPageLayout = styled.div`
  width: 86.8rem;
  margin: auto;
`;
