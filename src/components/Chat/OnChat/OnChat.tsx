import React from 'react';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import ChatInput from '../ChatInput/ChatInput';

type OnChatProps = {};

const OnChat = ({}: OnChatProps) => {
  return (
    <>
      <ChattingList>채팅채팅</ChattingList>
      <ThinLine color={Theme.LightGray2} />

      <ChatInputDiv>
        <ChatInput />
      </ChatInputDiv>
    </>
  );
};
export default OnChat;

const ChattingList = styled.div`
  flex: 8;
`;
const ChatInputDiv = styled.div`
  flex: 1;
`;
