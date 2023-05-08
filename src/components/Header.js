/* eslint-disable no-unused-vars */
import { $, $this } from '@/helpers/variables.js';
import verifyUser from '@/helpers/verifyUser';
import socket from '@/socket.js';
import { getState, setState } from '@/state.js';
import { get } from 'mongoose';

class Header extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    const { isLoggedIn } = getState();
    console.log(getState().user);

    this.state = {
      login: false,
      toggleLogin: (bool) => {
        this.state.login = bool;
      },
      user: {},
      setUser: (user) => {
        this.state.user = user;
        console.log(this.state.user);
      },
      auth: isLoggedIn,
      setAuth: (isLoggedIn) => {
        this.state.auth = isLoggedIn;
      },
    };

    // const shadow = this.attachShadow({ mode: "open" });

    // console.log(shadow)

    if (!isLoggedIn) {
      this.innerHTML = /*html*/ `
      <div>
        <button id="loginBtn">Login</button>
        <button id="logoutBtn">Logout</button>
        <dialog id="modal" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <div id="auth-state">
              <div id="login-container">
                <form id="login-form" action="/login">
                  <h3>Login</h3>
                  <div id='login-error'></div>
                  <label for="email">email</label>
                  <input type="email" name="email" id="email" placeholder="jhon@do.com" autocomplete="email" />
                  <label for="password">password</label>
                  <input type="password" name="password" id="password" placeholder="****" autocomplete="current-password" />
                  <input id='login-submit' type="submit" />
                </form>
              </div>
              <div id="register-container">
                <form id="register-form" action="/register">
                  <h3>Register</h3>
                  <div id='register-error'></div>
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
      <a href="/logout">Logout</a>
      `;
    }
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    const btn = this.querySelector('#loginBtn');
    const logoutBtn = this.querySelector('#logoutBtn');
    const loginForm = this.querySelector('#login-form');
    const loginSubmit = this.querySelector('#login-submit');

    const closeModal = this.querySelector('.close');
    const modal = this.querySelector('#modal');
    const authSelect = $('#auth-select');
    const authState = this.querySelector('#auth-state');

    const registerContainer = this.querySelector('#register-container');
    const registerForm = this.querySelector('#register-form');
    const loginContainer = this.querySelector('#login-container');

    const registerError = this.querySelector('#register-error');
    const loginError = this.querySelector('#login-error');

    const emailInput = this.querySelector('#email');
    const passwordInput = this.querySelector('#password');

    const usernameInput = this.querySelector('#name');
    const newEmailInput = this.querySelector('#new-email');
    const newPasswordInput = this.querySelector('#new-password');

    authSelect.addEventListener('click', () => {
      if (this.state.login === true) {
        this.state.toggleLogin(false);
        registerContainer.style.display = 'block';
        loginContainer.style.display = 'none';
        authSelect.innerHTML = `Already have an account? Login`;
      } else {
        this.state.toggleLogin(true);
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        authSelect.innerHTML = `No Account yet? Create One!`;
      }
    });

    logoutBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('http://localhost:3000/logout', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (data.logout) {
          setState({ user: null, isLoggedIn: false });

          btn.style.display = 'block';
          logoutBtn.style.display = 'none';
          loginError.innerHTML = /*html*/ `
        
          `;
          // hide login modal after login
          setTimeout(() => {
            // this.state.toggleLogin(false);
            modal.style.display = 'block';
          }, 200);
        }
      } catch (error) {
        console.log(error);
      }
    });

    logoutBtn.style.display = 'none';
    btn.onclick = function () {
      modal.style.display = 'block';
    };
    const { isLoggedIn } = getState();
    if (!isLoggedIn) {
      modal.style.display = 'block';
    }

    closeModal.onclick = function () {
      const { isLoggedIn } = getState();

      if (isLoggedIn) {
        btn.style.display = 'none';
        modal.style.display = 'none';
      }
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      const { isLoggedIn } = getState();
      if (event.target == modal) {
        if (isLoggedIn) {
          btn.style.display = 'none';
          modal.style.display = 'none';
        }
      }
    };

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (emailInput.value) {
        let user = {
          email: emailInput.value,
          password: passwordInput.value,
        };

        try {
          let { email, password } = user;
          let username = email;
          const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });

          const data = await res.json();
          console.log(data.user);
          if (data.errors) {
            console.log(data.errors.email);
            console.log(data.errors.name);
            console.log(data.errors.password);

            const errorList = data.errors;
            console.log(errorList);
            // loginError.innerHTML = data.errors;

            loginError.innerHTML = /*html*/ `
            <p>${data.errors.email}</p>
            <p>${data.errors.name}</p>
            <p>${data.errors.password}</p>
            `;
          }
          if (data.user) {
            setState({ user: data.user, isLoggedIn: true });
            this.state.setAuth(isLoggedIn);
            btn.style.display = 'none';
            logoutBtn.style.display = 'block';
            loginError.innerHTML = /*html*/ `
          <p>Welcome Back! ${data.user.name}</p>
            `;
            // hide login modal after login
            setTimeout(() => {
              // this.state.toggleLogin(false);
              modal.style.display = 'none';
            }, 500);
          }
        } catch (error) {
          console.log(error);
        }
        emailInput.value = user.email;
      }
    });

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      usernameInput.value;
      newEmailInput.value;
      newPasswordInput.value;
      if (newEmailInput.value) {
        console.log(newEmailInput.value);

        let user = {
          name: usernameInput.value,
          email: newEmailInput.value,
          password: newPasswordInput.value,
        };
        console.log(user);

        try {
          let { name, email, password } = user;
          let username = email;
          console.log(user);
          const res = await fetch('http://localhost:3000/register', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username, name, password }),
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          console.log(data.user);
          if (data.errors) {
            registerError.innerHTML = /*html*/ `
          <p>${data.errors.email}</p>
          <p>${data.errors.name}</p>
          <p>${data.errors.password}</p>
          `;
          }
          if (data.user) {
            this.state.setAuth(isLoggedIn);
            setState({ user: data.user, isLoggedIn: true });
            btn.style.display = 'none';
            logoutBtn.style.display = 'block';
            registerError.innerHTML = /*html*/ `
            <p>Welcome ${user.name}</p>
            `;

            // hide register modal after register
            setTimeout(() => {
              // this.state.toggleLogin(false);
              modal.style.display = 'none';
            }, 500);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  attributeChangedCallback() {}

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    // setState({ user: {}, isLoggedIn: false });
    console.log('disconnected', this);
  }
}

export default Header;
