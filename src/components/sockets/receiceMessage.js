import { $ } from '@/helpers/variables.js';
import { getState } from '@/state.js';

export const receiveMessage = (obj) => {
  let isCurrent = false;
  const { user } = getState();
  const currentUser = user;

  const receivedFrom = obj.user;
  // console.log(receivedFrom);

  // console.log('obj');
  // console.log(obj);
  const { name, text, room_id, user_id } = obj;
  // console.log('user');
  // console.log(user);
  // console.log('name');
  // console.log(name);
  // console.log('currentuser');
  // console.log(currentUser);
  const messageListContainer = $('.message-list-container');
  const messageList = $('.message-list');
  const item = document.createElement('li');

  // item.textContent = text;

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

  // const renderUsername = () => {
  //   let username
  //   if (user) {
  //     console.log('username')
  //     console.log(user);
  //     console.log(name);
  //     username = user.name;
  //     return username
  //   } else {
  //     username = 'unknown'
  //     return username
  //   }
  // }

  messageList.appendChild(item);
  messageListContainer.scrollTo({
    top: messageListContainer.scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};
