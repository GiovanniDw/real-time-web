/* eslint-disable no-unused-vars */
import { html, render } from 'lit-html';
import { $, $$ } from '@/helpers/variables';
import { LoginModal, modalTemplate } from '@/components/modal';
import '@/css/chat.css';
import socket from '@/socket.js';
import {getState} from '@/state.js';
// import { socket } from '../app.js';

class ChatComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    console.log('Constructed', this);
    this.innerHTML = /*html*/ `
      <div id="message-groups">
        <h2>Rooms</h2>
        <div id='rooms-list'></div>
        <form id="create-room-form" action="">
          <h2>Create A room</h2>
          <label for="new-room-name">Room Name</label>
          <input id="new-room-name" type="text" placeholder="room name" />
          <input type='submit'>
        </form>
      </div>
      <div class="message-container">
        <div class="message-list-container">
          <ul class="message-list"></ul>
        </div>
        <form id="message-form">
          <input id="message-input" placeholder="your message" type="text" />
        </form>
      </div>
    `;
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    const {user } = getState();
    console.log('connected!', this);
    const roomsDiv = this.querySelector('#message-groups');
    const messageInput = $('#message-input');
    const messageForm = $('#message-form');
    const messageList = $('.message-list');
    const messageListContainer = $('.message-list-container');
    const roomsList = $('#rooms-list');

    const createRoomForm = this.querySelector('#create-room-form');
    const newRoomName = this.querySelector('#new-room-name');

    createRoomForm.addEventListener('submit', function (e) {
      if (newRoomName.value) {
        socket.emit('create-room', newRoomName.value);
      }
    });

    socket.on('output-rooms', (roomArray) => {
      console.log(roomArray);
      roomsList;

      roomArray.forEach((room) => {
        const roomItem = document.createElement('button');
        roomItem.setAttribute('value', room._id);
        roomItem.setAttribute('class', 'room-item');
        roomItem.addEventListener('click', (e) => {
          console.log(e);
          console.log(roomItem.value);
        });
        roomItem.innerHTML = /*html*/ `
        ${room.name}
        `;
        roomsList.appendChild(roomItem);
      });
    });

    messageForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (messageInput.value) {
        console.log(messageInput.value);
        const { user } = getState();

        let messageObject = {
          user: user,
          username: user.name,
          msg: messageInput.value
        }
        console.log(messageObject);
        socket.emit('send-message', messageObject);
        const item = document.createElement('li');
        // item.textContent = messageInput.value;
        item.setAttribute('class', 'message my-message');


        item.innerHTML = /*html*/`
        <p>${ messageInput.value }</p><span class="time">${user.name}</span>
        `;
      

        messageList.appendChild(item);
        messageListContainer.scrollTo({
          top: messageList.scrollHeight,
          left: 0,
          behavior: 'smooth',
        });
        messageInput.value = '';
      }
    });
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    console.log('disconnected', this);
  }
}

// export const renderChat = (container, socket) => {
//   const chatTemplate = () => html`
//     <main>
//       <div class="message-container">
//         <ul class="message-list"></ul>
//       </div>
//       <form id="message-form">
//         <input id="message-input" placeholder="your message" type="text" />
//       </form>
//     </main>
//   `;

//   render(chatTemplate(), container);

//   const messageInput = $('#message-input');
//   const messageForm = $('#message-form');

//   messageForm.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     if (messageInput.value) {
//       await socket.emit('send-message', messageInput.value);
//       const item = document.createElement('li');
//       item.textContent = messageInput.value;
//       item.setAttribute('class', 'message my-message');
//       messageList.appendChild(item);
//       window.scrollTo(0, document.body.scrollHeight);

//       messageInput.value = '';
//     }
//   });

//   // socket.on('connect', () => {
//   // });

//   // socket.on('receive-message', function (msg) {
//   //   const item = document.createElement('li');
//   //   item.textContent = msg;
//   //   item.setAttribute('class', 'message');
//   //   messageList.appendChild(item);
//   //   window.scrollTo(0, document.body.scrollHeight);

//   // });
// };

// if ('customElements' in window) {
//   customElements.define('chat-component', ChatComponent);
// }

export default ChatComponent;
