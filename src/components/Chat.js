import { html, render } from 'lit-html';
import { $, $$ } from '@/helpers/variables';
import { LoginModal, modalTemplate } from '@/components/modal';
import socket from '@/socket.js';
// import { socket } from '../app.js';



export const renderChat = (container, socket) => {
  const chatTemplate = () => html`
    <main>
      <div class="message-container">
        <ul class="message-list"></ul>
      </div>
      <form id="message-form">
        <input id="message-input" placeholder="your message" type="text" />
      </form>
    </main>
  `;

  render(chatTemplate(), container);


  const messageList = $('.message-list');
  const messageInput = $('#message-input');
  const messageForm = $('#message-form');

  messageForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (messageInput.value) {
      await socket.emit('send-message', messageInput.value);
      const item = document.createElement('li');
      item.textContent = messageInput.value;
      item.setAttribute('class', 'message my-message');
      messageList.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);

      messageInput.value = '';
    }
  });


  // socket.on('connect', () => {
  // });

  // socket.on('receive-message', function (msg) {
  //   const item = document.createElement('li');
  //   item.textContent = msg;
  //   item.setAttribute('class', 'message');
  //   messageList.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);

  // });
}



class ChatComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    console.log('Constructed', this);
    this.innerHTML = /*html*/ `

  <div class="message-container">
    <ul class="message-list"></ul>
  </div>
  <form id="message-form">
    <input id="message-input" placeholder="your message" type="text" />
  </form>

    `;
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    console.log('connected!', this);


    


    const input = $('#message-input');
    const messageForm = $('#message-form');
    const ul = $('.message-list');


    messageForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('send-message', input.value);
        const item = document.createElement('li');
        item.textContent = input.value;
        item.setAttribute('class', 'message my-message');
        ul.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    
        input.value = '';
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

// if ('customElements' in window) {
//   customElements.define('chat-component', ChatComponent);
// }


export default ChatComponent
