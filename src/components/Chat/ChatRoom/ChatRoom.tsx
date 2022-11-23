import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import KeyDetector from '../../../utils/KeyDetector';
import {ChatRoomType} from '../ChatBody/ChatBody';
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

  const ChattingServiceKit = useMemo(() => {
    return new ChattingService(chatRoomNowInfo.chatRoomId);
  }, [chatRoomNowInfo.chatRoomId]);

  // new ChattingService(chatRoomNowInfo.chatRoomId);

  useEffect(() => {
    console.log(chatRoomNowInfo);

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
    );
  }, []);

  useEffect(() => {
    console.log(onConnect);
  }, [onConnect]);

  useEffect(() => {
    if (receiveMsg) {
      setMessageList([...messageList, receiveMsg]);
    }
  }, [receiveMsg]);

  useEffect(() => {
    return () => {
      console.log(` ${chatRoomNowInfo.clubName} unmounted`);

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

      ChattingServiceKit.onDisconnect();
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
            return (
              <MyChat key={index}>
                <span>
                  {val.sender} {'    '}
                  {val.message}
                </span>
              </MyChat>
            );
          } else {
            return (
              <OthersChat key={index}>
                <span>{val.sender}</span>
                <span>{val.message}</span>
              </OthersChat>
            );
          }
        })}
      </ChattingList>
      <ThinLine color={Theme.LightGray2} thick="1px" />

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

  flex: 8;
  border: 1px solid black;
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

const OthersChat = styled.div`
  margin: 0.4rem 0;
`;
const MyChat = styled.div`
  margin: 0.4rem 0;
  margin-left: auto;
  /* border: 1px solid black; */
`;
