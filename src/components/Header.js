import { $, $this } from '@/helpers/variables.js';
import socket from '@/socket.js';
class Header extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.state = {
      login: false,
      toggleLogin: (bool) => {
        this.state.login = bool;
      },
      user: false,
      setUser: (user) => {
        this.state.user == user;
        console.log(this.state.user);
      },
    };

    console.log(this.state);

    console.log('Constructed', this);

    if (!this.state.user) {
      this.innerHTML = /*html*/ `
      <div>
        <button id="loginBtn">Login</button>
        <dialog id="modal" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <div id="auth-state">
              <div id="login-container">
                <form id="login-form" action="login">
                  <h3>Login</h3>
                  <label for="email">email</label>
                  <input type="email" name="email" id="email" placeholder="jhon@do.com" autocomplete="email" />
                  <label for="password">password</label>
                  <input type="password" name="password" id="password" placeholder="****" autocomplete="current-password" />
                  <input type="submit" />
                </form>
              </div>
              <div id="register-container">
                <form id="register-form" action="register">
                  <h3>Register</h3>
                  <label for="name">username</label>
                  <input type="text" name="name" id="name" placeholder="username" autocomplete="nickname" />
                  <label for="new-email">email</label>
                  <input type="email" name="email" id="new-email" placeholder="jhon@do.com" autocomplete="email" />
                  <label for="new-password">password</label>
                  <input type="password" name="password" id="new-password" placeholder="****" autocomplete="new-password" />
                  <input type="submit" />
                </form>
              </div>
            </div>
            <button id="auth-select">No Account yet? Create One!</button>
          </div>
        </dialog>
      </div>
          `;
    } else {
      console.log(this.state.user.name);
      this.innerHTML = /*html*/ `
      <button id="logoutBtn">Logout</button>
      <a href="/logout"></a>
      `;
    }
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    let { login, user } = this.state;
    console.log('userState');
    console.log(this.state.user);

    const btn = this.querySelector('#loginBtn');
    const loginForm = this.querySelector('#login-form');
    const registerForm = this.querySelector('#register-form');
    const closeModal = this.querySelector('.close');
    const modal = this.querySelector('#modal');
    const authSelect = $('#auth-select');
    const authState = this.querySelector('#auth-state');

    const registerContainer = this.querySelector('#register-container');
    const loginContainer = this.querySelector('#login-container');

    const emailInput = this.querySelector('#email');
    const passwordInput = this.querySelector('#password');

    const usernameInput = this.querySelector('#name');
    const newEmailInput = this.querySelector('#new-email');
    const newPasswordInput = this.querySelector('#new-password');

    authSelect.addEventListener('click', () => {
      if (this.state.login === true) {
        this.state.toggleLogin(false);
        // authState.innerHTML = this.registerHTML;
        registerContainer.style.display = 'block';
        loginContainer.style.display = 'none';
        authSelect.innerHTML = `Already have an account? Login`;
      } else {
        this.state.toggleLogin(true);
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        authSelect.innerHTML = `No Account yet? Register!`;
      }
    });

    const ul = $('.message-list');
    btn.onclick = function () {
      modal.style.display = 'block';
    };

    if (!user.name) {
      modal.style.display = 'block';
    }

    closeModal.onclick = function () {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (emailInput.value) {
        let user = {
          email: emailInput.value,
          password: passwordInput.value,
        };
        console.log(user);
        socket.emit('set-username', emailInput.value);

        try {
          const { name, email, password } = user;
          const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          console.log(data.user);
          if (data.errors) {
            console.log(data.errors.email);
            console.log(data.errors.name);
            console.log(data.errors.password);
          }
          if (data.user) {
            this.state.setUser({
              name: data.user.name,
              email: data.user.email
            });
            console.log(this.state.user);
          }
        } catch (error) {
          console.log(error);
        }

        usernameInput.value = user.name;
      }
    });

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      usernameInput.value;
      newEmailInput.value;
      newPasswordInput.value;
      if (usernameInput.value) {
        console.log(usernameInput.value);
      }

      let user = {
        name: usernameInput.value,
        email: newEmailInput.value,
        password: newPasswordInput.value,
      };

      try {
        const { name, email, password } = user;
        const res = await fetch('http://localhost:3000/register', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data.user);
        if (data.errors) {
          // setEmailError(data.errors.email);
          // setNameError(data.errors.name);
          // setPasswordError(data.errors.password);
          console.log(data.errors.email);
          console.log(data.errors.name);
          console.log(data.errors.password);
        }
        if (data.user) {
          this.state.setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }

      console.log(this.state.user);
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

export default Header;
