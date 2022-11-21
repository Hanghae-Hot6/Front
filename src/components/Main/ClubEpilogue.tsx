import React from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
const ClubEpilogue = () => {
  return (
    <ClubEpilogueWrap>
      <TitleWrap>
        <h3>
          저번주 진행된 독서 모임! <span>후기는 어땠을까요?</span>
        </h3>
        <p>진행되었던 독서 모임! 회원님들은 이런 후기를 남겼어요!</p>
      </TitleWrap>
      <div>
        <Carousel />
      </div>
    </ClubEpilogueWrap>
  );
};

export default ClubEpilogue;
const ClubEpilogueWrap = styled.div`
  margin-top: 15rem;
`;

const TitleWrap = styled.div`
  h3 {
    font-weight: 700;
    font-size: 2.8rem;
    margin-bottom: 1.2rem;
    span {
      color: #5200ff;
    }
  }
  p {
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 4.6rem;
  }
`;
