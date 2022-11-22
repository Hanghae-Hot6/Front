import React, {useState, useEffect} from 'react';
// import NavigationButton from '../../../common/NavigationButton';
import * as C from './ClubListBody.style';
// import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import axios from 'axios';
import {CategoryTop} from './ClubListBody.style';

type Clubs = {
  id: string | number;
  thumbnail: string;
  clubName: string;
  memberId: string;
  category: string;
  summary: string;
  memberLimit: number;
  clubId: number;
};

type LocationState = {
  pathname: string;
  state: number | null;
  key: string | undefined;
};
const ClubListBody = () => {
  const {state} = useLocation() as LocationState;
  const {data, status} = useQuery(['getClubs'], async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/clubs`);
    return response.data.data;
  });

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (state === null) setIndex(index);
    else {
      setIndex(state);
    }
  }, []);

  // useEffect(() => {
  //   setIndex(state);
  // }, [state]);

  const categoryArray = [
    '인문',
    '경영 경제',
    '자기계발',
    '예술',
    '자연과학',
    '사회정치',
    'IT 모바일',
    // '소설',
    // '에세이 시',
  ];

  // 성공
  const categoryTap = categoryArray.map((category, index) => {
    const categoryFilter = data?.filter(
      (club: Clubs) => club.category === category,
    );
    if (status === 'success') {
      return {
        id: index,
        title: category,
        content:
          categoryFilter.length > 0 &&
          categoryFilter.map((club: Clubs, id: number) => {
            return (
              <div key={club.clubId}>
                {/* 인기 TOP3 */}
                <Link to={`/club_detail/${club.clubId}`}>
                  <div>
                    <C.ImgWrap>
                      <span>{id + 1}</span>
                      <img src={club.thumbnail} alt={club.summary} />
                    </C.ImgWrap>
                    <C.CategoryTitle color="#5200FF">
                      {club.clubName}
                    </C.CategoryTitle>
                    <C.Summary>{club.summary}</C.Summary>
                  </div>
                </Link>
              </div>
            );
          }),
        main:
          categoryFilter.length > 0 &&
          categoryFilter.map((club: Clubs) => {
            return (
              <div key={club.clubId}>
                {/* 전체모임조회 */}
                <Link to={`/club_detail/${club.clubId}`}>
                  <C.MainContentBox>
                    <C.MainImgWrap>
                      <img src={club.thumbnail} alt={club.summary} />
                    </C.MainImgWrap>
                    <C.MainTitleWrap>
                      <C.CategoryTitle color="#5200FF">
                        {club.clubName}
                      </C.CategoryTitle>
                      {/* <C.Summary>{club.summary}</C.Summary> */}
                      <C.Location>장소</C.Location>
                      <C.Time>11/30(수) 10:30-12:30</C.Time>
                      <C.People>현재인원/{club.memberLimit} 모집중</C.People>
                    </C.MainTitleWrap>
                  </C.MainContentBox>
                </Link>
              </div>
            );
          }),
      };
    }
    return {
      id: index,
      title: category,
    };
  });

  // 로딩

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // 에러

  if (status === 'error') {
    return <div>개설된 모임이 없습니다...</div>;
  }

  return (
    <>
      <C.TabList>
        <section>
          <article>
            <ul>
              {categoryTap.map(item => (
                <li
                  key={item.id}
                  onClick={() => setIndex(item.id)}
                  className={index === item.id ? 'on' : undefined}>
                  {item.title}
                </li>
              ))}
            </ul>
          </article>
        </section>
        {categoryTap.length > 0 &&
          categoryTap
            .filter(item => index === item.id)
            .map(item => {
              return (
                <C.ContentWrap key={item.id}>
                  <C.CategoryTitle color="#5200FF">
                    이번주 <span>{item.title} 인기 독서 모임</span>
                    <p>회원님들이 선정한 인기 독서 모임!</p>
                  </C.CategoryTitle>
                  {item.content ? (
                    <div>
                      <C.CategoryTop>{item?.content}</C.CategoryTop>
                      <C.MainContentWrap>
                        <C.CategoryTitle color="#5200FF">
                          {item.title}에 대해 토론해봐요!
                          <C.Summary>
                            {item.title}독서 모임! 유저들은 이런 후기를
                            남겼어요!
                          </C.Summary>
                        </C.CategoryTitle>
                        <C.MainContent>{item.main}</C.MainContent>
                      </C.MainContentWrap>
                    </div>
                  ) : (
                    <C.NullClubWrap>
                      아직 개설된 모임이 없습니다!
                    </C.NullClubWrap>
                  )}
                </C.ContentWrap>
              );
            })}
      </C.TabList>
    </>
  );
};
export default ClubListBody;
