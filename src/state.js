import { socket } from '@/socket.js';
const observers = new Set(); 
let state = { 
  user: null, 
  room: null, 
  isLoggedIn: false, 
  message: '', 
  messages: [], 
  rooms: [] 
}; // Initialize state object

export function getState() {
  return state;
}

export function setState(newState) {
  state = { ...state, ...newState };
  notifyObservers(); // Merge new state with existing state
}

export function addObserver(observer) {
  observers.add(observer);
}

export function removeObserver(observer) {
  observers.delete(observer);
}

function notifyObservers() {
  for (const observer of observers) {
    observer(state);
  }
}