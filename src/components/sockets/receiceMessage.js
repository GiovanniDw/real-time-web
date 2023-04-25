import { $ } from '@/helpers/variables.js';
export const receiveMessage = (msg) => {
  const messageListContainer = $('.message-list-container');
  const messageList = $('.message-list');
  const item = document.createElement('li');
  console.log(msg);
  console.log(messageList.scrollHeight);
  item.textContent = msg;
  item.setAttribute('class', 'message');
  messageList.appendChild(item);
  messageListContainer.scrollTo({ top:messageListContainer.scrollHeight, left: 0, behavior: "smooth", });
};
