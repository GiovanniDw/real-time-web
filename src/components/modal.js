import { html, render } from 'lit-html';
import '@/css/modal.css';
export const modalTemplate = () => html`
<div id="loginModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <div>
          <form action="/login">
          <label for='username'>Login</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          </form>
        </div>
      </div>
    </div>
  `

// export const modal = document.getElementById("loginModal");

  export const LoginModal = (element, before) => render(modalTemplate(), element, {before});
