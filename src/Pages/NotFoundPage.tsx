import React from 'react';
import RegistLayout from '../components/Layout/RegistLayout';
import notFound from '../assets/404.svg';
import styled from 'styled-components';
import Header from '../components/Header/Header';

const NotFoundPage = () => {
  return (
    <>
      <StNotFoundContainer>
        <Header />
        <RegistLayout>
          <NotFoundDiv>
            <img src={notFound} alt="notFound" />
            <div>
              <p>해당 페이지를 찾을 수 없습니다.</p>
              <p>입력하신 페이지의 주소를 다시 확인해주세요.</p>
            </div>
          </NotFoundDiv>
        </RegistLayout>
      </StNotFoundContainer>
    </>
  );
};
export default NotFoundPage;

const StNotFoundContainer = styled.section`
  overflow: hidden;
`;

const NotFoundDiv = styled.div`
  img {
    display: block;
    margin: 0 auto;
  }
  div {
    text-align: center;
    p:nth-child(1) {
      font-weight: bold;
      margin-top: 4rem;
      margin-bottom: 1.5rem;
      font-size: 2.2rem;
    }
    p:nth-child(2) {
      color: ${props => props.theme.Gray};
      font-size: 1.8rem;
    }
  }
`;
