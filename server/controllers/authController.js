import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import socketjwt from 'socketio-jwt';
const maxAge = 24 * 60 * 60;

const createJWT = (id) => {
  return jwt.sign({ id }, 'chatroom secret', {
    expiresIn: maxAge, // in token expiration, calculate by second
  });
};

const alertError = (err) => {
  let errors = { name: '', email: '', password: '' };
  console.log('err message', err.message);
  console.log('err code', err.code);

  if (err.message === 'Incorrect email') {
    errors.email = 'This email not found!';
  }
  if (err.message === 'Incorrect password') {
    errors.password = 'The password is incorrect!';
  }
  if (err.code === 11000) {
    errors.email = 'This email already registered';
    return errors;
  }
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export const register = async (req, res) => {
  console.log('reqbody 1');
  console.log(req.body);
  let { username, name, password } = req.body;
  try {
    let newUser = {
      username: username,
      name: name,
      password: password,
    };
    console.log('newUser');
    console.log(newUser);

    let user = await User.create({ username, name, password });
    console.log('user');
    console.log(user);

    let token = createJWT(user._id);

    // create a cookie name as jwt and contain token and expire after 1 day
    // in cookies, expiration date calculate by milisecond
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};

export const login = async (req, res) => {
  let { username, password } = req.body;
  try {
    let user = await User.login(username, password);
    let token = createJWT(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};

export const verifyuser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'chatroom secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        let user = await User.findById(decodedToken.id);
        res.json(user);
        next();
      }
    });
  } else {
    next();
  }
};

export const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ logout: true });
};
