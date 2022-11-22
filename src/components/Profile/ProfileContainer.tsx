import React, {ReactNode} from 'react';
import styled from 'styled-components';
import ProfileClubList from './ProfileClubList';
import ProfileDetail from './ProfileDetail';

function ProfileContainer() {
  return (
    <StProfileBox>
      <StUserInfoSection>
        <ProfileDetail />
      </StUserInfoSection>
      <StClubInfoSection>
        <ProfileClubList />
      </StClubInfoSection>
    </StProfileBox>
  );
}

export default ProfileContainer;

const StProfileBox = styled.div`
  display: flex;
  height: 60.5rem;
  width: 97.3rem;
  border-radius: 10px;
  margin: 18.5rem auto;
  /* background-color: #fff; */
  /* border: 1px solid #c1a4ff; */
  /* box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08); */
  padding: 1rem;
`;

const StUserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  margin-right: 1rem;
  background-color: palevioletred;
`;
const StClubInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;
