/* eslint-disable no-unused-vars */
// const express = require('express');
// const ViteExpress = require('vite-express');
// const cors = require('cors');
// const http = require('http');
import express from 'express';
import session from 'express-session';
import ViteExpress from 'vite-express';
import cors from 'cors';
import http from 'http';
// const socket = require('socket.io');
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import multer from 'multer';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as socketioJwt from 'socketio-jwt';
import { register, login, logout } from './controllers/authController.js';
import User from './models/User.js';
import Room from './models/Room.js';
import Message from './models/Message.js';
import { addUser, getUser, removeUser } from './utils.js';
import { config, mongooseMiddleware } from './config.js';
const upload = multer();
dotenv.config();

const PORT = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET;
const maxAge = 24 * 60 * 60;

const app = express();

const CorsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*',
  exposedHeaders: '*',
  credentials: true,
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
const createJWT = (id) => {
  return jwt.sign({ id }, 'chatroom secret', {
    expiresIn: maxAge, // in token expiration, calculate by second
  });
};

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server is listeningon ${PORT}!`);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors(CorsOptions));
app.use(sessionMiddleware);
app.options('*', cors(CorsOptions));
app.use(express.json());
app.use(express.static('public'));

app.post('/login', login);
app.post('/register', register);
app.get('/logout', logout);

app.get('/hello', (req, res) => {
  res.send('Hello Vite!');
});

// const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

// io.use(wrap(sessionMiddleware));

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

// io.use(
//   socketioJwt.authorize({
//     secret: process.env.SESSION_SECRET,
//     handshake: true,
//     auth_header_required: false,
//   })
// );

// io.use((socket, next) => {
//   const session = socket.request.session;
//   if (session && session.authenticated) {
//     next();
//   } else {
//     next(new Error('unauthorized'));
//   }
// });

// config(app, io);

mongoose.connect(process.env.MONGO_DB, { dbName: process.env.DB_NAME,useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch(err => console.log(err))


io.on('connection', (socket) => {
  // mongoose
  //   .connect(process.env.MONGO_DB, {
  //     dbName: process.env.DB_NAME,
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  //   .then(() => console.log('connected'))
  //   .catch((err) => console.log(err));

  console.log('user connected');
  console.log(socket.request.session);
  console.log(socket.id);

  Room.find().then((result) => {
    socket.emit('output-rooms', result);
  });
  socket.on('create-room', (name) => {
    const room = new Room({ name });
    room.save().then((result) => {
      io.emit('room-created', result);
    });
  });

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

  socket.on('register', async (user) => {
    console.log(user);

    const { name, email, password } = user;
    try {
      const loginUser = await User.create({ email, name, password });
      socket.emit('user', loginUser);
      // create a cookie name as jwt and contain token and expire after 1 day
      // in cookies, expiration date calculate by milisecond
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('login', async (user) => {
    console.log(user);
    const { password, email } = user;
    try {
      const loginUser = await User.login(email, password);

      console.log(loginUser);

      // socket.handshake.session.userdata = loginUser;
      // socket.handshake.session.save();
      socket.emit('user', loginUser);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

ViteExpress.bind(app, io);
