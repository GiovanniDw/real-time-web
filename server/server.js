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
import cookieParser from 'cookie-parser';
import * as socketioJwt from 'socketio-jwt';
import { register, login, logout, verifyuser } from './controllers/authController.js';
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
// app.use(sessionMiddleware);
app.use(cookieParser());
app.options('*', cors(CorsOptions));
app.use(express.json());
app.use(express.static('public'));

mongoose
  .connect(process.env.MONGO_DB, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

app.get('/login', login);
app.get('/register', register);
app.post('/login', login);
app.post('/register', register);
app.get('/verifyuser', verifyuser);
app.post('/verifyuser', verifyuser);



app.get('/logout', logout);
app.post('/logout', logout);


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
  console.log('session');
  console.log(socket.request.session);
  console.log('ID');
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

  socket.on('join', ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      user_id,
      room_id,
    });
    socket.join(room_id);
    if (error) {
      console.log('join error', error);
    } else {
      console.log('join user', user);
    }
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

  socket.on('send-message', ({msg, room_id, cb}) => {
    const user = getUser(socket.id);
    console.log(msg);
    // socket.emit('receive-message', msg);

    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: msg,
    };
    console.log('messageStore');
    console.log(msgToStore);
    const message = new Message({
      name: user.name,
      user_id: user.user_id,
      room_id: room_id,
      text: msg,
    });
    message.save().then((result) => {
      io.to(room_id).emit('receive-message', result);
    });
  });

  socket.on('get-messages-history', room_id => {
    Message.find({ room_id }).then(result => {
      console.log(result)
        socket.emit('output-message', result)
    })
})

  // socket.on('set-username', (username) => {
  //   console.log(username);
  //   socket.emit('receive-message', username);
  // });

  // Old User Login
  // socket.on('register', async (user) => {
  //   console.log('register user 1');
  //   console.log(user);

  //   const { name, email, password } = user;
  //   try {
  //     const username = email;
  //     const loginUser = await User.create({ username: username, name:name, password: password });
  //     socket.emit('user', loginUser);
  //     // create a cookie name as jwt and contain token and expire after 1 day
  //     // in cookies, expiration date calculate by milisecond
  //   } catch (error) {
  //     console.log(error);
  //     socket.emit('register error', error);

  //   }
  // });

  // socket.on('login', async (user) => {
  //   console.log(user);
  //   let { password, email } = user;
  //   try {
  //     const username = email;
  //     const loginUser = await User.login(username, password);

  //     console.log(loginUser);

  //     // socket.handshake.session.userdata = loginUser;
  //     // socket.handshake.session.save();
  //     socket.emit('user', loginUser);
  //   } catch (error) {
  //     console.log(error);
  //     socket.emit('login error', error);
  //   }
  // });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(user)
    console.log('user disconnected');
  });
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

ViteExpress.bind(app, io);
