import { html, render } from 'lit-html';
import { $ } from '../../src/helpers/variables.js';
import '@/css/modal.css';
export const modalTemplate = () => {
  return html`
<div id="loginModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div>
      <form id="login-form" action="login">
        <label for="username">Login</label>
        <input type="text" name="username" id="username" placeholder="username" />
      </form>
    </div>
  </div>
</div>

  `;
};

// export const modal = document.getElementById("loginModal");

export const LoginModal = (element, before) => render(modalTemplate(), element, { before });

class loginModal extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    console.log('Constructed', this);
    this.innerHTML = /*html*/ `
      <div id="loginModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <div>
          <form id="login-form" action="login">
            <label for="username">Login</label>
            <input type="text" name="username" id="username" placeholder="username" />
          </form>
        </div>
        <div>
          <form id="login-form" action="register">
            <label for="username">Register</label>
            <input type="email" name="email" id="email" placeholder="jhon@do.com" />
            <input type="text" name="username" id="username" placeholder="username" />
          </form>
        </div>
      </div>
    </div>
    `;
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    console.log('connected!', this.innerHTML);

    const btn = $('#loginBtn');
    const span = $('.close');
    const modal = this.querySelector('#loginModal');

    this.addEventListener('DOMContentLoaded', () => {
      btn.onclick = function () {
        modal.style.display = 'block';
      };

      span.onclick = function () {
        modal.style.display = 'none';
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
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
//   customElements.define('login-modal', loginModal);
// }

export default loginModal;
