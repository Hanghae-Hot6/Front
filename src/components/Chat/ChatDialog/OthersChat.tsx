import React from 'react';
import styled from 'styled-components';
import {ChatType} from '../ChatRoom/ChatRoom';

type OthersChatProps = {
  chatObject: ChatType;
};

const OthersChat = ({chatObject}: OthersChatProps) => {
  const date: string = chatObject.date;
  const newDate = date.substring(18, 26);

  return (
    <>
      <Sender>{chatObject.sender}</Sender>
      <ChatBox>
        <OthersChatDiv>
          <SpanDiv>
            <MessageSpan>{chatObject.message}</MessageSpan>
          </SpanDiv>
        </OthersChatDiv>
        <Date>{newDate}</Date>
      </ChatBox>
    </>
  );
};
export default OthersChat;

const OthersChatDiv = styled.div`
  display: inline-block;
  margin: 0.4rem 0;
  /* margin-right: auto; */
  padding: 2rem;
  border-radius: 1rem 1rem 1rem 0;
  background-color: ${props => props.theme.LightGray2};
`;

const SpanDiv = styled.div`
  /* float: right; */
  color: ${props => props.theme.Black};
`;
const ChatBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: end;
`;
const MessageSpan = styled.span`
  font-size: 1.2rem;
`;
const Sender = styled.p`
  margin-top: 1.2rem;
  font-size: 1.2rem;
  color: #767676;
`;
const Date = styled.p`
  text-align: left;
  color: ${props => props.theme.LightGray};
  margin-left: 0.6rem;
  margin-bottom: 0.6rem;
`;
