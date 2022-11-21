import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import {getAccessToken} from '../../utils';
import ChattingService from './ChattingService';

type ChatTestProps = {};

const ChattingServiceKit = new ChattingService();

const ChatTest = ({}: ChatTestProps) => {
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    ChattingServiceKit.onConnect(
      '/topic/greetings',
      {},
      (receivingMessage: any) => console.log(receivingMessage),
    );
  }, []);

  const handleClick = useCallback(() => {
    // ChattingServiceKit.sendMessage({
    //   content: { nickname: '안녕하세요 연태님' },
    // });
    console.log('hi');
    console.log(input);
    console.log(
      JSON.stringify({
        content: input,
        accesstoken: getAccessToken(),
      }),
    );

    ChattingServiceKit.sendMessage(
      {
        content: input,
        // accesstoken: getAccessToken(),
      },
      {
        headers: {
          Authorization: getAccessToken(),
          'Content-Type': 'application/json',
        },
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

  return (
    <>
      <MessageSendButton onClick={handleClick}>메세지보내기</MessageSendButton>
      <input type="text" onChange={handleChange} />
    </>
  );
};
export default ChatTest;

const MessageSendButton = styled.button`
  width: 14rem;
  height: 4rem;
  font-size: 2rem;
`;
