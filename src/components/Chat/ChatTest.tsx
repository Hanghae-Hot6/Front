import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {getAccessToken} from '../../utils';
import ChattingService from './SockJsClass';

type ChatTestProps = {};

const ChattingServiceKit = new ChattingService();

const ChatTest = ({}: ChatTestProps) => {
  const [input, setInput] = useState<string>('');

  ChattingServiceKit.onConnect('/topic/greetings', {}, (newMessage: any) =>
    console.log(newMessage),
  );

  const handleClick = useCallback(() => {
    // ChattingServiceKit.sendMessage({
    //   content: { nickname: '안녕하세요 연태님' },
    // });
    console.log('hi');

    ChattingServiceKit.sendMessage(
      {
        content: input,
      },
      {
        Authorization: getAccessToken(),
        'Content-Type': 'application/json',
      },
    );
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    setInput(e.target.value);
  };

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
