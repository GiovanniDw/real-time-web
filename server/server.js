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
import { register, login, logout, verifyuser } from './controllers/authController.js';

import Room from './models/Room.js';
import Message from './models/Message.js';
import { addUser, getUser, removeUser } from './utils.js';

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
  .then(() => console.log('Mongoose connected'))
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
      io.to(room_id).emit('receive-message', {msg: 'err'});
    } else {
      io.to(room_id).emit('receive-message', {msg: 'hallo', user_id: null});
      console.log('join user', user);
    }
  });

  socket.on('send-message', ({msg, room_id,alert, cb}) => {
    const user = getUser(socket.id);
    console.log(msg);
    console.log(alert);
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
      alert: alert,
    });

    message.save().then((result) => {
      console.log(result)
      io.to(room_id).emit('receive-message', result);
    });
  });

  socket.on('drawing', (data) => {
    console.log(data)

    io.to(data.room_id).emit('drawing', data)
    // socket.broadcast.emit('drawing', data)
  });

  socket.on('get-messages-history', room_id => {
    Message.find({ room_id }).then(result => {
      console.log(result)
        socket.emit('output-message', result)
    })
})

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(user)
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }

    console.log('user disconnected');
  });
});

ViteExpress.bind(app, io);
