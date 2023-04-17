const express = require('express');
const ViteExpress = require('vite-express');
const http = require("http");
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app).listen(3000, () => { 
  console.log("Server is listening!")
});

const io = new Server(server);


app.use(express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello Vite!');
});
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("receive-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

ViteExpress.bind(app, server);

