import React, {useEffect} from 'react';
import * as C from './ClubDetailBody.style';
import {useQuery, useMutation} from 'react-query';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import heartOn from '../../assets/heartOn.svg';
import heartOff from '../../assets/heartOff.svg';
import {clubDetailType} from '../../types/clubList';
import {clubApis} from '../../api/axiosConfig';
import {getUserId} from '../../utils';
import Review from './Review';

const ClubDetailBody = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const userId = getUserId();
  // 화면에 클럽정보 뿌려주는api
  const {data, status} = useQuery<clubDetailType | undefined>(
    ['getClubDetail', id],
    async ({queryKey}: any) => {
      const response = await clubApis.getClubDetail(queryKey[1]);
      return response.data.data;
    },
    {
      retry: 0,
      onSuccess() {},
      onError: (error: any) => {
        // 로그인 에러 남바 : 403 or 401
        if (error.response.status === 403) {
          alert('로그인이 필요합니다.');
          navigate('/Login');
        }
        if (error.response.status === 404) {
          navigate('*');
        }
        if (error.response.status === 400) {
          navigate('*');
        }
      },
    },
  );

  useEffect(() => {
    if (localStorage.length === 0) {
      alert('로그인이 필요합니다.');
      navigate('/Login');
    }
  }, []);

  //모임 가입하기 api
  const {mutate: signUpClub} = useMutation(
    async (id: any) => {
      const response = await clubApis.joinClub(id);
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
    async (id: any) => {
      const response = await clubApis.interestClub(id);
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
    async (id: any) => {
      const response = await clubApis.delClub(id);
      return response.data.data;
    },

    {
      onSuccess: data => {
        alert('탈퇴되었습니다.');
      },
      onError: error => {
        console.log('클럽 탈퇴 에러', error);
      },
    },
  );

  // 클럽 탈퇴하기 함수
  const delClubBtn = (id: any) => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      delClub(id);
    } else {
      alert('취소되었습니다.');
    }
  };

  // 로딩스피너 도입하기
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <>
      {data && (
        <>
          <C.MainContent>
            <div>
              <C.ImageWrap>
                <img src={data.thumbnail} alt="클럽 썸네일 이미지" />
              </C.ImageWrap>
            </div>

            <C.MainWrap>
              <C.TitleWrap>
                <h3>{data.category}</h3>
                <h2>{data.clubName}</h2>
                <p>{data.clubIntro}</p>
              </C.TitleWrap>
              <C.ClubInfoWrap>
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
              </C.ClubInfoWrap>

              <C.ClubJoin>
                {data.interest ? (
                  <C.InterestBtn onClick={() => interestClub(id)}>
                    <img src={heartOn} alt="관심모임등록" />
                  </C.InterestBtn>
                ) : (
                  <C.InterestBtn onClick={() => interestClub(id)}>
                    <img src={heartOff} alt="관심모임해제" />
                  </C.InterestBtn>
                )}
                {data.subscription ? (
                  <>
                    <C.Btn style={{borderRight: 'none', cursor: 'default'}}>
                      참석중
                    </C.Btn>
                    {userId === data.leader ? (
                      <C.Btn
                        onClick={() => {
                          navigate(`/fix_club/${id}`);
                        }}>
                        수정하기
                      </C.Btn>
                    ) : (
                      <C.Btn
                        onClick={() => {
                          delClubBtn(id);
                        }}>
                        탈퇴하기
                      </C.Btn>
                    )}
                  </>
                ) : (
                  <C.JoinBtn onClick={() => signUpClub(id)}>참석하기</C.JoinBtn>
                )}
              </C.ClubJoin>
            </C.MainWrap>
          </C.MainContent>
          <C.Main>
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
                  {data.bookLink1 === '책을 선택하세요' ? null : (
                    <a href={data.bookLink1} target="blank">
                      <img src={data.bookImage1} alt={data.bookName1} />
                    </a>
                  )}

                  {data.bookLink2 === '책을 선택하세요' ? null : (
                    <a href={data.bookLink2} target="blank">
                      <img src={data.bookImage2} alt={data.bookName2} />
                    </a>
                  )}
                  {data.bookLink3 === '책을 선택하세요' ? null : (
                    <a href={data.bookLink3} target="blank">
                      <img src={data.bookImage3} alt={data.bookName2} />
                    </a>
                  )}
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

            <Review subscription={data.subscription} />
          </C.Main>
        </>
      )}
    </>
  );
};

export default ClubDetailBody;
