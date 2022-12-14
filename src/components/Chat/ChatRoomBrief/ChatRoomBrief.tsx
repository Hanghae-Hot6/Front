import React, {useEffect, useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {chatApis} from '../../../api/axiosConfig';
import {ChatRoomType, ChatType} from '../../../types/chat';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import {
  convertChatDateToDateObject,
  minutesPassIndicator,
} from '../../../utils/dateFormat';

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
  const timeRightNow = new Date();
  const [receiveMsg, setReceiveMsg] = useState<ChatType | undefined>(undefined);

  const [lastChat, setLastChat] = useState<ChatType | undefined>(undefined);

  const {data: lastChatRoomMessage, refetch: fetchLastChatRoomMessage} =
    useQuery(
      [
        'getChatRoomMessages',
        {
          chatRoomId: chatRoomId,
          page: 1,
          size: 1,
        },
      ],
      async ({queryKey}) => {
        const response = await chatApis.getChatRoomMessages(queryKey[1]);
        // const response = await chatApis.getChatRoomMessages(queryKey[1])
        return response.data;
      },
      {
        refetchOnWindowFocus: false,
        enabled: false,
        refetchInterval: 10 * 1000,
        retry: 0,
        onSuccess: data => {
          if (!data) return;
          const messagesFromServer = [...data.data];
          const totalMessageLength: number =
            messagesFromServer.pop().chatMessageCount;
          const allChatMessages: ChatType[] = messagesFromServer[0];
          setLastChat(allChatMessages[0]);
        },
        onError: err => {
          console.log('err');
          console.log(err);
        },
      },
    );

  const ChattingServiceKit = useMemo(() => {
    // 여기에서 노란색 에러가 뜨고있다
    // 도저히 모르겠다
    const yes = new ChattingService(chatRoomId);
    // console.log('yes2');

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
    fetchLastChatRoomMessage();
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

        <Div2>
          <Div3>
            <Div4>
              <Title>{chatRoomInfo.clubName} </Title>
              <Participants>{chatRoomInfo.participants}</Participants>
            </Div4>

            <LastChatTime>
              {receiveMsg
                ? minutesPassIndicator(
                    timeRightNow,
                    convertChatDateToDateObject(receiveMsg?.date),
                  )
                : lastChat
                ? minutesPassIndicator(
                    timeRightNow,
                    convertChatDateToDateObject(lastChat?.date),
                  )
                : '몇분전'}
            </LastChatTime>
          </Div3>

          <Message>
            {receiveMsg ? receiveMsg?.message : lastChat?.message}
          </Message>
        </Div2>
      </ChatRoomDiv>
    </>
  );
};
export default ChatRoomBrief;

const ChatRoomDiv = styled.div`
  width: 100%;
  height: 6rem;
  margin: 1.2rem 0;

  border-radius: 1rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
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
  margin-right: 1rem;
  /* @media screen and (max-width: 576px) {
    flex: 1;
  } */
`;

const Thumbnail = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
`;

const Div2 = styled.div`
  height: 100%;
  /* width: 20rem; */
  flex: 1;
  padding: 0 1rem;
  /* border: 1px solid black; */
  @media screen and (max-width: 576px) {
    flex: 4;
  }
`;
const Div3 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid black; */
`;
const Div4 = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  /* border: 1px solid black; */
`;

const Title = styled.h1`
  width: 100%;

  font-size: 1.6rem;
  font-weight: 700;
  margin: 1rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Message = styled.span`
  display: inline-block;
  font-size: 1.1rem;

  /* max-width: 16.6rem; */
  @media screen and (min-width: 576px) {
    max-width: 12.6rem;
  }

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const LastChatTime = styled.h1`
  margin: 1rem 0.1rem;
  font-size: 1.2rem;
  /* border: 1px solid black; */
  color: ${props => props.theme.Gray};
`;

const Participants = styled.h1`
  color: ${props => props.theme.Gray};
  font-size: 1.6rem;
  margin: 1rem;
`;
