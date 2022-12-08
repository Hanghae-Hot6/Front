import React, {useEffect} from 'react';
import chatBtn from '../../assets/chatBtn.svg';
import arrow from '../../assets/arrowUp.svg';
import styled from 'styled-components';
import useWindowSizeDetector from '../../Hooks/useWindowSizeDetector';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {
  setChatButtonShowToFalse,
  setScrollButtonShowToFalse,
  setScrollButtonShowToTrue,
  setToggleChatShow,
} from '../../Redux/modules/slices/chatAndChatButtonShowSlice';
type ChatAndScrollTopButtonProps = {};

const ChatAndScrollTopButton = ({}: ChatAndScrollTopButtonProps) => {
  const {windowWidth} = useWindowSizeDetector();
  const {scrollButtonShow, chatButtonShow} = useAppSelector(
    state => state.chatAndChatButtonShowReducer,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        dispatch(setScrollButtonShowToTrue());
      } else {
        dispatch(setScrollButtonShowToFalse());
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);
  const handleShowChat: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (windowWidth < 576) {
      navigate('/mobile_chat');
    } else {
      dispatch(setToggleChatShow());
    }
  };

  return (
    <>
      <BtnWrap
        style={{
          display: chatButtonShow || scrollButtonShow ? 'block' : 'none',
          height: chatButtonShow && scrollButtonShow ? '140px' : '68px',
        }}>
        {
          <ChatShowButton
            style={{display: chatButtonShow ? 'block' : 'none'}}
            onClick={handleShowChat}>
            <img src={chatBtn} alt="chatBtn" />
          </ChatShowButton>
        }
        <ScrollTopButton
          onClick={scrollToTop}
          style={{display: scrollButtonShow ? 'block' : 'none'}}>
          <img src={arrow} alt={arrow} />
        </ScrollTopButton>
      </BtnWrap>
    </>
  );
};
export default ChatAndScrollTopButton;

const ScrollTopButton = styled.button`
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

const ChatShowButton = styled.button`
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

  z-index: 2;
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
