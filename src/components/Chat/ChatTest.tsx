import axios from 'axios';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {getAccessToken, getUserId, getUserIdFixed} from '../../utils';
import KeyDetector from '../../utils/KeyDetector';
import ChattingService from './ChattingService';

type ChatTestProps = {};

const ChatTest = ({}: ChatTestProps) => {
  const [input, setInput] = useState<string>('');

  // chattingServiceKit 만들기

  const ChattingServiceKit = useMemo(() => {
    return new ChattingService('');
  }, []);

  const accessToken = getAccessToken();

  const userId = getUserIdFixed();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // useEffect(() => {
  //   console.log(input);
  // }, [input]);

  // 해당 방 채팅 보기
  // const fetchChats = async () => {

  // };

  // const {data: chats, status: chatsStatus} = useQuery('getChat', fetchChats);

  // console.log(chats);

  // 채팅방들 보기

  useEffect(() => {
    ChattingServiceKit.onConnect(
      getAccessToken(),
      {
        Authorization: accessToken,
        type: 'TALK',
      },

      (receivingMessage: any) => console.log(receivingMessage),
      userId,
      'ChatTest',
    );
  }, []);

  const handleClick2 = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/chat/messages/9d8856fb-1e18-41e3-baa8-310fe5ab731c`,
      {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(response);

    return response;
  };

  const handleClick = useCallback(() => {
    console.log(userId);
    ChattingServiceKit.sendMessage(
      {},
      {
        chatRoomId: '9d8856fb-1e18-41e3-baa8-310fe5ab731c',
        message: input,
        type: 'TALK',
        sender: userId,
      },
    );
  }, [input, userId]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    setInput(e.target.value);
  };

  useEffect(() => {
    return () => {
      ChattingServiceKit.onDisconnect(userId);
    };
  }, []);

  const handleKeyPress = (key: any) => {
    if (key === 'Enter') {
      buttonRef.current!.click();
    }
  };

  return (
    <>
      {/* <MessageSendButton>채팅방들 보기</MessageSendButton> */}
      <MessageSendButton onClick={handleClick2}>채팅보기</MessageSendButton>

      <MessageSendButton ref={buttonRef} onClick={handleClick}>
        메세지보내기
      </MessageSendButton>
      <input type="text" onChange={handleChange} />
      <KeyDetector sendKeyValue={handleKeyPress} />
    </>
  );
};
export default ChatTest;

const MessageSendButton = styled.button`
  width: 14rem;
  height: 4rem;
  font-size: 2rem;
`;
