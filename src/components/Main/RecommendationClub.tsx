import React from 'react';
import styled from 'styled-components';
import quota_circle from '../../assets/quota_circle.svg';
import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import {RecommendationClubType} from '../../types/clubList';
import {clubApis} from '../../api/axiosConfig';

const RecommendationClub = () => {
  // 데이터 빼주기
  const {data} = useQuery(['getClubsTop5'], async () => {
    const response = await clubApis.getClubsTop5();
    return response.data.data;
  });

  // 데이터 없을 때 예외처리
  if (data && data.length === 0) {
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
              <a href="#">
                <span>1</span>
                <img src={undefined} alt="popImage1" />
                <p>
                  <span className="title">title</span>

                  <span className="summary">작가</span>

                  <span className="memberLimit">조회수 100회</span>
                </p>
              </a>
            </List>
            <List>
              <a href="#">
                <span>2</span>
                <img src={undefined} alt="popImage2" />
                <p>
                  <span className="title">title</span>

                  <span className="summary">작가</span>

                  <span className="memberLimit">조회수 100회</span>
                </p>
              </a>
            </List>
            <List>
              <a href="#">
                <span>3</span>
                <img src={undefined} alt="popImage3" />
                <p>
                  <span className="title">title</span>

                  <span className="summary">작가</span>

                  <span className="memberLimit">조회수 100회</span>
                </p>
              </a>
            </List>
            <List>
              <a href="#">
                <span>4</span>
                <img src={undefined} alt="popImage4" />
                <p>
                  <span className="title">title</span>

                  <span className="summary">작가</span>

                  <span className="memberLimit">조회수 100회</span>
                </p>
              </a>
            </List>
            <List>
              <a href="#">
                <span>5</span>
                <img src={undefined} alt="popImage5" />
                <p>
                  <span className="title">title</span>

                  <span className="summary">작가</span>

                  <span className="memberLimit">조회수 100회</span>
                </p>
              </a>
            </List>
          </ListWrap>
        </div>
      </RecommendationWrap>
    );
  }

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
          {data &&
            data.map((item: RecommendationClubType, index: number) => {
              return (
                <List key={index}>
                  <Link to={`/club_detail/${item.clubId}`}>
                    <span>{index + 1}</span>
                    <img src={item.thumbnail} alt={item.thumbnail} />
                    <p>
                      <span className="title">{item.clubName}</span>
                      <span className="summary">{item.summary}</span>
                      <span className="visitNum">조회수 {item.visitNum}</span>
                    </p>
                  </Link>
                </List>
              );
            })}
        </ListWrap>
      </div>
    </RecommendationWrap>
  );
};

export default RecommendationClub;
const RecommendationWrap = styled.div`
  margin-top: 11rem;
  > div {
    @media screen and (max-width: 576px) {
      overflow-y: hidden;
      overflow-x: scroll;
      -ms-overflow-style: none;
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
const TitleWrap = styled.div`
  h3 {
    font-weight: 700;
    font-size: 2.8rem;
    margin-bottom: 1.2rem;
    span {
      color: ${props => props.theme.MainColor};
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
  @media screen and (max-width: 576px) {
    width: 1000px;
  }
`;
const List = styled.li`
  width: 24.8rem;
  height: 36.4rem;
  border: 1px solid ${props => props.theme.MainColor};
  background: #f5f4fb;
  position: relative;
  cursor: pointer;
  > a {
    > span {
      color: #fff;
      position: absolute;
      z-index: 10;
      font-weight: 700;
      font-size: 24px;
      margin-left: 12px;
      margin-top: 8px;
    }
    > img {
      width: 100%;
      height: 24.8rem;
      object-fit: cover;
      object-position: top;
    }
    > p {
      position: absolute;
      bottom: -1rem;
      margin-left: 1.5rem;
      margin-right: 1rem;
      height: 11.6rem;
      line-height: 1.5;
    }
    > p > span {
    }
    > p > .title {
      font-size: 2.2rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    > p > .summary {
      height: 4.2rem;
      font-size: 1.4rem;
      font-weight: 400;
      color: #767676;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    > p > .visitNum {
      color: ${props => props.theme.MainColor};
      font-size: 1.4rem;
      font-weight: 400;
    }
  }

  ::after {
    display: block;
    content: '';
    width: 55px;
    height: 55px;
    position: absolute;
    left: 0;
    top: 0;
    background: url(${quota_circle}) no-repeat 0px 0px;
  }
`;
