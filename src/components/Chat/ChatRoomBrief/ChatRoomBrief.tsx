import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import {ChatRoomType} from '../ChatBody/ChatBody';
import {ChatType} from '../ChatRoom/ChatRoom';
import ChattingService from '../ChattingService';

type ChatRoomBriefProps = {
  chatRoomId: string;
  chatRoomInfo: ChatRoomType;
  handleRoomClick: (chatRoomId: string, chatRoomInfo: ChatRoomType) => void;
};

const ChatRoomBrief = ({
  chatRoomId,
  chatRoomInfo,
  handleRoomClick,
}: ChatRoomBriefProps) => {
  const accessToken = getAccessToken();
  const userId = getUserIdFixed();

  const [receiveMsg, setReceiveMsg] = useState<ChatType | undefined>(undefined);

  const ChattingServiceKit = useMemo(() => {
    console.log('yes1' + chatRoomId);
    // 여기에서 노란색 에러가 뜨고있다
    // 도저히 모르겠다
    const yes = new ChattingService(chatRoomId);
    console.log('yes2');

    return yes;

    // return new ChattingService('');
  }, [chatRoomId]);

  useEffect(() => {
    ChattingServiceKit.onConnect(
      getAccessToken(),
      {
        Authorization: accessToken,
        type: 'TALK',
      },
      (receivingMessage: any) => {
        setReceiveMsg(receivingMessage);
      },

      userId,
    );
  }, []);

  // // 컴포넌트 언마운트시 서버와의 소켓통신을 disconnect한다
  useEffect(() => {
    return () => {
      console.log('chatroom brief unmounted');
      ChattingServiceKit.onDisconnect();
    };
  }, []);

  const onRoomClick: React.MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    handleRoomClick(chatRoomId, chatRoomInfo);
  };

  return (
    <>
      <ChatRoomDiv onClick={onRoomClick}>
        <Title>{chatRoomInfo.clubName}</Title>
        <Sender>{receiveMsg?.sender}</Sender>
        <Message>{receiveMsg?.message}</Message>
      </ChatRoomDiv>
    </>
  );
};
export default ChatRoomBrief;

const ChatRoomDiv = styled.div`
  width: 100%;
  min-height: 6rem;
  margin: 2rem 0;
  border: 1px solid black;
  padding: 0 1rem;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 1rem 0;
`;

const Sender = styled.span`
  margin-right: 2rem;
`;
const Message = styled.span``;
