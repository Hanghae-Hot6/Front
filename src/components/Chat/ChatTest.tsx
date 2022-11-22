import React, {useCallback, useRef, useState} from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import {getAccessToken, getUserId} from '../../utils';
import KeyDetector from '../../utils/KeyDetector';
import ChattingService from './ChattingService';

type ChatTestProps = {};

const ChattingServiceKit = new ChattingService();

const ChatTest = ({}: ChatTestProps) => {
  const [input, setInput] = useState<string>('');

  const userId = getUserId();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    ChattingServiceKit.onConnect(
      '9d8856fb-1e18-41e3-baa8-310fe5ab731c',
      getAccessToken(),
      {
        Authorization: getAccessToken(),
        type: 'TALK',
      },
      (receivingMessage: any) => console.log(receivingMessage),
      userId,
    );
  }, []);

  const handleClick = useCallback(() => {
    ChattingServiceKit.sendMessage(
      {
        Authorization: getAccessToken(),
        // 'Content-Type': 'application/json',
      },
      {
        chatRoomId: '9d8856fb-1e18-41e3-baa8-310fe5ab731c',
        message: input,
        type: 'TALK',
        sender: userId,
      },
    );
  }, [input]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    setInput(e.target.value);
  };

  useEffect(() => {
    return () => {
      ChattingServiceKit.onDisconnect();
    };
  }, []);

  const handleKeyPress = (key: any) => {
    if (key === 'Enter') {
      buttonRef.current!.click();
    }
  };

  return (
    <>
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
