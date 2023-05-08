import { $ } from '@/helpers/variables.js';
import { getState } from '@/state.js';

export const receiveMessage = (obj) => {
  let isCurrent = false;
  const { user } = getState();
  const currentUser = user;

  const receivedFrom = obj.user;

  const { name, text, room_id, user_id } = obj;

  const messageListContainer = $('.message-list-container');
  const messageList = $('.message-list');
  const item = document.createElement('li');

  if (obj.user_id === currentUser._id) {
    item.setAttribute('class', 'message my-message');
    item.innerHTML = /*html*/ `
  <p>${text}</p><span class="user">${name}</span>
  `;
  } else {
    item.setAttribute('class', 'message');
    item.innerHTML = /*html*/ `
  <p>${text}</p><span class="user">${name}</span>
  `;
  }
  messageList.appendChild(item);
  messageListContainer.scrollTo({
    top: messageListContainer.scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};
