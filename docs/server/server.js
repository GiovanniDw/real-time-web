import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
const Schema$2 = mongoose.Schema;
const UserSchema = new Schema$2({
  id: Number,
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  admin: Boolean
});
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.statics.login = async function(username, password) {
  console.log("loginschema");
  console.log(username + password);
  let user = await this.findOne({ username });
  if (user) {
    console.log(user);
    console.log("compare pass");
    console.log(password);
    console.log(user.password);
    let isAuthenticated = await bcrypt.compare(password, user.password);
    if (isAuthenticated) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  } else {
    throw Error("Incorrect email");
  }
};
const User = mongoose.model("User", UserSchema);
const maxAge = 24 * 60 * 60;
const createJWT = (id) => {
  return jwt.sign({ id }, "chatroom secret", {
    expiresIn: maxAge
    // in token expiration, calculate by second
  });
};
const alertError = (err) => {
  let errors = { name: "", email: "", password: "" };
  console.log("err message", err.message);
  console.log("err code", err.code);
  if (err.message === "Incorrect email") {
    errors.email = "This email not found!";
  }
  if (err.message === "Incorrect password") {
    errors.password = "The password is incorrect!";
  }
  if (err.code === 11e3) {
    errors.email = "This email already registered";
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const register = async (req, res) => {
  console.log("reqbody 1");
  console.log(req.body);
  let { username, name, password } = req.body;
  try {
    let newUser = {
      username,
      name,
      password
    };
    console.log("newUser");
    console.log(newUser);
    let user = await User.create({ username, name, password });
    console.log("user");
    console.log(user);
    let token = createJWT(user._id);
    console.log("token");
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1e3 });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};
const login = async (req, res) => {
  let { username, password } = req.body;
  try {
    let user = await User.login(username, password);
    let token = createJWT(user._id);
    console.log("token");
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1e3 });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};
const verifyuser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    console.log("token");
    console.log(token);
    jwt.verify(token, "chatroom secret", async (err, decodedToken) => {
      if (err) {
        console.log("error.msg");
        console.log(err.message);
      } else {
        console.log("decodedToken.id");
        console.log(decodedToken.id);
        let user = await User.findById(decodedToken.id);
        res.json(user);
        next();
      }
    });
  } else {
    next();
  }
};
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ logout: true });
};
const Schema$1 = mongoose.Schema;
const RoomSchema = new Schema$1({
  name: {
    type: String,
    required: true
  }
});
const Room = mongoose.model("Room", RoomSchema);
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  room_id: {
    type: String,
    required: true
  },
  alert: Boolean
}, { timestamps: true });
const Message = mongoose.model("Message", MessageSchema);
const users = [];
const addUser = ({ socket_id, name, user_id, room_id }) => {
  const exist = users.find((user2) => user2.room_id === room_id && user2.user_id === user_id);
  if (exist) {
    return { error: "User already exist in this room" };
  }
  const user = { socket_id, name, user_id, room_id };
  users.push(user);
  console.log("users list", users);
  return { user };
};
const removeUser = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
const getUser = (socket_id) => users.find((user) => user.socket_id === socket_id);
multer();
dotenv.config();
const PORT = process.env.PORT || 3e3;
process.env.SESSION_SECRET;
const app = express();
const CorsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: true
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});
const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server is listeningon ${PORT}!`);
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
app.use(cors(CorsOptions));
app.use(cookieParser());
app.options("*", cors(CorsOptions));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_DB, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Mongoose connected")).catch((err) => console.log(err));
app.get("/login", login);
app.get("/register", register);
app.post("/login", login);
app.post("/register", register);
app.get("/verifyuser", verifyuser);
app.post("/verifyuser", verifyuser);
app.get("/logout", logout);
app.post("/logout", logout);
io.on("connection", (socket) => {
  console.log("user connected");
  console.log("session");
  console.log(socket.request.session);
  console.log("ID");
  console.log(socket.id);
  Room.find().then((result) => {
    socket.emit("output-rooms", result);
  });
  socket.on("create-room", (name) => {
    const room = new Room({ name });
    room.save().then((result) => {
      io.emit("room-created", result);
    });
  });
  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      user_id,
      room_id
    });
    socket.join(room_id);
    if (error) {
      console.log("join error", error);
      io.to(room_id).emit("receive-message", { msg: "err" });
    } else {
      io.to(room_id).emit("receive-message", { msg: "hallo", user_id: null });
      console.log("join user", user);
    }
  });
  socket.on("send-message", ({ msg, room_id, alert, cb }) => {
    const user = getUser(socket.id);
    console.log(msg);
    console.log(alert);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: msg
    };
    console.log("messageStore");
    console.log(msgToStore);
    const message = new Message({
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: msg,
      alert
    });
    message.save().then((result) => {
      console.log(result);
      io.to(room_id).emit("receive-message", result);
    });
  });
  socket.on("drawing", (data) => {
    console.log(data);
    io.to(data.room_id).emit("drawing", data);
  });
  socket.on("get-messages-history", (room_id) => {
    Message.find({ room_id }).then((result) => {
      console.log(result);
      socket.emit("output-message", result);
    });
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
    console.log("user disconnected");
  });
});
ViteExpress.bind(app, io);
