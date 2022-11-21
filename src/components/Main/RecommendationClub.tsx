import React from 'react';
import styled from 'styled-components';
import quota_circle from '../../assets/quota_circle.svg';
import pop1 from '../../assets/pop1.svg';
import pop2 from '../../assets/pop2.svg';
import pop3 from '../../assets/pop3.svg';
import pop4 from '../../assets/pop4.svg';
import pop5 from '../../assets/pop5.svg';
import {useQuery} from 'react-query';
import axios from 'axios';
const RecommendationClub = () => {
  // const {data, status} = useQuery(['getClubsTop5'], async () => {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_BASE_URL}/clubs/top5`,
  //   );
  //   return response;
  // });

  // console.log(data);

  return (
    <RecommendationWrap>
      <TitleWrap>
        <h3>
          인기 모임 <span>TOP5</span>
        </h3>
        <p>회원님들이 선정한 인기 독서 모임이에요!</p>
      </TitleWrap>
      <div>
        <ListWrap>
          <List>
            <span>1</span>
            <img src={pop1} alt="" />
            <p>
              <span className="title">title</span>
              <br />
              <span className="author">작가</span>
              <br />
              <span className="hits">조회수 100회</span>
            </p>
          </List>
          <List>
            <span>2</span>
            <img src={pop2} alt="" />
            <p>
              <span className="title">title</span>
              <br />
              <span className="author">작가</span>
              <br />
              <span className="hits">조회수 100회</span>
            </p>
          </List>
          <List>
            <span>3</span>
            <img src={pop3} alt="" />
            <p>
              <span className="title">title</span>
              <br />
              <span className="author">작가</span>
              <br />
              <span className="hits">조회수 100회</span>
            </p>
          </List>
          <List>
            <span>4</span>
            <img src={pop4} alt="" />
            <p>
              <span className="title">title</span>
              <br />
              <span className="author">작가</span>
              <br />
              <span className="hits">조회수 100회</span>
            </p>
          </List>
          <List>
            <span>5</span>
            <img src={pop5} alt="" />
            <p>
              <span className="title">title</span>
              <br />
              <span className="author">작가</span>
              <br />
              <span className="hits">조회수 100회</span>
            </p>
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
  height: 36.4rem;
  border: 1px solid #5200ff;
  background: #f5f4fb;
  position: relative;
  cursor: pointer;
  > span {
    color: #fff;
    position: absolute;
    z-index: 10;
    font-weight: 700;
    font-size: 2.4rem;
    margin-left: 1.2rem;
    margin-top: 0.8rem;
  }
  > img {
    width: 24.8rem;
    height: 24.8rem;
  }
  > p {
    position: absolute;
    bottom: -1.2rem;
    margin-left: 1.8rem;
    height: 11.6rem;
    line-height: 1.5;
  }
  > p > span {
    padding-top: 0.5rem;
  }
  > p > .title {
    font-size: 2.2rem;
    font-weight: 600;
  }
  > p > .author {
    font-size: 1.8rem;
    font-weight: 400;
    color: #767676;
  }
  > p > .hits {
    color: #5200ff;
    font-size: 1.8rem;
    font-weight: 400;
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
