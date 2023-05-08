/* eslint-disable no-unused-vars */
import { html, render } from 'lit-html';
import { $, $$ } from '@/helpers/variables';
import { LoginModal, modalTemplate } from '@/components/modal';
import '@/css/chat.css';
import socket from '@/socket.js';
import { addObserver, getState, setState } from '@/state.js';
import { receiveMessage } from './sockets/receiceMessage';
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
          <label for="new-room-name">Create Room</label>
          <div class="input-group">
          <input id="new-room-name" type="text" placeholder="room name" />
          <button type='submit'>Create Room</button>
          </div>
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
    const { user } = getState();
    console.log('connected!', this);
    const roomsDiv = this.querySelector('#message-groups');
    const messageInput = this.querySelector('#message-input');
    const messageForm = this.querySelector('#message-form');
    const messageList = $('.message-list');
    const messageListContainer = this.querySelector('.message-list-container');
    const roomsList = this.querySelector('#rooms-list');
    const createRoomForm = this.querySelector('#create-room-form');
    const newRoomName = this.querySelector('#new-room-name');

    createRoomForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (newRoomName.value) {
        socket.emit('create-room', newRoomName.value);
        newRoomName.value = '';
      }
    });

    socket.on('output-rooms', (roomArray) => {
      const { rooms } = getState();

      roomArray.forEach((room) => {
        const roomItem = document.createElement('button');
        roomItem.setAttribute('value', room._id);
        roomItem.setAttribute('class', 'room-item');
        roomItem.addEventListener('click', (e) => {
          const allRooms = $$('.room-item');
          allRooms.forEach((element) => {
            element.classList.remove('active');
          });

          roomItem.classList.add('active');

          messageList.innerHTML = '';
          let { user } = getState();
          let room_id = room._id;
          setState({ room: room, messages: [] });

          socket.emit('join', { name: user.name, room_id, user_id: user._id });

          socket.emit('get-messages-history', room_id);
          socket.on('output-message', (msgs) => {
            messageList.innerHTML = '';
            setState({ messages: [] });
            setState({ messages: msgs });
            const { messages } = getState();
            const messageArray = messages;
            messages.forEach((element) => {
              receiveMessage(element);
            });
          });
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
        setState({ message: messageInput.value });
        let { user, room } = getState();

        let messageObject = {
          msg: messageInput.value,
          room: room._id,
          name: user.name,
        };
        let room_id = room._id;
        let msg = messageInput.value;
      
        socket.emit('send-message', { msg: msg, room_id: room_id });
        setState({ message: '' });
        // const item = document.createElement('li');
        // // item.textContent = messageInput.value;
        // item.setAttribute('class', 'message my-message');

        // item.innerHTML = /*html*/ `
        // <p>${messageInput.value}</p><span class="time">${user.name}</span>
        // `;

        // messageList.appendChild(item);
        // messageListContainer.scrollTo({
        //   top: messageList.scrollHeight,
        //   left: 0,
        //   behavior: 'smooth',
        // });
        messageInput.value = '';
      }
    });
    const { room } = getState();
    console.log(room);
    // let room_id = room._id;
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
