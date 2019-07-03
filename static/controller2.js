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
const buttonUp = document.querySelector('#btnUp2')
let keyEventUp = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  shiftKey : true,
  keyCode : 38
})
buttonUp.addEventListener('click', () => {
  buttonUp.dispatchEvent(keyEventUp)
  socket.emit('event2',keyEventUp.keyCode)
})

//TODO : Send the events clicking throught the socket
/**
 *  ⏪ BUTTON LEFT ⏪
 */
const buttonLeft = document.querySelector('#btnLeft2')
let keyEventLeft = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  shiftKey : true,
  keyCode : 37
})
buttonLeft.addEventListener('click', (event) => {
  buttonLeft.dispatchEvent(keyEventLeft);
  socket.emit('event2',keyEventLeft.keyCode)
})

/**
 *  ⏬ BUTTON DOWN ⏬
 */
const buttonDown = document.querySelector('#btnDown2')
let keyEventDown = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  shiftKey : true,
  keyCode : 40
})
buttonDown.addEventListener('click', () => {
  buttonDown.dispatchEvent(keyEventDown)
  socket.emit('event2',keyEventDown.keyCode)
})

/**
 *  ⏩ BUTTON RIGHT ⏩
 */
const buttonRight = document.querySelector('#btnRight2')
let keyEventRight = new KeyboardEvent('keydown',{
  bubbles : true,
  cancelable : true,
  shiftKey : true,
  keyCode : 39
})
buttonRight.addEventListener('click', () => {
  buttonRight.dispatchEvent(keyEventRight)
  socket.emit('event2',keyEventRight.keyCode)
})

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 65:
      console.log('You pressed left', event.keyCode)
      break
    case 87:
      console.log('you pressed up', event.keyCode)
      break;
    case 68:
      console.log('you pressed right', event.keyCode)
      break;
    case 83:
      console.log('you pressed down', event.keyCode)
      break;
  }
});
