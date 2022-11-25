import React from 'react';
import ChatTest from '../components/Chat/ChatTest';
import CreateClubBody from '../components/CreateClub2/Body/CreateClubBody';

import {getAccessToken} from '../utils';

type ChatPageProps = {};

const ChatPage = ({}: ChatPageProps) => {
  return (
    <>
      {/* <ChatTest /> */}
      <CreateClubBody />
    </>
  );
};
export default ChatPage;
