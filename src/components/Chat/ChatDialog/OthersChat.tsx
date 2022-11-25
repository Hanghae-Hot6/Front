import React from 'react';
import styled from 'styled-components';
import {ChatType} from '../ChatRoom/ChatRoom';

type OthersChatProps = {
  chatObject: ChatType;
};

const OthersChat = ({chatObject}: OthersChatProps) => {
  return (
    <>
      <OthersChatDiv>
        <SpanDiv>
          <MessageSpan>{chatObject.message}</MessageSpan>
        </SpanDiv>
      </OthersChatDiv>
    </>
  );
};
export default OthersChat;

const OthersChatDiv = styled.div`
  margin: 0.4rem 0;
  width: 70%;
  padding: 2rem;
  border-radius: 1rem 1rem 1rem 0;
  background-color: ${props => props.theme.LightGray2};
`;

const SpanDiv = styled.div`
  /* float: right; */
  color: ${props => props.theme.Black};
`;

const MessageSpan = styled.span`
  font-size: 1.2rem;
`;
