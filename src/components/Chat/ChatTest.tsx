import axios from 'axios';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {chatApis} from '../../api/axiosConfig';
import {getAccessToken, getUserId, getUserIdFixed} from '../../utils';
import KeyDetector from '../../utils/KeyDetector';
import ChattingService from './ChattingService';

type ChatTestProps = {};

// 낚시를 배워봅시다
// ef1f5246-e23e-462c-b14c-2cef7cca869c

const ChatTest = ({}: ChatTestProps) => {
  const [input, setInput] = useState<string>('');

  // chattingServiceKit 만들기

  const ChattingServiceKit = useMemo(() => {
    return new ChattingService('ef1f5246-e23e-462c-b14c-2cef7cca869c');
  }, []);

  const accessToken = getAccessToken();

  const userId = getUserIdFixed();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // 해당 방 채팅 보기
  // const fetchChats = async () => {

  // };

  // const {data: chats, status: chatsStatus} = useQuery('getChat', fetchChats);

  // 채팅방들 보기

  // useEffect(() => {
  //   ChattingServiceKit.onConnect(
  //     getAccessToken(),
  //     {
  //       Authorization: accessToken,
  //       type: 'TALK',
  //     },

  //     (receivingMessage: any) => {},
  //     userId,
  //     'ChatTest',
  //   );
  // }, []);

  const handleClick2 = async () => {
    const response = await chatApis.getAllChatRoomMessages(
      'e239f429-5832-46cc-af26-0fee276804f7',
    );
    console.log(response);
    return response;
  };

  const handleClick = useCallback(() => {
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

  useEffect(() => {
    return () => {
      ChattingServiceKit.onDisconnect(userId);
    };
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    setInput(e.target.value);
  };
  const handleKeyPress = (key: any) => {
    if (key === 'Enter') {
      buttonRef.current!.click();
    }
  };

  return (
    <>
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
