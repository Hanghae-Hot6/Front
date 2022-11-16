import React from 'react';
import styled from 'styled-components';
import quota_circle from '../../assets/quota_circle.svg';
const RecommendationClub = () => {
  return (
    <RecommendationWrap>
      <TitleWrap>
        <h3>
          이번주 인기 모임 <span>TOP5</span>
        </h3>
        <p>11월 3주차 회원들이 꼽은 인기 독서 모임이예요!</p>
      </TitleWrap>
      <div>
        <ListWrap>
          <List>
            <span>1</span>
          </List>
          <List>
            <span>2</span>
          </List>
          <List>
            <span>3</span>
          </List>
          <List>
            <span>4</span>
          </List>
          <List>
            <span>5</span>
          </List>
        </ListWrap>
      </div>
    </RecommendationWrap>
  );
};

export default RecommendationClub;
const RecommendationWrap = styled.div`
  margin-top: 11rem;
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
const ListWrap = styled.ul`
  display: flex;
  gap: 1.6rem;
`;
const List = styled.li`
  width: 24.8rem;
  height: 24.8rem;
  background: #f1f1f5;
  position: relative;
  cursor: pointer;
  span {
    color: #fff;
    position: absolute;
    z-index: 10;
    font-weight: 700;
    font-size: 2.4rem;
    margin-left: 1.2rem;
    margin-top: 0.8rem;
  }
  ::after {
    display: block;
    content: '';
    width: 5.5rem;
    height: 5.5rem;
    position: absolute;
    left: 0;
    top: 0;
    background: url(${quota_circle}) no-repeat 0px 0px;
  }
`;
