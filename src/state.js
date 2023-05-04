import {socket} from '@/socket.js';
import verifyUser from '@/helpers/verifyUser';
let state = { user: null, room: null, isLoggedIn: false }; // Initialize state object

export function getState() {
  console.log(state)
  return state;
}

export function setState(newState) {
  console.log(state);
  console.log(newState);
  state = { ...state, ...newState }; // Merge new state with existing state
}

