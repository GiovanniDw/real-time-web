/* eslint-disable no-unused-vars */
import 'vite/modulepreload-polyfill'
import '@/css/reset.css';
import '@/css/main.css';

// import { html, render } from 'lit-html';
// import { io } from "socket.io-client";

import { $, $$, app, html } from '@/helpers/variables';

// import { renderHeader, header } from '@/components/Header.js';
import ChatComponent from '@/components/Chat.js';
import Header from '@/components/Header.js';
import DrawComponent from '@/components/DrawComponent.js';
// import loginModal, { modalTemplate } from '@/components/modal.js';
import socket from '@/socket.js';
import { receiveMessage } from './components/sockets/receiceMessage';
const { token } = sessionStorage;

import { getState, setState } from '@/state';
import verifyUser from './helpers/verifyUser';

// app.innerHTML() = _App();
//https://vijaypushkin.medium.com/dead-simple-state-management-in-vanilla-js-6481c53f7439
const App = function _App() {
  return /*html*/ `
<header-component data-user="false" id="header"></header-component>
<chat-component></chat-component>
  `;
};

app.innerHTML = App();

if ('customElements' in window) {
  customElements.define('header-component', Header);
  customElements.define('chat-component', ChatComponent);
  customElements.define('draw-component', DrawComponent);
}

socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.on('connect', (socket) => {
  console.log('socketconnection');
});

app.addEventListener('DOMContentLoaded', () => {});

socket.on('receive-message', receiveMessage);

socket.on('login', (user) => {
  console.log(user);
  setState({ user: user });
});
