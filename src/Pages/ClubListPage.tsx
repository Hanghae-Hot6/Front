import React from 'react';
import ClubListBody from '../components/ClubList/Body/ClubListBody';
import ClubListTitle from '../components/ClubList/Title/ClubListTitle';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';

type ClubListPageProps = {};

const ClubListPage = ({}: ClubListPageProps) => {
  return (
    <>
      <Layout>
        <Container>
          <ClubListTitle />
          <ClubListBody />
        </Container>
      </Layout>
    </>
  );
};
export default ClubListPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;
  border: 1px solid black;
`;
