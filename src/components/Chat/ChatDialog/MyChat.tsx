import React from 'react';
import styled from 'styled-components';
import {ChatType} from '../ChatRoom/ChatRoom';

type MyChatProps = {
  chatObject: ChatType;
};

const MyChat = ({chatObject}: MyChatProps) => {
  const date: string = chatObject.date;
  const newDate = date.substring(18, 26);
  return (
    <>
      <ChatBox>
        <Date>{newDate}</Date>
        <MyChatDiv>
          <SpanDiv>
            <MessageSpan>{chatObject.message}</MessageSpan>
          </SpanDiv>
        </MyChatDiv>
      </ChatBox>
    </>
  );
};
export default MyChat;

const MyChatDiv = styled.div`
  margin: 0.4rem 0;
  /* margin-left: auto; */
  padding: 2rem;
  border-radius: 1rem 1rem 0 1rem;
  background-color: ${props => props.theme.MainColor};
`;
const ChatBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
`;
const SpanDiv = styled.div`
  float: right;
  color: ${props => props.theme.White};
`;

const MessageSpan = styled.span`
  font-size: 1.2rem;
`;
const Date = styled.p`
  text-align: right;
  color: ${props => props.theme.LightGray};
  margin-right: 0.6rem;
  margin-bottom: 0.6rem;
`;
