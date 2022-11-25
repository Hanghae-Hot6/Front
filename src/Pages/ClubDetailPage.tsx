import React from 'react';
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import {getAccessToken} from '../utils';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import heartOn from '../assets/heartOn.svg';
import heartOff from '../assets/heartOff.svg';
import {clubDetailType} from '../types/clubList';
// type ClubDetailProps = {};

const ClubDetail = () => {
  // , status, isLoading 추후에 쓰임
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const {id} = useParams();

  // 화면에 클럽정보 뿌려주는api
  const {data, status} = useQuery<clubDetailType | undefined>(
    ['getClubDetail', accessToken, id],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },
    {
      retry: 0,
      onError: (error: any) => {
        // 로그인 에러 남바 : 403 or 401
        if (error.response.status === 500) {
          return alert('로그인이 필요합니다.'), navigate('/Login');
        }
      },
    },
  );

  //모임 가입하기 api
  const {mutate: signUpClub} = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}/join`,
        id,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },
    {
      onSuccess: data => {
        alert(data);
      },
      onError: error => {
        console.log('모임가입에러', error);
      },
    },
  );

  // 관심 모임 api
  const {mutate: interestClub} = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}/interest`,
        id,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },
    {
      onSuccess: data => {
        alert(data);
      },
      onError: error => {
        console.log('관심 모임 에러', error);
      },
    },
  );

  // 클럽탈퇴하기
  const {mutate: delClub} = useMutation(
    async () => {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}/withdraw`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },

    {
      onSuccess: data => {
        alert('탈퇴 하시겠습니까?');
        // confirm 으로 바꾸기
        alert('탈퇴 완료');
      },
      onError: error => {
        console.log('클럽 탈퇴 에러', error);
      },
    },
  );

  // console.log(status);

  // useEffect(() => {
  //   if (status === 'error') {
  //     return alert('로그인이 필요합니다.'), navigate('/Login');
  //   }
  // });

  // 로딩스피너 도입하기
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        {data && (
          <>
            <MainContent>
              <div>
                <ImageWrap>
                  <img src={data.thumbnail} alt="클럽 썸네일 이미지" />
                </ImageWrap>
              </div>

              <MainWrap>
                <TitleWrap>
                  <h3>{data.category}</h3>
                  <h2>{data.clubName}</h2>
                  <p>{data.clubIntro}</p>
                </TitleWrap>
                <ClubInfoWrap>
                  <p>
                    <span>장소</span>
                    {data.location}
                  </p>
                  <p>
                    <span>날짜</span>
                    {data.period}
                  </p>
                  <p>
                    <span>주최자</span>
                    {data.leader}
                  </p>
                  <p>
                    <span>참석 인원</span>
                    {data.participantNum}
                  </p>
                </ClubInfoWrap>

                <ClubJoin>
                  {data.interest ? (
                    <InterestBtn onClick={() => interestClub()}>
                      <img src={heartOn} alt="관심모임등록" />
                    </InterestBtn>
                  ) : (
                    <InterestBtn onClick={() => interestClub()}>
                      <img src={heartOff} alt="관심모임해제" />
                    </InterestBtn>
                  )}
                  {data.subscription ? (
                    <>
                      <Btn style={{borderRight: 'none', cursor: 'default'}}>
                        참석중
                      </Btn>
                      <Btn
                        onClick={() => {
                          delClub();
                        }}>
                        탈퇴하기
                      </Btn>
                    </>
                  ) : (
                    <JoinBtn onClick={() => signUpClub()}>참석하기</JoinBtn>
                  )}
                </ClubJoin>
              </MainWrap>
            </MainContent>
            <Main>
              <section>
                <h2>
                  <span>{data.bookName1}</span> 베스트 셀러를 읽고 함께 이야기
                  나눠요
                </h2>
                <p>{data.clubSummary}</p>
              </section>
              <section>
                <h2>
                  <span>아래 책들을</span> 읽고 내용을 이해해봐요!
                </h2>

                <div>
                  <div>
                    <a href={data.bookLink1} target="blank">
                      <img src={data.bookImage1} alt={data.bookName1} />
                    </a>
                    <a href={data.bookLink2} target="blank">
                      <img src={data.bookImage2} alt={data.bookName2} />
                    </a>
                    <a href={data.bookLink3} target="blank">
                      <img src={data.bookImage3} alt={data.bookName2} />
                    </a>
                  </div>
                </div>
                <p>{data.bookSummary}</p>
              </section>
              <section>
                <h2>
                  모임의 <span>일정이에요 !</span>
                </h2>
                <textarea readOnly value={data.schedule}>
                  {/* {data.schedule} */}
                </textarea>
              </section>
              <section>
                <h2>
                  모임에 대한 <span>정보가 궁금하신가요?</span>
                </h2>
                <p>
                  <span>날짜</span>
                  {data.period}
                </p>
                <p>
                  <span>주최자</span>
                  {data.leader}
                </p>
                <p>
                  <span>멤버 수</span>
                  {data.participantNum}
                </p>
                <p>
                  <span>장소</span>
                  {data.location}
                </p>
              </section>
            </Main>
          </>
        )}
      </Layout>
    </>
  );
};
export default ClubDetail;

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const MainContent = styled.div`
  display: flex;
  margin-top: 5rem;
  padding-bottom: 9.5rem;
  border-bottom: 1px solid #eee;
`;

export const ImageWrap = styled.div`
  width: 57.3rem;
  height: 56rem;
  background-color: #cacad7;
  display: flex;
  margin-right: 9.2rem;
  overflow: hidden;

  > img {
    display: inline-block;
    margin: 5% auto;
    width: 35rem;
    height: 90%;
    object-fit: cover;
    object-position: top;
  }
`;

export const TitleWrap = styled.div`
  width: 59.2rem;
  border-bottom: 1px solid #dbdbdb;

  > h3 {
    color: gray;
    font-size: 1.8rem;
    margin-bottom: 1.8rem;
  }
  > h2 {
    font-weight: 600;
    font-size: 3rem;
    margin-bottom: 1.8rem;
  }
  > p {
    color: ${props => props.theme.MainColor};
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 30px;
  }
`;

export const ClubInfoWrap = styled.div`
  > p {
    font-size: 1.8rem;
    margin-bottom: 4rem;
    color: ${props => props.theme.Gray};
  }
  > p > span {
    display: inline-block;
    width: 10rem;
    font-weight: 600;
  }
`;

export const ClubJoin = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
`;

export const InterestBtn = styled.button`
  padding: 0;
  width: 6rem;
  height: 6rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Btn = styled.button`
  width: 25.6rem;
  background: #fff;
  border: 1px solid ${props => props.theme.MainColor};
  height: 6rem;
  color: ${props => props.theme.MainColor};
  transition: all 0.5s;
  font-weight: 600;
  box-sizing: border-box;
  :hover {
    color: #fff;
    background-color: ${props => props.theme.MainColor};
    border: 1px solid transparent;
  }
`;

export const JoinBtn = styled.button`
  font-size: 1.8rem;
  font-weight: 600;
  width: 30rem;
  background: #222;
  height: 6rem;
  color: #fff;
`;

export const Main = styled.main`
  margin-top: 6.7rem;

  > section {
    padding-bottom: 5rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 5rem;
    h2 {
      font-weight: 600;
      font-size: 2.4rem;
      margin-bottom: 5rem;
      > span {
        color: ${props => props.theme.MainColor};
      }
    }
    p {
      font-size: 1.8rem;
      > span {
        font-weight: 600;
        width: 10rem;
        display: inline-block;
        margin-bottom: 3rem;
      }
    }
    > div {
      width: 100%;
      height: 42.6rem;
      background-color: ${props => props.theme.LightGray};
      margin-bottom: 5.6rem;
      > div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5rem;
      }
      > div > a > img {
        width: 25.3rem;
        height: 37rem;
        filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
      }
    }
    textarea {
      padding: 0;
      width: 100%;
      min-height: 35rem;
      max-height: 45rem;
      border: none;
      resize: none;
      line-height: 3;
      font-weight: 600;
      font-size: 2rem;
      font-family: 'Pretendard-Regular', sans-serif;
      :focus {
        outline: none;
      }
    }
  }
`;