import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ChatBody from '../components/Chat/ChatBody/ChatBody';
import Layout from '../components/Layout/Layout';
import useWindowSizeDetector from '../Hooks/useWindowSizeDetector';
import {setChatShowToTrue} from '../Redux/modules/slices/chatAndChatButtonShowSlice';

import {useAppDispatch} from '../Redux/store/store';

type MobileChatPageProps = {};

const MobileChatPage = ({}: MobileChatPageProps) => {
  const [showChat, setShowChat] = useState(false);
  const {windowWidth} = useWindowSizeDetector();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setButtonShowToFalse());
  //   return () => {
  //     dispatch(setButtonShowToTrue());
  //   };
  // }, []);

  useEffect(() => {
    if (windowWidth < 564 && windowWidth > 560) {
      window.confirm(
        '화면의 넓이가 564px 이상 넓어지게 되면 모바일 채팅창은 종료되고 뒤로가게되니 참고바랍니다',
      );
    } else if (windowWidth < 576) {
      // 이 곳은 아무동작을 하지 않는 영역임
    } else {
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
