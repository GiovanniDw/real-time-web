import { io } from 'socket.io-client';
const serverURL = import.meta.env.SERVER_URL;


const URL = process.env.NODE_ENV === 'production' ? undefined : serverURL;
export const socket = io(URL, {
  withCredentials: true,
  autoConnect: true,
  cors: '*',
});

export default socket;
