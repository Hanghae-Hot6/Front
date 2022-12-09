// Libraries(react관련 패키지, 그외 라이브러리)
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

//components
import NavigationButton from '../../common/NavigationButton';
import HeaderSearch from './HeaderSearch';
import HeaderHamburgSlider from './HeaderHamburgSlider';

// 그외 (img, css, fn, params...)
import {getAccessToken, getUserId} from '../../utils';
import logo from '../../assets/logo.svg';
import hamBtn from '../../assets/hamBtn.svg';
import MagnifyingGlass from '../../assets/MagnifyingGlass.svg';

const Header = () => {
  const [on, setOn] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const accessToken = getAccessToken();
  const userId = getUserId();

  const [isLogin, setIsLogin] = useState(false);

  // accessToken이 존재하면 Login 상태
  useEffect(() => {
    if (accessToken) {
      if (accessToken.split(' ')[0] !== 'Bearer') {
        localStorage.removeItem('Authorization');
        setIsLogin(false);
        return;
      }
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    return () => {};
  }, []);

  const handleHamburgClick: React.MouseEventHandler<HTMLDivElement> = e => {
    setOn(!on);
  };

  return (
    <>
      <StHeader>
        <StHeaderSection>
          <StLogo>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </StLogo>
          <div className="btnWrap">
            <HeaderSearch />
            <StNavBtnsDiv>
              {isLogin ? (
                <>
                  <NavigationButton
                    path={`/login`}
                    onClickCallback={() => {
                      localStorage.removeItem('Authorization');
                      localStorage.removeItem('userId');
                      localStorage.removeItem('Refresh-Token');
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
            <img
              className="mobile-search-icon"
              src={MagnifyingGlass}
              alt="MagnifyingGlass"
              onClick={() => {
                setOn(prev => (prev = true));
                setIsSearch(prev => (prev = true));
              }}
            />
            <StNavHamBtns onClick={handleHamburgClick}>
              <div></div>
            </StNavHamBtns>
          </div>
        </StHeaderSection>
        {on && (
          <HeaderHamburgSlider
            on={on}
            userId={userId}
            isLogin={isLogin}
            isSearch={isSearch}
            setOn={setOn}
            setIsLogin={setIsLogin}
            setIsSearch={setIsSearch}
          />
        )}
      </StHeader>
    </>
  );
};
export default Header;
const StHeader = styled.header`
  width: 99.6vw;
  height: 92px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  .mobile-search-icon {
    display: none;
    @media screen and (max-width: 576px) {
      display: inline-block;
      height: 100%;
      margin: 3px 1rem;
    }
  }
`;
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
  > .btnWrap {
    display: flex;
    justify-content: end;
  }
  @media screen and (max-width: 576px) {
    overflow: hidden;
    width: 90vw;
  }
`;

const StLogo = styled.div`
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
  @media screen and (max-width: 576px) {
    display: none;
  }
  button {
    color: black;
    font-weight: 600;
    background-color: #fff;
    font-size: 16px;
    height: 4rem;
    width: 12rem;
    white-space: nowrap;
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

const StNavHamBtns = styled.div`
  width: 33%;
  display: none;
  justify-content: end;
  @media screen and (max-width: 576px) {
    height: 33px;
    width: 33px;
    display: flex;
    > div {
      cursor: pointer;
      width: 33px;
      height: 33px;
      background-image: url(${hamBtn});
    }
  }
  button {
    color: black;
    font-weight: 600;
    background-color: #fff;
    font-size: 16px;
    height: 4rem;
    width: 12rem;
    white-space: nowrap;
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
