import { $ } from '@/helpers/variables.js';
import { getState } from '@/state.js';

export const receiveMessage = (obj) => {
  const { user } = getState();
  const currentUser = user;

  const receivedFrom = obj.user;

  const { name, text, room_id, user_id, alert } = obj;

  const messageListContainer = $('.message-list-container');
  const messageList = $('.message-list');
  const item = document.createElement('li');

  if (user_id === currentUser._id && !alert) {
    item.setAttribute('class', 'message my-message');
    item.innerHTML = /*html*/ `
<p>${text}</p><span class="user">${name}</span>
  `;
  } else if (alert) {
    item.setAttribute('class', 'message alert');
    item.innerHTML = /*html*/ `
  <p>${text}</p>
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
