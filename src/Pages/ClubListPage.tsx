import React, {useState} from 'react';
import ClubListBody from '../components/ClubList/Body/ClubListBody';
import ClubListTitle from '../components/ClubList/Title/ClubListTitle';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import axios from 'axios';
import {useEffect} from 'react';

type clubs = {
  id: string;
  thumbnail: string;
  clubName: string;
  memberId: string;
  category: string;
  summary: string;
  memberLimit: number;
};
const ClubListPage = () => {
  // const queryClient = useQueryClient();
  const location = useLocation();
  const {state} = location;
  const {data, status, isLoading} = useQuery(['getClubs'], async () => {
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
    '소설',
    '에세이 시',
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
                <div key={club.id}>
                  <h2>{club.clubName}</h2>
                  <p>{club.summary}</p>
                  <img src={club.thumbnail} alt={club.summary} />
                </div>
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
      <Layout>
        <Container>
          <TabList>
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
                    <div>정보가 없습니다.</div>
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
                <div>데이터가 없습니다.</div>
              )}
            </section>
          </TabList>
          <ClubListBody />
        </Container>
      </Layout>
    </>
  );
};
export default ClubListPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  /* width: 100vw; */
  height: 100vh;
  margin: auto;
`;

export const TabList = styled.div`
  position: static;
  width: 100%;
  background-color: rgba(255, 255, 255);
  section {
    article {
      ul {
        display: flex;
        position: relative;
        width: 100%;
        height: 42px;
        cursor: pointer;
        .on {
          border: 1px solid #503396;
          border-bottom: 0;
          color: #503396;
        }
        li {
          height: 42px;
          border-top: 1px solid #ebebeb;
          border-right: 1px solid #ebebeb;
          border-bottom: 1px solid #503396;
          width: 25%;
          color: #333;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
`;
