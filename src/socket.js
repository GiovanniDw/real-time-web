import { io } from "socket.io-client";


const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
export const socket = io(URL, {
  // withCredentials: false,
  autoConnect: true,
  cors: "*"
});


export default socket