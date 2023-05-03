import { $ } from '@/helpers/variables.js';
import {getState} from '@/state.js';
const { user } = getState();
const currentUser = user;


export const receiveMessage = (obj) => {
  const {user, username , msg} = obj
  console.log('user')
  console.log(user)
  console.log('currentuser')
  console.log(currentUser)
  const messageListContainer = $('.message-list-container');
  const messageList = $('.message-list');
  const item = document.createElement('li');
  
  console.log(messageList.scrollHeight);
  // item.textContent = msg;
  item.setAttribute('class', 'message');

  const renderUsername = () => {
    let username
    if (user) {
      username = user.name;
      return username
    } else {
      username = 'unknown'
      return username
    }
  }

  item.innerHTML = /*html*/`
  <p>${ msg }</p><span class="time">${renderUsername()}</span>
  `;

  messageList.appendChild(item);
  messageListContainer.scrollTo({
    top: messageListContainer.scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};
