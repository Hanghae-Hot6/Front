import React from 'react';
import styled from 'styled-components';
import NavigationButton from '../common/NavigationButton';
import ThinLine from '../common/ThinLine';
import CreateClubBody from '../components/CreateClub_FixClub/Body/CreateClubBody';
import {CreateClubFixClubPageLayout} from '../components/CreateClub_FixClub/Layout/CreateClubFixClubPageLayout';
import CreateClubTitle from '../components/CreateClub_FixClub/Title/CreateClubTitle';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import Theme from '../theme/Theme';

type CreateClubPageProps = {};

const CreateClubPage = ({}: CreateClubPageProps) => {
  return (
    <>
      <Layout>
        <CreateClubFixClubPageLayout>
          <CreateClubTitle title="모임 개설하기" />
          <ThinLine color={Theme.MainColor} />
          <CreateClubBody />
        </CreateClubFixClubPageLayout>
      </Layout>
    </>
  );
};
export default CreateClubPage;
