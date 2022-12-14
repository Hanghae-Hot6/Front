import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled, {Keyframes, keyframes} from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import KeyDetector from '../../../common/KeyDetector';

import MyChat from '../ChatDialog/MyChat';
import OthersChat from '../ChatDialog/OthersChat';

import ChattingService from '../ChattingService';
import PaperPlaneRight from '../../../assets/PaperPlaneRight.svg';
import {ChatRoomType, ChatType} from '../../../types/chat';

import useMessageBoxHooks from './useMessageBoxHooks';
import useInfiniteScrollHooks from './useInfiniteScrollHooks';
import {spinnerKeyframes} from '../../../utils/styledComponentsUtils';

type ChatRoomProps = {
  chatRoomNowInfo: ChatRoomType;
};

const ChatRoom = ({chatRoomNowInfo}: ChatRoomProps) => {
  const accessToken = getAccessToken();
  const userId = getUserIdFixed();

  const [input, setInput] = useState<string>('');
  const [receiveMsg, setReceiveMsg] = useState<ChatType | undefined>(undefined);
  const [messageList, setMessageList] = useState<ChatType[]>([]);

  const [onConnect, setOnConnect] = useState<boolean>(false);

  const {messageBoxRef, scrollToBottom} = useMessageBoxHooks();
  const {
    chatRoomTopObserver,
    fetchChatRoomMessages,
    prevMessageList,
    isLoading,
  } = useInfiniteScrollHooks(chatRoomNowInfo.chatRoomId);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // 채팅 서비스 킷 생성
  const ChattingServiceKit = useMemo(() => {
    return new ChattingService(chatRoomNowInfo.chatRoomId);
  }, [chatRoomNowInfo.chatRoomId]);

  // onConnect시 메시지 받아오기
  useEffect(() => {
    ChattingServiceKit.onConnect(
      getAccessToken(),
      {
        Authorization: accessToken,
        type: 'TALK',
      },
      (receivingMessage: ChatType) => {
        setReceiveMsg(receivingMessage);
        setOnConnect(true);
      },

      userId,
      'ChatRoom',
    );
    fetchChatRoomMessages();
  }, []);

  // 메세지 배열안에 모으기

  useEffect(() => {
    if (receiveMsg) {
      setMessageList([...messageList, receiveMsg]);
    }
  }, [receiveMsg]);

  // 언마운트시 소켓 통신 종료하기

  useEffect(() => {
    return () => {
      // 작동을 잘 안함
      if (onConnect) {
        ChattingServiceKit.sendMessage(
          {},
          {
            chatRoomId: chatRoomNowInfo.chatRoomId,
            message: `${userId}님이 채팅방에서 나가셨습니다`,
            type: 'TALK',
            sender: userId,
          },
        );
        setOnConnect(false);
      }

      ChattingServiceKit.onDisconnect(userId);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList.length]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleClick = useCallback(() => {
    if (input !== '') {
      ChattingServiceKit.sendMessage(
        {},
        {
          chatRoomId: chatRoomNowInfo.chatRoomId,
          message: input,
          type: 'TALK',
          sender: userId,
        },
      );
    }

    setInput('');
  }, [input, userId]);

  const handleKeyPress = (key: any) => {
    if (key === 'Enter') {
      buttonRef.current!.click();
    }
  };

  return (
    <>
      <ChattingList ref={messageBoxRef}>
        <TestDiv>
          <div ref={chatRoomTopObserver} />
          {/* <LoadingSpinner spinnerKeyframes={spinnerKeyframes} /> */}
          {isLoading && <LoadingSpinner spinnerKeyframes={spinnerKeyframes} />}

          {prevMessageList.map((val, index) => {
            if (val.sender === userId) {
              return (
                <div key={index}>
                  <MyChat chatObject={val} />
                </div>
              );
            } else {
              return <OthersChat key={index} chatObject={val} />;
            }
          })}
          {messageList.map((val, index) => {
            if (val.sender === userId) {
              return (
                <div key={index}>
                  <MyChat chatObject={val} />
                </div>
              );
            } else {
              return <OthersChat key={index} chatObject={val} />;
            }
          })}
        </TestDiv>
      </ChattingList>
      <ThinLine color={Theme.LightGray2} thick="2px" marginTopBottom="1rem" />

      <ChatInputDiv>
        <ChatInputInput
          type="text"
          placeholder="메세지를 입력하세요"
          onChange={handleChange}
          value={input}
        />
        <SendButton onClick={handleClick} ref={buttonRef}>
          <img src={PaperPlaneRight} alt="전송버튼" />
        </SendButton>
      </ChatInputDiv>
      <KeyDetector sendKeyValue={handleKeyPress} />
    </>
  );
};
export default ChatRoom;

const TestDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingSpinner = styled.div<{spinnerKeyframes: Keyframes}>`
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 3rem;
  height: 3rem;
  border: 0.6rem solid rgba(163, 129, 129, 0.1);
  border-right: 0.6rem solid ${props => props.theme.MainColor};
  border-radius: 50%;
  animation: ${({spinnerKeyframes}) => spinnerKeyframes} 1s linear infinite;
`;

const ChattingList = styled.div`
  display: flex;
  flex-direction: column;
  height: 40rem;
  overflow: auto;
  flex: 8;
  padding: 0 1rem;
  position: relative;
`;

const ChatInputDiv = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
`;

const ChatInputInput = styled.input`
  flex: 7;
  background-color: ${props => props.theme.LightGray2};
  border: none;
  border-radius: 0.8rem;
  padding: 1.5rem;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 576px) {
    width: 200px;
    border: none;
    box-shadow: none;
  }
`;

const SendButton = styled.button`
  flex: 1;
  background-color: #fff;
`;

const IAMLOADING = styled.div`
  font-size: 3rem;
`;
