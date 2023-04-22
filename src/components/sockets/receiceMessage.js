import { $ } from '@/helpers/variables.js';
export const receiveMessage = (msg) => {
  const messageList = $('.message-list');
  const item = document.createElement('li');
  item.textContent = msg;
  item.setAttribute('class', 'message');
  messageList.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
};
