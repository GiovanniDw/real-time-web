import "./style.css";
// import * as io from "socket.io";
// import { setupCounter } from "./counter.js";
import javascriptLogo from "./javascript.svg";

document.querySelector("#app").innerHTML = `
  <div>
  <img src="${javascriptLogo}"> 
  <main>
  <div class="message-container">
    <ul class="message-list"></ul>
  </div>
  <form id="form" action="">
    <input id="input" placeholder="your message" type="text" />
  </form>
</main>
  </div>
`;

// setupCounter(document.querySelector("#counter"));

let socket = io();

const form = document.getElementById("form");
const ul = document.querySelector("ul");
const input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    console.log(socket.id);
    socket.emit("send-message", input.value);

    const item = document.createElement("li");
    item.textContent = input.value;
    item.setAttribute("class", "message my-message");
    ul.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    input.value = "";
  }
});

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("receive-message", function (msg) {
  console.log(socket.id);
  const item = document.createElement("li");
  item.textContent = msg;
  item.setAttribute("class", "message");
  ul.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
