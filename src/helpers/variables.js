export const $ = (e) => document.querySelector(e);
export const $$ = (e) => document.querySelectorAll(e);
export const $this = (element, e) => element.querySelectorAll(e);
export const app = $('#app');
export const messageList = $('.message-list');

export const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
