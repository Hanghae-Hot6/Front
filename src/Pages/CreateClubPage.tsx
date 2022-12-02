import React from 'react';
import styled from 'styled-components';
import NavigationButton from '../common/NavigationButton';
import ThinLine from '../common/ThinLine';
import CreateClubBody from '../components/CreateClub_FixClub/Body/CreateClubBody';
import CreateClubTitle from '../components/CreateClub_FixClub/Title/CreateClubTitle';

import Layout from '../components/Layout/Layout';
import Theme from '../theme/Theme';

const CreateClubPage = () => {
  return (
    <>
      <Layout>
        <CreateClubPageLayout>
          <CreateClubTitle title="모임 개설하기" />
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
  padding: 8.8rem 0;
  margin: auto;
`;
