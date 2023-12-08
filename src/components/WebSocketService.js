import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL = 'http://localhost:8080/ws';

let stompClient;

const initializeWebSocketConnection = (userId, onMessageReceived) => {
  const socket = new SockJS(SOCKET_URL);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);

    // Subscribe to a user-specific channel
    stompClient.subscribe(`/user/${userId}`, (message) => {
      const messageBody = JSON.parse(message.body);
      onMessageReceived(messageBody);
    });
  });
};

const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
  console.log('Disconnected');
};

export { initializeWebSocketConnection, disconnectWebSocket, sendMessage };
