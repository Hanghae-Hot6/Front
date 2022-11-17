import React, {useEffect, useState} from 'react';
import NavigationButton from '../../common/NavigationButton';
import {getAccessToken, getUserId} from '../../utils';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const accessToken = getAccessToken();
  const userId = getUserId();
  const [isLogin, setIsLogin] = useState(false);
  // accessToken이 존재하면 Login 상태
  const location = useLocation();

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <StHeaderSection>
        <StLogo>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </StLogo>
        <StInputDiv>
          <input type="text" />
        </StInputDiv>
        <StNavBtnsDiv>
          {isLogin ? (
            <>
              <NavigationButton
                path={`/login`}
                onClickCallback={() => {
                  localStorage.removeItem('Authorization');
                  localStorage.removeItem('userId');
                }}>
                로그아웃
              </NavigationButton>
              <NavigationButton path={`/profile/${userId}`}>
                마이페이지
              </NavigationButton>
              <NavigationButton path={`/create_club`}>
                모임개설
              </NavigationButton>
            </>
          ) : (
            <>
              <NavigationButton path="/login">로그인</NavigationButton>
              <NavigationButton path="/sign">회원가입</NavigationButton>
            </>
          )}
        </StNavBtnsDiv>
      </StHeaderSection>
    </>
  );
};
export default Header;

const StHeaderSection = styled.section`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  display: flex;
  width: 1280px;
  margin: 0 auto;
  height: 9rem;
  align-items: center;
  img {
    transform: scale(0.95);
  }
`;

const StLogo = styled.div`
  display: flex;
  justify-content: start;
  width: 33%;
`;
const StInputDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
`;
const StNavBtnsDiv = styled.div`
  width: 33%;
  display: flex;
  justify-content: end;

  button {
    color: black;
    font-weight: 600;
    background-color: #fff;
    font-size: 20px;
    height: 4.5rem;
    width: 13.4rem;
  }
  button:nth-child(3) {
    color: white;
    font-weight: 600;
    background-color: black;
    font-size: 16px;
    height: 4.5rem;
    width: 13.4rem;
  }
`;
