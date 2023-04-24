// const express = require('express');
// const ViteExpress = require('vite-express');
// const cors = require('cors');
// const http = require('http');
import express from 'express';
import ViteExpress from 'vite-express';
import cors from 'cors';
import http from 'http';
// const socket = require('socket.io');
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import multer from 'multer';
const upload = multer();
dotenv.config();

const PORT = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET;

const app = express();

const CorsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*',
  exposedHeaders: '*',
  credentials: true,
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(cors(CorsOptions));

app.options('*', cors(CorsOptions));



const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server is listeningon ${PORT}!`);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.use(express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello Vite!');
});





// io.use((socket, next) => {
//   const sessionID = socket.handshake.auth.sessionID;
//   if (sessionID) {
//     // find existing session
//     const session = sessionStore.findSession(sessionID);
//     if (session) {
//       socket.sessionID = sessionID;
//       socket.userID = session.userID;
//       socket.username = session.username;
//       return next();
//     }
//   }
//   const username = socket.handshake.auth.username;
//   if (!username) {
//     return next(new Error("invalid username"));
//   }
//   // create new session
//   socket.sessionID = randomId();
//   socket.userID = randomId();
//   socket.username = username;
//   next();
// });

io.on('connection', (socket) => {
  console.log('user connected');
  console.log(socket.id);

  //   socket.emit("session", {
  //     sessionID: socket.sessionID,
  //     userID: socket.userID,
  //   });

  //   socket.on('send-nickname', function(nickname) {
  //     socket.nickname = nickname;
  //     users.push(socket.nickname);
  //     console.log(users);
  // });

  socket.on('send-message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('receive-message', msg);
  });
  
  socket.on('set-username', (username) => {
    console.log(username);
    socket.emit('receive-message', username);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

ViteExpress.bind(app, io);
