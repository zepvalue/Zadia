var socket = io();

 //TODO : create a class only for buttons and call it buttonController

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
};

/**
 *  ⏫ BUTTON UP ⏫ 
 */
const buttonUp = document.querySelector('#btnUp')
let keyEventUp = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  char : "W",
  key : "w",
  shiftKey : true,
  keyCode : 87
})
buttonUp.addEventListener('click', () => {
  buttonUp.dispatchEvent(keyEventUp)
  socket.emit('event',keyEventUp.keyCode)
})

//TODO : Send the events clicking throught the socket
/**
 *  ⏪ BUTTON LEFT ⏪
 */
const buttonLeft = document.querySelector('#btnLeft')
let keyEventLeft = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  char : "A",
  key : "a",
  shiftKey : true,
  keyCode : 65
})
buttonLeft.addEventListener('click', (event) => {
  buttonLeft.dispatchEvent(keyEventLeft);
  socket.emit('event',keyEventLeft.keyCode)
})

/**
 *  ⏬ BUTTON DOWN ⏬
 */
const buttonDown = document.querySelector('#btnDown')
let keyEventDown = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  char : "S",
  key : "s",
  shiftKey : true,
  keyCode : 83
})
buttonDown.addEventListener('click', () => {
  buttonDown.dispatchEvent(keyEventDown)
  socket.emit('event',keyEventDown.keyCode)
})

/**
 *  ⏩ BUTTON RIGHT ⏩
 */
const buttonRight = document.querySelector('#btnRight')
let keyEventRight = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  char : "D",
  key : "d",
  shiftKey : true,
  keyCode : 68
})
buttonRight.addEventListener('click', () => {
  buttonRight.dispatchEvent(keyEventRight)
  socket.emit('event',keyEventRight.keyCode)
})

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 65:
      console.log('You pressed a', event.keyCode)
      break
    case 87:
      console.log('you pressed w', event.keyCode)
      break;
    case 68:
      console.log('you pressed d', event.keyCode)
      break;
    case 83:
      console.log('you pressed s', event.keyCode)
      break;
  }
});
