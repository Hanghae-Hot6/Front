import React, {ReactNode} from 'react';
import styled from 'styled-components';
import ProfileClubList from './ProfileClubList';
import ProfileDetail from './ProfileDetail';
import logo from '../../assets/logo.svg';

function ProfileContainer() {
  return (
    <>
      <StContainer>
        <StProfileBox>
          <StTitle>
            <img src={logo} alt="" />
            <StSpan>마이페이지</StSpan>
          </StTitle>
          <StDiv>
            <StUserInfoSection>
              <ProfileDetail />
            </StUserInfoSection>
            <StClubInfoSection>
              <ProfileClubList />
            </StClubInfoSection>
          </StDiv>
        </StProfileBox>
      </StContainer>
    </>
  );
}

export default ProfileContainer;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StProfileBox = styled.div`
  display: flex;
  height: 70.5rem;
  width: 97.3rem;
  border-radius: 10px;
  margin: 10.5rem auto;
  padding: 1rem;
  position: relative;
  flex-direction: column;
`;
const StTitle = styled.div`
  margin-left: 1rem;
  margin-bottom: 3rem;
`;

const StSpan = styled.span`
  font-size: 2.8rem;
  font-weight: bold;
  margin-left: 2rem;
`;

const StUserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  margin-right: 1rem;
  background-color: #fff;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 1rem;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
`;
const StClubInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;

const StDiv = styled.div`
  display: flex;
  height: 60.5rem;
  width: 95.3rem;
  border-radius: 10px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  justify-content: center;
  align-items: center;
`;
