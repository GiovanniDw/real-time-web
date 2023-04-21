class HeaderComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    console.log('Constructed', this);
    this.innerHTML = /*html*/ `
          <header>
            <button id="loginBtn">Login</button>
          </header>
    `;
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    console.log('connected!', this);
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


export default HeaderComponent