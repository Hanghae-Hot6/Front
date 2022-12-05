import React, {ReactNode, useState, useEffect} from 'react';
import Footer from '../Footer/Footer';
import styled from 'styled-components';
import arrow from '../../assets/arrowUp.svg';
import ChatBody from '../Chat/ChatBody/ChatBody';
import chatBtn from '../../assets/chatBtn.svg';
import Header from '../Header/Header';
type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const [showButton, setShowButton] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <div>
      <Header />
      <LayoutWrap>{props.children}</LayoutWrap>

      {showChat && <ChatBody setShowChat={setShowChat} />}
      <Footer />
      {showButton ? (
        <BtnWrap style={{height: '140px'}}>
          {
            <ChatButton
              onClick={() => {
                setShowChat(!showChat);
              }}>
              <img src={chatBtn} alt="chatBtn" />
            </ChatButton>
          }
          {showButton ? (
            <TopButton onClick={scrollToTop} style={{opacity: 1}}>
              <img src={arrow} alt={arrow} />
            </TopButton>
          ) : (
            <TopButton onClick={scrollToTop} style={{opacity: 0}}>
              <img src={arrow} alt={arrow} />
            </TopButton>
          )}
        </BtnWrap>
      ) : (
        <BtnWrap style={{height: '68px'}}>
          {
            <ChatButton
              onClick={() => {
                setShowChat(!showChat);
              }}>
              <img src={chatBtn} alt="chatBtn" />
            </ChatButton>
          }
          {showButton ? (
            <TopButton onClick={scrollToTop} style={{opacity: 1}}>
              <img src={arrow} alt={arrow} />
            </TopButton>
          ) : (
            <TopButton onClick={scrollToTop} style={{opacity: 0}}>
              <img src={arrow} alt={arrow} />
            </TopButton>
          )}
        </BtnWrap>
      )}
    </div>
  );
};

export default Layout;

const TopButton = styled.button`
  width: 5.5rem;
  height: 5.5rem;
  border: 1px solid #5200ff;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  color: #5200ff;
  background-color: #fff;
  transition: all 0.2s;
  margin-left: 0.8rem;
  margin-top: 1.4rem;
  @media screen and (max-width: 576px) {
    margin-top: 4rem;
  }
`;

const ChatButton = styled.button`
  width: 5.5rem;
  height: 5.5rem;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  color: #5200ff;
  background-color: #5200ff;
  margin-left: 0.8rem;
  margin-top: 0.7rem;
  /* background-image: url(${chatBtn});
  background-position: center center;
  background-repeat: no-repeat; */
  @media screen and (max-width: 576px) {
    margin-top: 1.4rem;
  }
`;

const BtnWrap = styled.div`
  background-color: #fff;
  position: fixed;
  top: 64.5%;
  right: 11.3rem;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.2);
  width: 7rem;
  border-radius: 30px;
  transition: all 0.5s;
  :hover {
    transform: matrix3d(
        1,
        0,
        0,
        0,
        0,
        0.866025,
        0.5,
        0,
        0,
        -0.5,
        0.866025,
        0,
        0,
        0,
        0,
        1
      )
      matrix3d(
        0.866025,
        0,
        -0.5,
        0,
        0,
        1,
        0,
        0,
        0.5,
        0,
        0.866025,
        0,
        0,
        0,
        0,
        1
      )
      translate3d(2px, 2px, -2px);
  }
  button {
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
  }
  > button:hover {
    transform: translate3d(5px, 5px, -5px);
  }
  @media screen and (max-width: 576px) {
    right: 1rem;
  }
`;
const LayoutWrap = styled.section`
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  @media screen and (max-width: 576px) {
    width: 90vw;
  }
`;
