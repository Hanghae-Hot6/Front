import sockJS from 'sockjs-client';

import {Stomp} from '@stomp/stompjs';

type MessageObjectType = {
  message: string;
  // Accesstoken: string | undefined;
  type: string;
  chatRoomId: number | string;
  sender: string | null;
};

type functionType = ({...props}) => void;

class ChattingService {
  socket = new sockJS(`${process.env.REACT_APP_BASE_URL}/wss/chat`);

  stompClient = Stomp.over(this.socket);

  chatRoomId = '';

  // 방 id 받기

  receiveRoomId = (roomId: string) => {
    this.chatRoomId = roomId;
  };
  // 웹소켓 연결 요청 & 구독 요청

  onConnect = (
    roomNo: string, // 채팅룸 고유주소

    headers = {}, // headers에 {} 인증요청 집어 넣기
    callback: any = () => {},
    userId: string | null,
  ) => {
    let receivingMessage = '';

    this.stompClient.connect(headers, () => {
      console.log('연결됬음');
      this.stompClient.subscribe(`/sub/chat/room/${roomNo}`, data => {
        receivingMessage = JSON.parse(data.body);
        // 연결 성공시 발동시킬 콜백 넣기
        // 주로 메세지를 받는 로직을 여기에 넣는다

        callback(receivingMessage);
      });
      this.stompClient.send(
        '/pub/chat/message',
        headers,
        JSON.stringify({
          type: 'ENTER',
          roomNo: roomNo,
          sender: userId,
        }),
      );
    });
    return receivingMessage;
  };

  // 메세지 전송

  sendMessage = (headers = {}, messageObject: MessageObjectType) => {
    this.stompClient.send(
      '/pub/chat/message',
      headers,
      JSON.stringify(messageObject),
    );
    // this.stompClient.send('/app/hello', {}, messageObject);
  };

  receiveMessage = () => {};

  onDisconnect = () => {
    this.stompClient.disconnect();
    // this.stompClient = null;
    console.log('disconnected');
  };
}

export default ChattingService;
