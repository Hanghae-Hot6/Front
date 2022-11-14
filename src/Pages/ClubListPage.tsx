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

  useEffect(() => {
    setIndex(state);
  }, [state]);

  // 배열안에 key , value를 map 하는 방법
  // 모임 없을때 조건문
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

  // [], [sdfsd]

  const categoryTap2 = categoryArray.map((category, index) => {
    const yes = data?.filter((club: clubs) => club.category === category);

    if (status === 'success') {
      return {
        id: index,
        title: category,
        // content: data?.filter((club: clubs) => club.category === category),
        content:
          yes.length > 0 ? (
            yes.map((club: clubs) => {
              /** category에 값이 있을때 map 돌리고 없으면 없다고 출력 */
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
  });

  // console.log(data);

  // const categoryTap = [
  //   {
  //     id: 0,
  //     title: '인문',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '인문')
  //       .map((club: clubs) => {
  //         /** category에 값이 있을때 map 돌리고 없으면 없다고 출력 */
  //         return club.category === '인문' ? (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         ) : (
  //           <div>모임이 없습니다</div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 1,
  //     title: '경영 경제',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '경영 경제')
  //       .map((club: clubs) => {
  //         return club.category === '경영 경제' ? (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         ) : (
  //           <div>모임이 없습니다</div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 2,
  //     title: '자기계발',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '자기계발')
  //       .map((club: clubs) => {
  //         return (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 3,
  //     title: '예술',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '예술')
  //       .map((club: clubs) => {
  //         return (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 4,
  //     title: '자연과학',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '자연과학')
  //       .map((club: clubs) => {
  //         return (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 5,
  //     title: '사회정치',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '사회정치')
  //       .map((club: clubs) => {
  //         return (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 6,
  //     title: 'IT 모바일',
  //     content: data
  //       ?.filter((club: clubs) => club.category === 'IT 모바일')
  //       .map((club: clubs) => {
  //         return (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 7,
  //     title: '소설',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '소설')
  //       .map((club: clubs) => {
  //         return (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>
  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         );
  //       }),
  //   },
  //   {
  //     id: 8,
  //     title: '에세이 시',
  //     content: data
  //       ?.filter((club: clubs) => club.category === '에세이 시')
  //       .map((club: clubs) => {
  //         return (
  //           <div key={club.id}>
  //             <h2>{club.clubName}</h2>

  //             <p>{club.summary}</p>
  //             <img src={club.thumbnail} alt={club.summary} />
  //           </div>
  //         );
  //       }),
  //   },
  // ];

  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Layout>
        <Container>
          <TabList>
            <section>
              <article>
                <ul>
                  {/* {categoryTap?.map(item => (
                    <li
                      key={item.id}
                      onClick={() => setIndex(item.id)}
                      className={index === item.id ? 'on' : undefined}>
                      {item.title}
                    </li>
                  ))} */}
                </ul>
              </article>
              {/* {categoryTap
                .filter(item => index === item.id)
                .map(item => {
                  return (
                    <>
                      <div key={item.id}>{item.content}</div>
                    </>
                  );
                })} */}
              {categoryTap2.length > 0 &&
                categoryTap2.map((item, index) => {
                  // console.log(val);
                  return (
                    <>
                      <div key={item?.id}>{item?.content}</div>
                    </>
                  );
                })}
            </section>
          </TabList>
          {/* <ClubListTitle /> */}
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
