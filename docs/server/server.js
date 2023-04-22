import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3e3;
process.env.SESSION_SECRET;
const app = express();
const CorsOptions = {
  origin: "http://giovannis-macbook-pro.local:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: true
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server is listeningon ${PORT}!`);
});
app.use(cors(CorsOptions));
app.options("*", cors(CorsOptions));
const io = new Server(server, {
  cors: {
    origin: "http://giovannis-macbook-pro.local:5173"
  }
});
app.use(express.static("public"));
app.get("/hello", (req, res) => {
  res.send("Hello Vite!");
});
io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.id);
  socket.on("send-message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("receive-message", msg);
  });
  socket.on("set-username", (username) => {
    console.log(username);
    socket.emit("receive-message", username);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
ViteExpress.bind(app, io);
