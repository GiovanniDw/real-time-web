/* eslint-disable no-unused-vars */

import socket from '@/socket.js';
import '@/css/chat.scss';


import { $, $$ } from '@/helpers/variables';
import { LoginModal, modalTemplate } from '@/components/modal';
import { addObserver, getState, setState } from '@/state.js';
import { receiveMessage } from '@/components/sockets/receiceMessage';
import WhiteBoard from './WhiteBoard';

class ChatComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // const { isLoggedIn } = getState();

    const template = /*html*/ `
    <div class="chat-container">
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
      <draw-component id="draw-component"></draw-component>
      <div class="message-container">
        <div class="message-list-container">
          <ul class="message-list">
            <li class='message alert'>Please Select or Create a room to chat in</li>
          </ul>
        </div>
        <form id="message-form">
          <input id="message-input" placeholder="your message" type="text" />
        </form>
      </div>
  </div>
       
`;

this.innerHTML = template
  }
  
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    const { user, isLoggedIn } = getState();
    console.log('connected!', this);
    const roomsDiv = this.querySelector('#message-groups');
    const roomsList = this.querySelector('#rooms-list');
    const createRoomForm = this.querySelector('#create-room-form');
    const newRoomName = this.querySelector('#new-room-name');

    const messageForm = this.querySelector('#message-form');
    const messageInput = this.querySelector('#message-input');
    const messageList = $('.message-list');
    const messageListContainer = this.querySelector('.message-list-container');
    const drawComponent = this.querySelector('draw-component');
    createRoomForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (newRoomName.value) {
        socket.emit('create-room', newRoomName.value);
        newRoomName.value = '';
      }
    });

    socket.on('output-rooms', (roomArray) => {
      roomArray.forEach((room) => {
        const roomItem = document.createElement('button');
        let roomAttr = room.toString();
        
        roomItem.setAttribute('value', roomAttr);
        roomItem.setAttribute('class', 'room-item');
        roomItem.addEventListener('click', (e) => {
          let { user } = getState();
          let room_id = room._id;
          let joinMsg = `${user.name} joined the chat`;
          const allRooms = $$('.room-item');
          allRooms.forEach((element) => {
            element.classList.remove('active');
          });
          roomItem.classList.add('active');
          messageList.innerHTML = '';

          setState({ room: room, messages: [] });
          drawComponent.setAttribute('room', room);
          drawComponent.setAttribute('user', user);

          socket.emit('join', { name: user.name, room_id, user_id: user._id });
          socket.emit('send-message', { msg: joinMsg, room_id: room_id, alert: true });
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

        let room_id = room._id;
        let msg = messageInput.value;
        let messageObject = {
          msg: msg,
          room_id: room._id,
        };
        socket.emit('send-message', { msg: msg, room_id: room_id });
        setState({ message: '' });
        messageInput.value = '';
      }
    });
    const { room } = getState();
    console.log(room);
    // let room_id = room._id;


    // if ('customElements' in window) {
    //   customElements.define('draw-component', WhiteBoard);
    // }

  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    console.log('disconnected', this);
  }
}

export default ChatComponent;
