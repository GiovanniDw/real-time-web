/* eslint-disable no-unused-vars */
import '@/css/main.css';
// import { html, render } from 'lit-html';
// import { io } from "socket.io-client";

import { $, $$, app, html } from '@/helpers/variables';

// import { renderHeader, header } from '@/components/Header.js';
import ChatComponent from '@/components/Chat.js';
import Header from '@/components/Header.js';
// import loginModal, { modalTemplate } from '@/components/modal.js';
import socket from '@/socket.js';
import { receiveMessage } from './components/sockets/receiceMessage';
const {token} = sessionStorage;
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
//https://vijaypushkin.medium.com/dead-simple-state-management-in-vanilla-js-6481c53f7439
const App = function _App() {
  return /*html*/`
<header-component data-user="false" id="header"></header-component>
<chat-component class="chat-container"></chat-component>
<button id='fakeButton'></button>
  `;
};

App.state = {
  loggedIn: 0,
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


//

// setupCounter(document.querySelector("#counter"));

console.log(URL);

if ('customElements' in window) {
  customElements.define('header-component', Header);
  customElements.define('chat-component', ChatComponent);
}

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

  console.log('socketconnection');
});

// socket.on('authenticated', function () {
//     //do other things
//   }).emit('authenticate', {token}); //send the jwt


// socket.on('receive-message', function (msg) {
//   const item = document.createElement('li');
//   item.textContent = msg;
//   item.setAttribute('class', 'message');
//   ul.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });


app.addEventListener('DOMContentLoaded', () => {

});


socket.on('receive-message', receiveMessage);

// const setUser = (msg) => {
//   console.log(msg)
// };
// socket.on('user', setUser);


