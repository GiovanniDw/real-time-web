import { socket } from '@/socket.js';
const observers = new Set();
let state = {

}; // Initialize state object

export function getState() {
  // if (Object.keys(state).length === 0 && sessionStorage.getItem('myState')) {
  //   state = JSON.parse(sessionStorage.getItem('myState'));
  // }
  return state;
}

export function setState(newState) {
  // let sessionState = JSON.parse(localStorage.getItem("state"));
  // console.log(sessionState);
  
  state = { ...state, ...newState };
  // sessionStorage.setItem('myState', JSON.stringify(state));
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
