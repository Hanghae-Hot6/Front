import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ChatBody from '../components/Chat/ChatBody/ChatBody';
import Layout from '../components/Layout/Layout';
import useWindowSizeDetector from '../Hooks/useWindowSizeDetector';
import {
  setChatShowToFalse,
  setChatShowToTrue,
} from '../Redux/modules/slices/chatAndChatButtonShowSlice';

import {useAppDispatch} from '../Redux/store/store';

type MobileChatPageProps = {};

const MobileChatPage = ({}: MobileChatPageProps) => {
  const {windowWidth, widthIsIncreasing} = useWindowSizeDetector();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChatShowToFalse());
  }, []);
  useEffect(() => {
    if (widthIsIncreasing && windowWidth > 576) {
      // 화면이 576px을 넘어가게 되면 pc버젼으로 바뀌고, 채팅창은 켜지고
      navigate(-1);
      dispatch(setChatShowToTrue());
    }
  }, [windowWidth]);
  return (
    <>
      <Layout>
        <ChatBody />
      </Layout>
    </>
  );
};
export default MobileChatPage;
