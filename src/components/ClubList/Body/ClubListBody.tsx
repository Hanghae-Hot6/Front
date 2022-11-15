import React, {useState} from 'react';
// import NavigationButton from '../../../common/NavigationButton';
import * as C from './ClubListBody.style';
// import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import axios from 'axios';
import {useEffect} from 'react';

type clubs = {
  id: string | number;
  thumbnail: string;
  clubName: string;
  memberId: string;
  category: string;
  summary: string;
  memberLimit: number;
};
const ClubListBody = () => {
  const location = useLocation();
  const {state} = location;
  const {data, status} = useQuery(['getClubs'], async () => {
    const response = await axios.get('http://43.201.69.50:8080/clubs');
    return response.data.data;
  });

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setIndex(state);
  }, [state]);

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

  const categoryTap = categoryArray.map((category, index) => {
    const categoryFilter = data?.filter(
      (club: clubs) => club.category === category,
    );

    if (status === 'success') {
      return {
        id: index,
        title: category,
        content:
          categoryFilter.length > 0 ? (
            categoryFilter.map((club: clubs) => {
              return (
                <Link to={`/club_detail/${club.id}`}>
                  <div key={club.id}>
                    <h2>{club.clubName}</h2>
                    <p>{club.summary}</p>
                    <img src={club.thumbnail} alt={club.summary} />
                  </div>
                </Link>
              );
            })
          ) : (
            <div>모임이 없습니다</div>
          ),
      };
    }
    return {
      id: index,
      title: category,
    };
  });

  return (
    <>
      <C.TabList>
        <section>
          <article>
            <ul>
              {status === 'success' ? (
                categoryTap.length > 0 &&
                categoryTap.map(item => (
                  <li
                    key={item.id}
                    onClick={() => setIndex(item.id)}
                    className={index === item.id ? 'on' : undefined}>
                    {item.title}
                  </li>
                ))
              ) : (
                <div>타이틀이 없습니다.</div>
              )}
            </ul>
          </article>
          {status === 'success' ? (
            categoryTap.length > 0 &&
            categoryTap
              .filter(item => index === item.id)
              .map(item => {
                return (
                  <>
                    <div key={item.id}>{item?.content}</div>
                  </>
                );
              })
          ) : (
            <div>정보가 없습니다.</div>
          )}
        </section>
      </C.TabList>
      {/* <C.ToCreateClubButton path="/create_club">TOP</C.ToCreateClubButton> */}
      {/* <C.ToCreateClubButton path="/create_club">TOP</C.ToCreateClubButton> */}
    </>
  );
};
export default ClubListBody;
