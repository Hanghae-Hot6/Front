import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import KeyDetector from '../../../utils/KeyDetector';

import MyChat from '../ChatDialog/MyChat';
import OthersChat from '../ChatDialog/OthersChat';

import ChattingService from '../ChattingService';
import PaperPlaneRight from '../../../assets/PaperPlaneRight.svg';
import {ChatRoomType, ChatType} from '../../../types/chat';
import {useQuery} from 'react-query';
import {chatApis} from '../../../api/axiosConfig';
type ChatRoomProps = {
  chatRoomNowInfo: ChatRoomType;
};

const ChatRoom = ({chatRoomNowInfo}: ChatRoomProps) => {
  const accessToken = getAccessToken();
  const userId = getUserIdFixed();

  const [input, setInput] = useState<string>('');
  const [receiveMsg, setReceiveMsg] = useState<ChatType | undefined>(undefined);
  const [messageList, setMessageList] = useState<ChatType[]>([]);
  const [onConnect, setOnConnect] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // 채팅 서비스 킷 생성
  const ChattingServiceKit = useMemo(() => {
    return new ChattingService(chatRoomNowInfo.chatRoomId);
  }, [chatRoomNowInfo.chatRoomId]);

  // console.log(chatRoomNowInfo.chatRoomId);

  const {data, refetch: fetchAllChatRoomMessages} = useQuery(
    ['getAllChatRoomMessages', chatRoomNowInfo.chatRoomId],
    async ({queryKey}) => {
      const response = await chatApis.getAllChatRoomMessages(queryKey[1]);

      return response.data.data;
    },
    {
      // 기본값: 브라우저 화면을 재방문시 useQuery다시 요청함 -> 요청 안함
      refetchOnWindowFocus: false,
      // 8 - (1) : useQuery의 동작을 수동으로 바꿈
      enabled: false,
      // 기본값: retry를 3번까지 다시 요청 -> 다시요청 안함
      retry: 0,
      onSuccess: data => {
        const messagesFromServer = [...data];
        const totalMessageLength = messagesFromServer.pop().chatMessageCount;
        const allChatMessages = messagesFromServer;

        console.log(allChatMessages);
        console.log(totalMessageLength);
      },
      onError: () => {},
    },
  );

  // onConnect시 메시지 받아오기
  useEffect(() => {
    ChattingServiceKit.onConnect(
      getAccessToken(),
      {
        Authorization: accessToken,
        type: 'TALK',
      },
      (receivingMessage: ChatType) => {
        setReceiveMsg(receivingMessage);
        setOnConnect(true);
      },

      userId,
      'ChatRoom',
    );
    fetchAllChatRoomMessages();
  }, []);

  // 메세지 배열안에 모으기

  useEffect(() => {
    if (receiveMsg) {
      setMessageList([...messageList, receiveMsg]);
    }
  }, [receiveMsg]);

  // 언마운트시 소켓 통신 종료하기

  useEffect(() => {
    return () => {
      // console.log(` ${chatRoomNowInfo.clubName}방에서 나가셨습니다`);

      // 작동을 잘 안함
      if (onConnect) {
        ChattingServiceKit.sendMessage(
          {},
          {
            chatRoomId: chatRoomNowInfo.chatRoomId,
            message: `${userId}님이 채팅방에서 나가셨습니다`,
            type: 'TALK',
            sender: userId,
          },
        );
        setOnConnect(false);
      }

      ChattingServiceKit.onDisconnect(userId);
    };
  }, []);

  const [messageToDown, setMessageToDown] = useState<boolean>(false);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageToDown]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    setInput(e.target.value);
  };

  const handleClick = useCallback(() => {
    if (input !== '') {
      ChattingServiceKit.sendMessage(
        {},
        {
          chatRoomId: chatRoomNowInfo.chatRoomId,
          message: input,
          type: 'TALK',
          sender: userId,
        },
      );
      setMessageToDown(!messageToDown);
    }

    setInput('');
  }, [input, userId]);

  const handleKeyPress = (key: any) => {
    if (key === 'Enter') {
      buttonRef.current!.click();
    }
  };

  return (
    <>
      <ChattingList ref={messageBoxRef}>
        {messageList.map((val, index) => {
          if (val.sender === userId) {
            return (
              <>
                <MyChat key={index} chatObject={val} />
              </>
            );
          } else {
            return <OthersChat key={index} chatObject={val} />;
          }
        })}
      </ChattingList>
      <ThinLine color={Theme.LightGray2} thick="2px" marginTopBottom="1rem" />

      <ChatInputDiv>
        <ChatInputInput
          type="text"
          placeholder="메세지를 입력하세요"
          onChange={handleChange}
          value={input}
        />
        <SendButton onClick={handleClick} ref={buttonRef}>
          <img src={PaperPlaneRight} alt="전송버튼" />
        </SendButton>
      </ChatInputDiv>
      <KeyDetector sendKeyValue={handleKeyPress} />
    </>
  );
};
export default ChatRoom;

const ChattingList = styled.div`
  display: flex;
  flex-direction: column;
  height: 40rem;
  overflow: auto;
  flex: 8;
  padding: 0 1rem;
  /* border: 1px solid black; */
`;

const ChatInputDiv = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
`;

const ChatInputInput = styled.input`
  flex: 7;
  background-color: ${props => props.theme.LightGray2};
  border: none;
  border-radius: 0.8rem;
  padding: 1.5rem;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 576px) {
    width: 200px;
    border: none;
    box-shadow: none;
  }
`;

const SendButton = styled.button`
  flex: 1;
  background-color: #fff;
`;
