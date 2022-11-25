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
          <MessageSpan>{chatObject.message}</MessageSpan>
        </SpanDiv>
      </MyChatDiv>
    </>
  );
};
export default MyChat;

const MyChatDiv = styled.div`
  margin: 0.4rem 0;
  margin-left: auto;
  padding: 2rem;
  border-radius: 1rem 1rem 0 1rem;
  background-color: ${props => props.theme.MainColor};
`;

const SpanDiv = styled.div`
  float: right;
  color: ${props => props.theme.White};
`;

const MessageSpan = styled.span`
  font-size: 1.2rem;
`;
