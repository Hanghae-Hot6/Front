import React from 'react';
import styled from 'styled-components';

type ChatInputProps = {};

const ChatInput = ({}: ChatInputProps) => {
  return (
    <>
      <ChatInputDiv>
        <ChatInputInput type="text" placeholder="메세지를 입력하세요" />
        <SendButton>전송</SendButton>
      </ChatInputDiv>
    </>
  );
};
export default ChatInput;

const ChatInputDiv = styled.div`
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
