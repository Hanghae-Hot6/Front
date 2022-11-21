import React, {useState} from 'react';
// import NavigationButton from '../../../common/NavigationButton';
import * as C from './ClubListBody.style';
// import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import axios from 'axios';
import {useEffect} from 'react';

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
  console.log(status);

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
          categoryFilter.map((club: Clubs) => {
            return (
              <Link to={`/club_detail/${club.clubId}`} key={club.clubId}>
                <div>
                  <h2>{club.clubName}</h2>
                  <p>{club.summary}</p>
                  <img src={club.thumbnail} alt={club.summary} />
                </div>
              </Link>
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
                <C.ContentWrap key={item.id}>{item?.content}</C.ContentWrap>
              );
            })}
      </C.TabList>
      {/* <C.ToCreateClubButton path="/create_club">TOP</C.ToCreateClubButton> */}
      {/* <C.ToCreateClubButton path="/create_club">TOP</C.ToCreateClubButton> */}
    </>
  );
};
export default ClubListBody;
