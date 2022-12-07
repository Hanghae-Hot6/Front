import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ChatBody from '../components/Chat/ChatBody/ChatBody';
import Layout from '../components/Layout/Layout';
import useWindowSizeDetector from '../Hooks/useWindowSizeDetector';
import {
  setButtonShowToFalse,
  setButtonShowToTrue,
} from '../Redux/modules/slices/chatButtonShowSlice';
import {useAppDispatch} from '../Redux/store/store';

type ChatPageProps = {};

const ChatPage = ({}: ChatPageProps) => {
  const [showChat, setShowChat] = useState(false);
  const {windowWidth} = useWindowSizeDetector();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setButtonShowToFalse());
    return () => {
      dispatch(setButtonShowToTrue());
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 564 && windowWidth > 560) {
      window.confirm(
        '화면의 넓이가 564px 이상 넓어지게 되면 모바일 채팅창은 종료되고 뒤로가게되니 참고바랍니다',
      );
    } else if (windowWidth < 576) {
    } else {
      navigate(-1);
    }
  }, [windowWidth]);
  return (
    <>
      <Layout>
        <div>chat</div>

        {/* <ChatBody setShowChat={setShowChat} /> */}
        {/* <CreateClubFixClubPageLayout>
          <CreateClubTitle title="모임 개설하기" />
          <ThinLine color={Theme.MainColor} />
          <CreateClubBody />
        </CreateClubFixClubPageLayout> */}
      </Layout>
    </>
  );
};
export default ChatPage;
