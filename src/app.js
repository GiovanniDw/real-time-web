import '@/css/style.css';
import { html, render } from 'lit-html';
// import { io } from "socket.io-client";

import { $, $$, app } from '@/helpers/variables';

import javascriptLogo from './javascript.svg';

import { renderHeader, header } from '@/components/Header';
import ChatComponent, { renderChat } from '@/components/Chat.js';
import HeaderComponent from '@/components/HeaderComponent.js';
import loginModal, { modalTemplate } from '@/components/modal.js';
import socket from '@/socket.js';
import { receiveMessage } from './components/sockets/receiceMessage';
// import "@/components/HeaderComponent.js"

// const header = document.querySelector('header');

// const main = app.querySelector('main');
// render(headerTemplate(), app)
// const renderHome = (app) => {

// const App = function _App() {
//   return /*html*/`
// <header-component></header-component>
//   <main>
//     <chat-component></chat-component>
//   </main>
// <footer></footer>
// <login-modal></login-modal>
// `;
// }

// app.innerHTML() = _App();

const App = function _App() {
  return /*html*/ `
  <header-component></header-component>
  <main>
    <chat-component></chat-component>
  </main>
<footer></footer>

  `;
};

app.innerHTML = App();

// render(template, app)
// renderChat(main, socket);
// const main = app.querySelector('main');
// const renderBeforeFooter = app.querySelector('footer');

// render(chatTemplate(), main)

// renderHeader(app);
// renderChat(app, socket);

// console.log(renderBeforeFooter)
app.addEventListener('DOMContentLoaded', () => {});

//

// setupCounter(document.querySelector("#counter"));

console.log(URL);

if ('customElements' in window) {
  customElements.define('header-component', HeaderComponent);
  customElements.define('chat-component', ChatComponent);
  customElements.define('login-modal', loginModal);
}

const messageForm = $('#message-form');
const ul = $('.message-list');
const input = $('#message-input');
const loginInput = $('#username');
const loginForm = $('#login-form');
// const btn = $('header-component').shadowRoot.querySelector('#loginBtn');

// LoginModal(btn, modal);

// messageForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   if (input.value) {
//     console.log(socket.userID);
//     socket.emit('send-message', input.value);
//     const item = document.createElement('li');
//     item.textContent = input.value;
//     item.setAttribute('class', 'message my-message');
//     ul.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);

//     input.value = '';
//   }
// });
// let usernameAlreadySelected = false;
// loginForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   if (loginInput.value) {
//     let username = loginInput.value;
//     console.log(username);
//     socket.emit('set-username', username);
//     socket.auth = {username}

//     loginInput.value = username;
//   }
// });
// const onUsernameSelection = (username) => {
//   usernameAlreadySelected = true;
//   socket.auth = { username };
//   socket.connect();
// }
// const span = $('.close');

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal

// span.onclick = function () {
//   modal.style.display = 'none';
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// };

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on('connect', (socket) => {
  // console.log(socket.id);
});

// socket.on('receive-message', function (msg) {
//   const item = document.createElement('li');
//   item.textContent = msg;
//   item.setAttribute('class', 'message');
//   ul.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });

socket.on('receive-message', receiveMessage);
