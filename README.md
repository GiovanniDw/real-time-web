
# Real Time Web

## Table of Contents

- [Real Time Web](#real-time-web)
  - [Table of Contents](#table-of-contents)
- [Course Info](#course-info)
  - [Assignment](#assignment)
    - [Goals](#goals)
    - [Rubic](#rubic)
- [Getting A Grip](#getting-a-grip)
  - [Make It so](#make-it-so)
    - [Team](#team)
    - [Coding Style](#coding-style)
      - [Eslint](#eslint)
      - [Prettier](#prettier)
    - [Individual](#individual)
      - [Features](#features)
      - [File Structure](#file-structure)
- [Sockets \& Data](#sockets--data)
  - [(Proof of) Concept](#proof-of-concept)
      - [Database Models](#database-models)
- [Dealing with Multiple Users](#dealing-with-multiple-users)
  - [Data Management](#data-management)
  - [User Testing](#user-testing)
- [Resources](#resources)
    - [State](#state)
    - [Custom Elements](#custom-elements)


# Course Info

[GitHub - cmda-minor-web/real-time-web-2223: During this course you will learn how to build a real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.](https://github.com/cmda-minor-web/real-time-web-2223)

## Assignment

During this course you will learn how to build a real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.

### Goals

After finishing this program you can:

- *deal with real-time complexity;*
- *handle real-time client-server interaction;*
- *handle real-time data management;*
- *handle multi-user support.*

### Rubic

| **Deficiency**              | **Criterion**                                                                                                                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Project*                   | Your app is working and published on Heroku. Your project is thoroughly documented in the `README.md` file in your repository. Included are a description of the data-lifecycle, real-time events and external data source used by your app. |
| Complexity                  | You’ve implemented enough real-time functionality for us to test your comprehension of the subject. A lot of functionality is self-written. You are able to manipulate online examples live.                                                 |
| *Client-server interaction* | By interacting with the app, a user can influence the data model of the server in real time by directly modifying data OR by influencing API requests between server and source. The student has set up the data manipulations.              |
| Data management             | The server maintains a data model and each client is continuously updated with the correct data.                                                                                                                                             |
| *Multi-user support*        | Multiple clients can connect to the server. Interaction works as expected and is not dependent on the number of clients. You can explain how your app approaches this.                                                                       |

# Getting A Grip

## Make It so

### Team

- [GitHub - wongsrila/teamchat](https://github.com/wongsrila/teamchat)

```zsh
.
├── public
│   ├── css
│   │   └── style.css
│   ├── index.html
│   └── js
│       ├── client.js
│       └── modal.js
├── server.js
├── README.md 
└──package.json
```

### Coding Style

#### Eslint

```javascript
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
  ],
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 'latest',
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  rules: {
    "no-unused-vars": "off"
  }
}
```

#### Prettier

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi":true,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

### Individual

#### Features

- User
   - Register
   - Login
- Chat
   - Create Room with Name
   - Live Whiteboard
   - Messages - Send/Receive

#### File Structure

```zsh
.
├── public
│   └── vite.svg
├── server //server
│   ├── config.js
│   ├── controllers
│   │   ├── Room.js
│   │   └── authController.js
│   ├── models // Database Models
│   │   ├── Message.js
│   │   ├── Room.js
│   │   └── User.js
│   ├── server.js
│   ├── sessionStore.js
│   └── utils.js
├── src // client
│   ├── app.js
│   ├── components
│   │   ├── Chat.js
│   │   ├── Header.js
│   │   ├── Messages.js
│   │   ├── WhiteBoard.js
│   │   ├── modal.js
│   │   └── sockets
│   │       └── receiceMessage.js
│   ├── css
│   │   ├── chat.scss
│   │   ├── draw.scss
│   │   ├── main.css
│   │   ├── modal.css
│   │   └── reset.css
│   ├── helpers
│   │   ├── variables.js
│   │   └── verifyUser.js
│   ├── socket.js
│   └── state.js
├──	vite.config.js
├── LICENSE
├── README.md
├── index.html
├── jsconfig.json
├── package.json
└── pnpm-lock.yaml
```

# Sockets & Data

## (Proof of) Concept

#### Database Models

- [`User.js`](server/models/Room.js)
- [`Room.js`](server/models/Room.js)
- [`Messages.js`](server/models/Message.js)

Express Database

Username → Email Error

# Dealing with Multiple Users

## Data Management

`<li class='message alert'>Please Select or Create a room to chat in</li>`

## User Testing



# Resources


- [GitHub - cmda-minor-web/real-time-web-2223: During this course you will learn how to build a real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.](https://github.com/cmda-minor-web/real-time-web-2223)
- [Get started | Socket.IO](https://socket.io/get-started/chat)
- [How to create a web component with vanilla JS](https://gomakethings.com/how-to-create-a-web-component-with-vanilla-js/)
- [Reactive UI's with VanillaJS - Part 2: Class Based Components](https://css-tricks.com/reactive-uis-vanillajs-part-2-class-based-components/)
- [Adapter](https://socket.io/docs/v4/adapter/)
- [Build a Chat Room With Socket.io and Express](https://hackernoon.com/build-a-chat-room-with-socketio-and-express)
- [Template literals (Template strings) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Adding State to Custom HTML Elements](https://itnext.io/adding-state-to-custom-html-elements-639961c7c529)
- [chat-example/index.js at master · socketio/chat-example](https://github.com/socketio/chat-example/blob/master/index.js)
- [socket.io/index.js at master · socketio/socket.io](https://github.com/socketio/socket.io/blob/master/examples/passport-example/index.js)
- [How to make web component to redender specific elements upon property update](https://stackoverflow.com/questions/74391457/how-to-make-web-component-to-redender-specific-elements-upon-property-update)
- [Adding State to Custom HTML Elements](https://itnext.io/adding-state-to-custom-html-elements-639961c7c529)
- [Adding State to Custom HTML Elements](https://itnext.io/adding-state-to-custom-html-elements-639961c7c529)
- [Create a drawing app using JavaScript and canvas](https://dev.to/javascriptacademy/create-a-drawing-app-using-javascript-and-canvas-2an1)
### State

- [Dead simple State Management in Vanilla JS](https://vijaypushkin.medium.com/dead-simple-state-management-in-vanilla-js-6481c53f7439)

### Custom Elements

- [Using custom elements - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)

