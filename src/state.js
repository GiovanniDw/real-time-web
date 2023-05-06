import { socket } from '@/socket.js';
let state = { user: null, room: null, isLoggedIn: false, message: '', messages: [] }; // Initialize state object

export function getState() {
  console.log(state);
  return state;
}

export function setState(newState) {
  state = { ...state, ...newState }; // Merge new state with existing state
}
