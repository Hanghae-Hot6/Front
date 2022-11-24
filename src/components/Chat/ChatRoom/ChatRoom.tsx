import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import KeyDetector from '../../../utils/KeyDetector';
import {ChatRoomType} from '../ChatBody/ChatBody';
import MyChat from '../ChatDialog/MyChat';
import OthersChat from '../ChatDialog/OthersChat';
import ChatInput from '../ChatInput/ChatInput';
import ChattingService from '../ChattingService';

type ChatRoomProps = {
  chatRoomNowInfo: ChatRoomType;
};

export type ChatType = {
  chatRoomId: string;
  date: string;
  message: string;
  sender: string;
  type: string;
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
      console.log(` ${chatRoomNowInfo.clubName}방에서 나가셨습니다`);

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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    setInput(e.target.value);
  };
  const handleClick = useCallback(() => {
    ChattingServiceKit.sendMessage(
      {},
      {
        chatRoomId: chatRoomNowInfo.chatRoomId,
        message: input,
        type: 'TALK',
        sender: userId,
      },
    );

    setInput('');
  }, [input, userId]);

  const handleKeyPress = (key: any) => {
    if (key === 'Enter') {
      buttonRef.current!.click();
    }
  };

  return (
    <>
      <ChattingList>
        {messageList.map((val, index) => {
          if (val.sender === userId) {
            return <MyChat key={index} chatObject={val} />;
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
          전송
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
  background-color: aliceblue;
`;

const SendButton = styled.button`
  flex: 1;
`;
