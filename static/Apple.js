class Apple {

  constructor($el) {
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', 'static/assets/apple.png');
    $el.append(this.node);
    this.node.css({ top: 300, left: 300 });
    this.head = null;
  }

  spawn() {
    const bodies = $('.snakeBody');

    let done = false;
    let randPos;
    while(!done) {
      randPos = [Math.floor(Math.random() * 14) * 50, Math.floor(Math.random() * 14) * 50];
      done = true;
      for(let body of $('.snakeBody')) {
        const bodyPos = [body.style.top, body.style.left];
        if(randPos[0] === bodyPos[0] && randPos[1] === bodyPos[1]) done = false;
      }
    }

    this.node.css({top:randPos[0], left:randPos[1]});
  }

  // generate number between 0 and number of empty spaces
  // 14^2 - body.length = empty spaces
  // begin for loop 
  // running from i = 0 to i < generatedNumber
  // i += 1
  // if we hit body, dont increment i
  
}
