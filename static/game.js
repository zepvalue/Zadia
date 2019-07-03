var socket = io();

//the listener is set up for the incoming message from the server
socket.on("message", messageFromServer => {
  console.log("data from game", messageFromServer);
});

//The object is still
var movement = {
  up: false,
  down: false,
  left: false,
  right: false
};

socket.on("eventServerController", eventControllerKeyCode => {
  console.log("An event controller has been received", eventControllerKeyCode);
  switch (eventControllerKeyCode) {
    case 65:
      movement.left = true;
      movement.right = false
      movement.up = false 
      movement.down = false 
      break;
    case 87:
      movement.up = true;
      movement.right = false
      movement.left = false 
      movement.down = false 
      break;
    case 68:
      movement.right = true;
      movement.left = false
      movement.up = false 
      movement.down = false 
      break;
    case 83:
      movement.down = true;
      movement.right = false
      movement.up = false 
      movement.left = false 
      break;
  }

  socket.emit('movement',movement)
});

// document.addEventListener("keyup", event => {
//   switch (event.keyCode) {
//     case 65:
//       movement.left = false;
//       break;
//     case 87:
//       movement.up = false;
//       break;
//     case 68:
//       movement.right = false;
//       break;

//     case 83:
//       movement.down = false;
//       break;
//   }
// });

socket.emit("new player");
//sending event movement to the server
// setInterval(() => {
//   socket.emit("movement", movement);
// }, 1000 / 60);

let canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
let context = canvas.getContext("2d");

//the state socket back from the server
socket.on("state", players => {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = "orange";
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});
