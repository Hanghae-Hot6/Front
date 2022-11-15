import React from 'react';
import ClubListBody from '../components/ClubList/Body/ClubListBody';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';

const ClubListPage = () => {
  // const queryClient = useQueryClient(); , isLoading 아직 안씀

  return (
    <>
      <Layout>
        <Container>
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
  /* width: 100vw; */
  height: 100vh;
  margin: auto;
  border: 1px solid black;
`;
