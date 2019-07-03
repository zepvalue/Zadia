const express = require("express");
const app = express();
const path = require('path')
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const playerController = require('../PlayerController')
const {createPlayer, getPlayer, deletePlayer} = playerController

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("port", 5000);

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use("/static", express.static(__dirname + "/static"));
app.use(express.static(".")); 

app.get('/', (req, res) => {
  if(process.env.NODE_ENV === 'production') {
    console.log('in the root directory for production')
    res.sendFile(path.join(__dirname, 'client/main.html'));
  }
});


const renderIndex = (req, res, next) => {
  console.log('Rendered Index') //! Not going in here
  res.status(200).render("./../client/index");
  return next()
};


app.get("/",  renderIndex , () => {
  console.log('in the root directory') //! Not going in here
  res.status(200).sendFile('/client/main.html')
})

app.get("/main", (req, res) => { res.sendFile("client/main.html", { root: "." })})
app.get("/login", (req, res) => { res.render("./../client/login")})
app.get("/signup", (req, res) => { res.render("./../client/signup")})
app.get("/snake", (req, res) => { res.sendFile("client/snake.html",  { root: "." })})
app.get("/flappyBird", (req, res) => { res.sendFile("client/flappyBird.html",  { root: "." })})
app.get("/controller", (req, res) => { res.sendFile("client/controller.html", { root: "." }); });
app.get("/controller2", (req, res) => { res.sendFile("client/controller2.html", { root: "." }); });
app.post('/signup', createPlayer)


 //********************************************************************************* SOCKETS  */
 io.on("connection", socket => {
  
  console.log("A user connected 🙋");
  socket.on("event", eventFromController => {
    //receives the keycode from the controller
    socket.broadcast.emit("eventServerController", eventFromController);
    console.log("controller event", eventFromController);
  });

  socket.on('event2', eventFromController2 => {
    socket.broadcast.emit("eventServerController2", eventFromController2);
    console.log("controller event2", eventFromController2);
  })

  socket.on("new player", data => {
    //sockets id change at each refresh so will make the players unique
    players[socket.id] = {
      x: 300,
      y: 300
    };
    
    //The event movement from the client
    socket.on("movement", movementFromClient => {
      //data is the key value pair direction : boolean
      var player = players[socket.id] || {};
      let { left, right, up, down } = movementFromClient;
      if (left) player.x -= 5;
      if (up) player.y -= 5;
      if (right) player.x += 5;
      if (down) player.y += 5;
    });
  });
  

  //every second send a socket with a message to the client
setInterval(() => {
  io.sockets.emit("message", "socket sent");
}, 1000);

//sending game informations back and forth
var players = {};

//sends a state socket back to the client
setInterval(function() {
  io.sockets.emit("state", players);
}, 1000 / 60);

});


server.listen(5000, () => {
  console.log("Starting server on 5000");
});
