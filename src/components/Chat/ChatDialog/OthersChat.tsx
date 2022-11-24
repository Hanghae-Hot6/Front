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
        <span>
          {chatObject.sender} {'    '}
          {chatObject.message}
        </span>
      </OthersChatDiv>
    </>
  );
};
export default OthersChat;

const OthersChatDiv = styled.div`
  margin: 0.4rem 0;
`;
