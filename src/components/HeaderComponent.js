import { $ , $this } from '@/helpers/variables.js';
import socket from '@/socket.js';
class HeaderComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    
    console.log('Constructed', this);
    this.innerHTML = /*html*/ `
<div>
  <button id="loginBtn">Login</button>
  <div id="loginModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <div>
        <form id="login-form" action="login">
        <h3>Login</h3>
          <label for="username">username</label>
          <input type="text" name="username" id="username" placeholder="username" />
          <label for="email">email</label>
          <input type="email" name="email" id="email" placeholder="jhon@do.com" />
        </form>
      </div>
    </div>
  </div>
</div>
    `;
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    console.log()
    console.log('connected!', this);
    const btn = this.querySelector('#loginBtn');
    const form = this.querySelector('#login-form');
    const span = this.querySelector('.close');
    const modal = this.querySelector('#loginModal');
    const input = $('#username');
    const ul = $('.message-list');
    btn.onclick = function () {
      modal.style.display = 'block';
    };

    const user = false;


    if (!user) {
    modal.style.display = 'block'  
    }




    span.onclick = function () {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('set-username', input.value);
        const item = document.createElement('li');
        item.textContent = input.value;
        item.setAttribute('class', 'message my-message');
        ul.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
        input.value = '';
      }
    });
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    console.log('disconnected', this);
  }
}

// if ('customElements' in window) {
//   customElements.define('header-com', HeaderComponent);
// }

export default HeaderComponent;
