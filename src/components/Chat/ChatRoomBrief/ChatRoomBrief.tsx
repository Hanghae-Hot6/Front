import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import ChattingService from '../ChattingService';

type ChatRoomBriefProps = {
  chatRoomId: string;
  title: string;
  handleRoomClick: (chatRoomId: string, title: string) => void;
};

const ChatRoomBrief = ({
  chatRoomId,
  title,
  handleRoomClick,
}: ChatRoomBriefProps) => {
  const accessToken = getAccessToken();

  const userId = getUserIdFixed();

  const ChattingServiceKit = useMemo(() => {
    return new ChattingService(chatRoomId);
  }, [chatRoomId]);

  useEffect(() => {
    ChattingServiceKit.onConnect(
      getAccessToken(),
      {
        Authorization: accessToken,
        type: 'TALK',
      },

      (receivingMessage: any) => console.log(receivingMessage),
      userId,
    );
  }, []);

  // 컴포넌트 언마운트시 서버와의 소켓통신을 disconnect한다
  useEffect(() => {
    return () => {
      ChattingServiceKit.onDisconnect();
    };
  }, []);

  const onRoomClick: React.MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    handleRoomClick(chatRoomId, title);
  };

  return (
    <>
      <ChatRoomDiv onClick={onRoomClick}>
        <span>{chatRoomId}</span>
        <span>{title}</span>
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

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;
