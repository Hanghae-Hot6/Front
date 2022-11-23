import React, {ReactNode, useState, useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styled from 'styled-components';
import arrow from '../../assets/arrowUp.svg';
import ChatBody from '../Chat/ChatBody/ChatBody';
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
    <div style={{overflow: 'hidden'}}>
      <Header />
      <section
        style={{
          width: '1280px',
          margin: '0 auto',
          overflow: 'hidden',
          minHeight: ' 100vh',
          height: '100%',
        }}>
        {props.children}
      </section>

      {showChat && <ChatBody setShowChat={setShowChat} />}
      <Footer />

      {showButton && (
        <TopButton onClick={scrollToTop}>
          <img src={arrow} alt={arrow} />
        </TopButton>
      )}
      {
        <ChatButton
          onClick={() => {
            setShowChat(!showChat);
          }}>
          <span>채팅</span>
        </ChatButton>
      }
    </div>
  );
};

export default Layout;

const TopButton = styled.button`
  position: fixed;
  font-size: 1rem;
  width: 5.5rem;
  height: 5.5rem;
  bottom: 20rem;
  right: 12rem;
  border: 1px solid #5200ff;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  color: #5200ff;
  background-color: #fff;
  z-index: 10;
`;

const ChatButton = styled.button`
  position: fixed;
  font-size: 1rem;
  width: 5.5rem;
  height: 5.5rem;
  bottom: 28rem;
  right: 12rem;
  border: 1px solid #5200ff;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  color: #5200ff;
  background-color: #fff;
  z-index: 10;
`;
