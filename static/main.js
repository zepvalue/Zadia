var socket = io() 

$(document).ready(function() {
  const apple = new Apple($('#board'));
  const head = new Head($('#board'), [200, 100]);
  const score = $('#score');
  
  let scoreCount = 0;
  let highScore = parseInt(localStorage.getItem("highScore"));
  if(isNaN(highScore)) highScore = 0;
  score[0].innerHTML = `SCORE: ${scoreCount}<br>HISCORE: ${highScore}`
  
  
  socket.on("eventServerController", eventControllerKeyCode => {
    console.log('EVENT RECEIVED')
    head.changeDirection(eventControllerKeyCode); 
    /*if(e.keyCode === 82) location.reload();*/ //TODO If user presses R replays the game 
  })
  

  $('body').on('gameOver', () => {
    if(scoreCount > highScore) localStorage.setItem("highScore", scoreCount);

    const gameOverText = $('<h1 class="flex-container"> GAME OVER </h1>');
    gameOverText.css({'font-size': 100, 'position': 'absolute'})
    $('#board').append(gameOverText);

    const restartText = $('<p class ="flex-container"> Press R to Restart </p>');
    restartText.css({'font-size': 25, 'position': 'absolute', top: '150px'})
    $('#board').append(restartText);

  });
  $('body').on('eatApple', apple.spawn.bind(apple));
  $('body').on('eatApple', () => {
    scoreCount += 1;
    score[0].innerHTML = `SCORE: ${scoreCount}<br>HISCORE: ${highScore}`
  });
});

var setPlayer2 = function() {
  $('#p2button').remove();
  const head2 = new Head($('#board'), [400, 100]);

  socket.on("eventServerController2", eventControllerKeyCode2 => {
    console.log('Controller 2 connected', eventControllerKeyCode2)
    let player2Direction = 0;
    switch(eventControllerKeyCode2) {
      case 38:
        player2Direction = 87; //! Just changed the direction
        break;
      case 39:
        player2Direction = 68;
        break;
      case 40:
        player2Direction = 83;
        break;
      case 37:
        player2Direction = 65;
    }

    head2.changeDirection(player2Direction)
  })
}