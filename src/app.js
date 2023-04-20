import '@/css/style.css';
import { html, render } from 'lit-html';
// import { io } from "socket.io-client";
import { io } from "socket.io-client";
import { $, $$, app } from '@/helpers/variables';
// import * as io from "socket.io";
// import { setupCounter } from "./counter.js";
import javascriptLogo from './javascript.svg';
import { LoginModal, modalTemplate } from '@/components/modal';
import { headerTemplate, renderHeader } from '@/components/Header';




const template = () => html`
  ${headerTemplate()}
  <main>
    <div class="message-container">
      <ul class="message-list"></ul>
    </div>
    <form id="message-form">
      <input id="message-input" placeholder="your message" type="text" />
    </form>
  </main>
  ${modalTemplate()}
  <footer></footer>
`;

render(template(), app);

// renderHeader(app, renderBeforeMain);
const header = document.querySelector('header');

const renderBeforeFooter = app.querySelector('footer');
const renderBeforeMain = app.querySelector('main');
console.log(renderBeforeFooter)
app.addEventListener('DOMContentLoaded', () => {});

//

// setupCounter(document.querySelector("#counter"));

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
console.log(URL)
export const socket = io(URL, {
  // withCredentials: false,
  autoConnect: true,
  cors: "*"
});

const messageForm = $('#message-form');
const ul = $('.message-list');
const input = $('#message-input');
const loginInput = $('#username');
const loginForm = $('#login-form')
const btn = $('#loginBtn');
const modal = $('#loginModal');
// LoginModal(btn, modal);

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    console.log(socket.userID);
    socket.emit('send-message', input.value);
    const item = document.createElement('li');
    item.textContent = input.value;
    item.setAttribute('class', 'message my-message');
    ul.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    input.value = '';
  }
});
// let usernameAlreadySelected = false;
loginForm.addEventListener('submit', function (e) {
  
  e.preventDefault();
  if (loginInput.value) {
    let nickname = loginInput.value;
    console.log(socket.auth);
    socket.emit('send-nickname', nickname);
    socket.auth = {nickname}
    console.log(socket.auth)

    input.value = '';
  }
});
// const onUsernameSelection = (username) => {
//   usernameAlreadySelected = true;
//   socket.auth = { username };
//   socket.connect();
// }
const span = $('.close');

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};



// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });


socket.on('connect', (socket) => {
  console.log(socket.auth);
  
});



socket.on('receive-message', function (msg) {
  console.log(socket.id);
  const item = document.createElement('li');
  item.textContent = msg;
  item.setAttribute('class', 'message');
  ul.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
