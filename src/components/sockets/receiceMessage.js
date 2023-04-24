import { $ } from '@/helpers/variables.js';
export const receiveMessage = (msg) => {
  console.log(msg)
  const messageList = $('.message-list');
  const item = document.createElement('li');
  item.textContent = msg;
  item.setAttribute('class', 'message');
  messageList.appendChild(item);
  messageList.scrollTo(0, messageList.scrollHeight);
};
