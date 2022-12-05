import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {memberApis} from '../../api/axiosConfig';
import profileImg from '../../assets/profileImg.svg';
import hamburgSignLogo from '../../assets/hamburgSignLogo.svg';
import CaretLeft from '../../assets/CaretLeft.svg';
import MagnifyingGlassBlack from '../../assets/MagnifyingGlassBlack.svg';
import {useNavigate} from 'react-router-dom';
import {getAccessToken} from '../../utils';
import {Div} from '../CreateClub_FixClub/ImageInput/ImagePreview/ImagePreview.style';
import HeaderSearch from './HeaderSearch';
import {ClubSearchType} from '../../types/bookSearch';
import axios from 'axios';
import HeaderSearchBooks from './HeaderSearchBooks';
import HeaderSliderSearchBooks from './HeaderSliderSearchBooks';

type HamburgTypes = {
  on: boolean;
  isLogin: boolean;
  userId: string | null;
  setOn: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

function HeaderHamburgSlider({
  on,
  isLogin,
  userId,
  setOn,
  setIsLogin,
}: HamburgTypes) {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const fetch = async ({queryKey}: any) => {
    if (input) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/clubs/search?clubName=${queryKey[1]}&page=1&size=18`,
      );

      return response?.data.data;
    }
  };

  const {
    data: getBooksData,
    status,
    isLoading,
    error,
  } = useQuery<ClubSearchType[]>(['getBooks', input], fetch);

  const {
    data: profileData,
    // isLoading,
    // error,
  } = useQuery(
    ['getProfile', userId],
    async () => {
      try {
        const {data} = await memberApis.myPageInfo();
        return data;
      } catch (error: any) {
        // if (error.status === 404){
        // } console.log(error);
      }
    },
    {
      onSuccess: data => {},
      onError: error => {
        throw error;
      },
    },
  );

  let endNum: number;
  let divideBy: number;

  let NewArray: ClubSearchType[][] = [];
  if (status === 'success') {
    if (getBooksData) {
      divideBy = 3;
      endNum = Math.ceil(getBooksData.length / 3);
      let NewPushArray = [];
      for (let i = 0; i < endNum; i++) {
        for (let k = 0; k < 3; k++) {
          NewPushArray.push(getBooksData[k + 3 * i]);
        }
        NewArray.push(NewPushArray);
        NewPushArray = [];
      }
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const {value} = e.target;
    // setShowBookSearchBar(true);
    setInput(value);
    console.log(input);
  };
  return (
    <>
      <StSliderContainer>
        <StSliderHeader>
          <img src={CaretLeft} alt="" onClick={() => setOn(false)} />
          {!isSearch && (
            <input
              type="text"
              id="search-input"
              placeholder="찾으실 모임을 입력해주세요."
              onChange={handleChange}
              value={input}
            />
          )}
          <img
            src={MagnifyingGlassBlack}
            alt="MagnifyingGlassBlack"
            onClick={() => setIsSearch(!isSearch)}
          />
        </StSliderHeader>

        <StSliderBody>
          {isSearch && (
            <>
              <SliderProfileDiv>
                <img src={profileImg} alt={profileImg} />
                {isLogin ? (
                  <div>
                    <p>{profileData?.data.username}</p>
                    <p>{profileData?.data.memberId}</p>
                  </div>
                ) : (
                  <div>
                    <p>로그인이 필요합니다.</p>
                  </div>
                )}
              </SliderProfileDiv>
              {isLogin ? (
                <StSliderBtn
                  isLogin={isLogin}
                  onClick={() => {
                    navigate(`/create_club`);
                  }}>
                  모임개설
                </StSliderBtn>
              ) : (
                <StSliderBtn isLogin={isLogin} disabled={true}>
                  모임개설
                </StSliderBtn>
              )}
            </>
          )}

          {!isSearch && (
            <>
              <HeaderSliderSearchBooks
                data={NewArray}
                // width={30.3}
                // height={40}
              />
            </>
          )}
        </StSliderBody>
        <StSliderBotDiv>
          <button
            onClick={() => {
              if (isLogin) {
                localStorage.removeItem('Authorization');
                localStorage.removeItem('userId');
                localStorage.removeItem('Refresh-Token');
                setOn(false);
                navigate('/');
              } else {
                navigate('/login');
              }
            }}>
            <img src={hamburgSignLogo} alt="hamburgSignLogo" />

            {isLogin ? '로그아웃' : '로그인'}
          </button>
        </StSliderBotDiv>
      </StSliderContainer>
    </>
  );
}

export default HeaderHamburgSlider;

const StSliderContainer = styled.section`
  display: none;
  @media screen and (max-width: 576px) {
    display: block;
    position: absolute;
    z-index: 13;
    width: 100%;
    background-color: #fff;
    top: 0;
    height: 70rem;
  }
`;

const StSliderHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7rem;
  background-color: pink;
  border-bottom: 1px solid ${props => props.theme.LightGray};
  padding: 0 1rem;
`;

const StSliderBody = styled.div`
  width: 100%;
  height: 73rem;
  background-color: #fff;
  padding: 2rem;
`;

const SliderProfileDiv = styled.div`
  display: flex;
  width: 100%;
  height: 12rem;
  border: 0;
  img {
    display: block;
    height: 100%;
    width: 12rem;
  }
  div {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 40rem;
    justify-content: center;
    padding-left: 2rem;

    p:nth-child(1) {
      font-size: 1.8rem;
      width: 25rem;
      font-weight: bold;
    }
    p:nth-child(2) {
      width: 25rem;
      font-size: 1.6rem;
      margin-top: 1rem;
      color: ${props => props.theme.Gray};
    }
  }
`;

const StSliderBtn = styled.button<{isLogin: boolean}>`
  margin-top: 2rem;
  width: 100%;
  height: 7rem;
  font-size: 1.8rem;
  font-weight: bold;
  background-color: ${props =>
    props.isLogin ? 'black' : props.theme.LightGray};
  color: #fff;
  border-radius: 1rem;
`;

const StSliderBotDiv = styled.div`
  border-bottom: 1px solid ${props => props.theme.LightGray};
  button {
    display: flex;

    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 5rem;
    background-color: white;
    border-top: 1px solid ${props => props.theme.LightGray};
    font-size: 1.8rem;
    color: ${props => props.theme.Gray};
  }
`;
