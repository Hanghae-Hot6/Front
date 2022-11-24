import React from 'react';
import styled from 'styled-components';
import {ChatType} from '../ChatRoom/ChatRoom';

type MyChatProps = {
  chatObject: ChatType;
};

const MyChat = ({chatObject}: MyChatProps) => {
  return (
    <>
      <MyChatDiv>
        <SpanDiv>
          <span>
            {chatObject.sender} {'    '}
            {chatObject.message}
          </span>
        </SpanDiv>
      </MyChatDiv>
    </>
  );
};
export default MyChat;

const MyChatDiv = styled.div`
  margin: 0.4rem 0;
  margin-left: auto;
  width: 70%;
  border: 1px solid black;
  padding: 2rem;
  border-radius: 1rem 1rem 0 1rem;
`;

const SpanDiv = styled.div`
  float: right;
`;
