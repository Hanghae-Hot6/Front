import sockJS from 'sockjs-client';

import {Stomp} from '@stomp/stompjs';

type MessageObjectType = {
  content: string;
};

class ChattingService {
  socket = new sockJS(`${process.env.REACT_APP_BASE_URL}/gs-guide-websocket`);

  stompClient = Stomp.over(this.socket);

  roomId = '';

  // 방 id 받기

  receiveRoomId = (roomId: string) => {
    this.roomId = roomId;
  };
  // 웹소켓 연결 요청 & 구독 요청

  onConnect = (
    roomAddress = '/topic/greetings', // 채팅룸 고유주소
    headers = {}, // headers에 {} 인증요청 집어 넣기
    callback: any = () => {},
  ) => {
    let newMessage = '';

    this.stompClient.connect(headers, () => {
      console.log('연결됬음');
      this.stompClient.subscribe(roomAddress, data => {
        newMessage = JSON.parse(data.body);
        // 연결 성공시 발동시킬 콜백 넣기
        // 주로 메세지를 받는 로직을 여기에 넣는다

        callback(newMessage);
      });
    });
    return newMessage;
  };

  // 메세지 전송

  sendMessage = (messageObject: MessageObjectType, headers = {}) => {
    this.stompClient.send('/app/hello', headers, JSON.stringify(messageObject));
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
