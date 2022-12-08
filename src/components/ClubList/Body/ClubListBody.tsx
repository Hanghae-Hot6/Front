import React, {useState, useEffect} from 'react';
// import NavigationButton from '../../../common/NavigationButton';
import * as C from './ClubListBody.style';
// import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import {LocationState, Clubs} from '../../../types/clubList';
import {clubApis} from '../../../api/axiosConfig';
import Thumb from '../../../assets/thumbnail_default.png';
const ClubListBody = () => {
  const {state} = useLocation() as LocationState;
  const [index, setIndex] = useState<number>(0);

  const {data, status} = useQuery(
    ['getClubs'],
    async () => {
      const response = await clubApis.getClubs();
      return response.data.data;
    },
    {
      onError: error => {},
    },
  );

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
  // console.log(data);

  // 성공
  const N = 3;
  const categoryTap = categoryArray.map((category, index) => {
    const categoryFilter = data?.filter(
      (club: Clubs) => club.category === category,
    );
    const categoryPop = categoryFilter?.slice(0, 3);

    if (status === 'success') {
      return {
        id: index,
        title: category,
        content:
          categoryPop?.length > 0 &&
          categoryPop?.map((club: Clubs, id: number) => {
            return (
              <div key={club.clubId}>
                {/* 인기 TOP3 */}
                <Link to={`/club_detail/${club.clubId}`}>
                  <C.PopContentBox>
                    <C.ImgWrap>
                      <span>{id + 1}</span>
                      {club.thumbnail === null ? (
                        <img src={Thumb} alt="클럽 썸네일 이미지" />
                      ) : (
                        <img src={club.thumbnail} alt="클럽 썸네일 이미지" />
                      )}
                    </C.ImgWrap>
                    <C.CategoryTitle color="#5200FF">
                      {club.clubName}
                    </C.CategoryTitle>
                    <C.Summary>{club.summary}</C.Summary>
                  </C.PopContentBox>
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
                      {club.thumbnail === null ? (
                        <img src={Thumb} alt="클럽 썸네일 이미지" />
                      ) : (
                        <img src={club.thumbnail} alt="클럽 썸네일 이미지" />
                      )}
                    </C.MainImgWrap>
                    <C.MainTitleWrap>
                      <C.CategoryTitle color="#5200FF">
                        {club.clubName}
                      </C.CategoryTitle>
                      {/* <C.Summary>{club.summary}</C.Summary> */}
                      <C.Location>장소 : {club.location}</C.Location>
                      <C.Time>
                        {club.startDate} ~ {club.finishDate}
                      </C.Time>
                      <C.People>최대인원 : {club.memberLimit}명</C.People>
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

  // 로딩스피너

  if (status === 'loading') {
    return <div>Loading...</div>;
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
