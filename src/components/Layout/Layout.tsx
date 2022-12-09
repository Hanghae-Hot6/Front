import React, {ReactNode, useState, useEffect} from 'react';
import Footer from '../Footer/Footer';
import styled from 'styled-components';
import arrow from '../../assets/arrowUp.svg';
import ChatBody from '../Chat/ChatBody/ChatBody';
import chatBtn from '../../assets/chatBtn.svg';
import Header from '../Header/Header';

import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import ChatAndScrollTopButton from '../ChatAndScrollTopButton/ChatAndScrollTopButton';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const {chatShow} = useAppSelector(
    state => state.chatAndChatButtonShowReducer,
  );

  return (
    <div>
      <Header />
      <LayoutWrap>{props.children}</LayoutWrap>

      {chatShow && <ChatBody />}
      <Footer />
      <ChatAndScrollTopButton />
    </div>
  );
};

export default Layout;

const LayoutWrap = styled.section`
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  @media screen and (max-width: 576px) {
    width: 90vw;
  }
`;
