import '@/css/style.css';
import { html, render } from 'lit-html';
import { $, $$, app } from '@/helpers/variables';
// import * as io from "socket.io";
// import { setupCounter } from "./counter.js";
import javascriptLogo from './javascript.svg';
import { LoginModal, modalTemplate } from '@/components/modal';
import { headerTemplate, renderHeader } from '@/components/Header';

const template = () => html`
  ${headerTemplate()}
  <img src="${javascriptLogo}" />
  <main>
    <div class="message-container">
      <ul class="message-list"></ul>
    </div>
    <form id="form">
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

app.addEventListener('DOMContentLoaded', () => {});

//

// setupCounter(document.querySelector("#counter"));

let socket = io();

const form = $('#form');
const ul = $('.message-list');
const input = $('#message-input');

const btn = $('#loginBtn');
const modal = $('#loginModal');
// LoginModal(btn, modal);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    console.log(socket.id);
    socket.emit('send-message', input.value);
    const item = document.createElement('li');
    item.textContent = input.value;
    item.setAttribute('class', 'message my-message');
    ul.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    input.value = '';
  }
});


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



socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('receive-message', function (msg) {
  console.log(socket.id);
  const item = document.createElement('li');
  item.textContent = msg;
  item.setAttribute('class', 'message');
  ul.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
