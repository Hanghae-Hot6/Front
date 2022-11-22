import React, {useEffect, useState} from 'react';
import NavigationButton from '../../common/NavigationButton';
import {getAccessToken, getUserId} from '../../utils';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import MagnifyingGlass from '../../assets/MagnifyingGlass.svg';
import HeaderSearch from './HeaderSearch';
type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const accessToken = getAccessToken();
  const userId = getUserId();
  console.log(userId);
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
        <HeaderSearch />
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
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 1280px;
  margin: 0 auto;
  height: 9rem;
  justify-content: space-between;
  z-index: 10;
  img {
    transform: scale(0.95);
  }
`;

const StLogo = styled.div`
  display: flex;
  justify-content: start;
  width: 33%;
`;
// const StInputDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 33%;
//   position: relative;
//   img {
//     position: absolute;
//     left: 1.5rem;
//   }
//   input {
//     background: #ffffff;
//     border: 1px solid #5200ff;
//     box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
//     border-radius: 26px;
//     height: 4.8rem;
//     width: 42.5rem;
//     font-size: 1.8rem;
//     padding-left: 5rem;
//     :focus {
//       border-color: #5200ff;
//       outline: none;
//     }
//   }
// `;
const StNavBtnsDiv = styled.div`
  width: 33%;
  display: flex;
  justify-content: end;

  button {
    color: black;
    font-weight: 600;
    background-color: #fff;
    font-size: 16px;
    height: 4rem;
    width: 12rem;
  }
  button:nth-child(3) {
    color: white;
    font-weight: 600;
    background-color: black;
    font-size: 16px;
    height: 4rem;
    width: 10rem;
  }
`;
