import { html, render } from 'lit-html';
// import { modal } from './modal';

export const headerTemplate = () => html`
  <header>
    <button id="loginBtn">Login</button>
  </header>
`;

export const renderHeader = (element, before) => {
  render(headerTemplate(), element, { before });

}


export const LoginModal = (btn, modal) => {
  console.log(btn)
  // Get the <span> element that closes the modal
  
  
  
  

  
}





// Get the button that opens the modal
