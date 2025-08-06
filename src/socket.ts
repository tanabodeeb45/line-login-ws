import { io } from 'socket.io-client';

//core endpoint for the socket connection
const socket = io('http://localhost:3001/iot/devices', {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('accessToken') || ''
  },
  transports: ['websocket'],
});

export default socket;
