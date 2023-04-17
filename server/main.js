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


ViteExpress.bind(app, server);

