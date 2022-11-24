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
      'ChatRoomBrief',
    );
  }, []);

  // // 컴포넌트 언마운트시 서버와의 소켓통신을 disconnect한다
  useEffect(() => {
    return () => {
      ChattingServiceKit.onDisconnect(userId);
    };
  }, []);

  const onRoomClick: React.MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    handleRoomClick(chatRoomId, chatRoomInfo);
  };

  return (
    <>
      <ChatRoomDiv onClick={onRoomClick}>
        <ThumbnailWrapper>
          <Thumbnail src={chatRoomInfo.thumbnail} />
        </ThumbnailWrapper>

        <TitleMessageDiv>
          <Title>{chatRoomInfo.clubName} </Title>

          <Message>{receiveMsg?.message}</Message>
        </TitleMessageDiv>

        <ParticipantsDiv>
          <Participants>{chatRoomInfo.participants}</Participants>
        </ParticipantsDiv>
      </ChatRoomDiv>
    </>
  );
};
export default ChatRoomBrief;

const ChatRoomDiv = styled.div`
  width: 100%;
  height: 6rem;
  /* min-height: 6rem; */
  margin: 1.2rem 0;
  border: 1px solid ${props => props.theme.LightPurple2};
  border-radius: 1rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.LightPurple2};
    cursor: pointer;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.LightPurple2};
`;

const Thumbnail = styled.img`
  height: 100%;
`;

const TitleMessageDiv = styled.div`
  /* border: 1px solid black; */
  height: 100%;
  width: 23rem;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 1rem 0;
`;

const Message = styled.span`
  font-size: 1.1rem;
`;

const ParticipantsDiv = styled.div`
  /* border: 1px solid black; */
  height: 100%;
  /* padding: 0 1rem; */
`;
const Participants = styled.h1`
  color: ${props => props.theme.Gray};
  font-size: 1.6rem;
  margin: 1rem;
`;
