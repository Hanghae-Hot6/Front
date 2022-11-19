import sockJS from 'sockjs-client';

import {Stomp} from '@stomp/stompjs';

type MessageObjectType = {
  content: string;
};

class ChattingService {
  socket = new sockJS('http://43.201.69.50:8080/gs-guide-websocket');

  stompClient = Stomp.over(this.socket);

  roomId = '';

  // 방 id 받기

  receiveRoomId = (roomId: string) => {
    this.roomId = roomId;
  };
  // 웹소켓 연결 요청 & 구독 요청

  onConnect = (
    roomAddress = '/topic/greetings',
    headers = {},
    callback: any = () => {},
  ) => {
    let newMessage = '';
    // headers에 {} 인증요청 집어 넣기
    this.stompClient.connect(headers, () => {
      console.log('연결됬음');
      this.stompClient.subscribe(roomAddress, data => {
        newMessage = JSON.parse(data.body);
        // 연결 성공시 발동시킬 콜백 넣기
        // 주로 메세지를 받는 로직을 여기에 넣는다
        // 리렌더링

        callback(newMessage);
      });
    });
    return newMessage;
  };

  //

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
