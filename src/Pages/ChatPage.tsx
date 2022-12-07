import React, {useState} from 'react';
import ChatBody from '../components/Chat/ChatBody/ChatBody';
import Layout from '../components/Layout/Layout';

type ChatPageProps = {};

const ChatPage = ({}: ChatPageProps) => {
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      <Layout>
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
