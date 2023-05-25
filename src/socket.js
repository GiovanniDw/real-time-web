import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? 'https://real-time-web-production-3215.up.railway.app' : 'http://localhost:3000';
export const socket = io(URL, {
  autoConnect: true,
  cors: '*',
});

export default socket;
