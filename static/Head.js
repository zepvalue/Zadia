

// creates a constructor function - research ES6 classes
class Head {

  // this is what's called when you use the "new" keyword
  constructor($el, position) {
    this.node = $('<img class="snakeBody" id="head"></img>');
    this.node.attr('src', 'static/assets/snakeBody/snakeHead.png');
    this.directionBeforeMoving = 'right';
    this.currentDirection = 'right';
    this.SPEED = 500;
    $el.append(this.node);
    this.node.css({ top: position[0], left: position[1] });
    this.apple = $('#apple');
    this.firstTimeEaten = false;
    this.appleEaten = false;

    this.bodyTail = new Body($('#board'));
    this.bodyTail.node.css({ top: position[0], left: position[1] - 50});
    this.bodyHead = new Body($('#board'));
    this.bodyHead.node.css({ top: position[0], left: position[1] - 100});
    this.bodyHead.next = this.bodyTail;
    this.bodyHead.setTail(  );
    setTimeout(this.move.bind(this), this.SPEED);

    this.board = $el;
    this.originalColor = this.board.css('background-color');
    this.changeColorDirection = 'whiten';
  } 

  // b b b h
  //   b b b h
  //     b b b h

  
  // changeDirection(direction) {
  //   var socket = io()

  changeDirection(direction) {
      switch(direction) {
        case 65:
          if (this.directionBeforeMoving !== 'right') this.currentDirection = 'left';       
            break;
        case 87:
          if (this.directionBeforeMoving !== 'down') this.currentDirection = 'up';
          break;
        case 68:
          if (this.directionBeforeMoving !== 'left') this.currentDirection = 'right';
          break;
        case 83:
          if (this.directionBeforeMoving !== 'up') this.currentDirection = 'down';
      }
  }

  moveBody(position){
    const newBody = new Body($('#board'), this.currentDirection, this.directionBeforeMoving);
    newBody.node.css({ top: position.top, left: position.left });
    this.bodyTail.next = newBody;
    this.bodyTail = newBody;

    if (this.appleEaten) {
      this.appleEaten = false;
    } else {
      const tempRef = this.bodyHead;
      this.bodyHead = this.bodyHead.next;
      this.bodyHead.setTail();
      tempRef.node.remove();
    }
  }

  rotateHead(direction) {
    let degrees;
    switch(direction) {
      case 'right':
        degrees = 0;
        break;
      case 'left':
        degrees = 180;
        break;
      case 'up':
        degrees = 270;
        break;
      case 'down':
        degrees = 90;
        break;
    }
    this.node.css({transform : `rotate(${degrees}deg)`});
  }

  changeColors(){
    if(this.changeColorDirection === 'whitenTransition' && this.board.css('background-color') === this.originalColor) {
      this.changeColorDirection = 'whiten';
    }
    else if(this.changeColorDirection === 'reddenTransition' && this.board.css('background-color') === 'rgba(255, 255, 255, 0.9)') {
      this.changeColorDirection = 'redden';
    }
    const transitionSpeed = this.SPEED / 300;

    if(this.changeColorDirection === 'whiten'){
      this.board.css({transition: `background-color ${transitionSpeed}s ease-in-out`, "background-color": 'rgba(255, 255, 255, 0.9)'});
      this.changeColorDirection = 'reddenTransition';
    }
    else if(this.changeColorDirection === 'redden'){
      this.board.css({transition: `background-color ${transitionSpeed}s ease-in-out`, "background-color": this.originalColor});
      this.changeColorDirection = 'whitenTransition';
    }
  }

  collide(){
    this.node.remove();
    $('body').trigger('gameOver');
  }

  // same as Head.prototype.move = function() {...}
  move() {
    let position = this.node.position();

    this.changeColors();

    this.moveBody(position);

    let direction = this.currentDirection;
    this.directionBeforeMoving = direction;

    switch(direction) {
      case 'right':
        position.left += 50;
        break;
      case 'up':
        position.top -= 50;
        break;
      case 'left':
        position.left -= 50;
        break;
      case 'down':
        position.top += 50;
    }
    this.rotateHead(direction);
    

    // check if snake eats apple
    if (parseInt(this.apple[0].style.top) === Math.round(position.top) && parseInt(this.apple[0].style.left) === Math.round(position.left)) {
      this.appleEaten = true;
      this.SPEED /= 1.1
      $('body').trigger('eatApple');
    }
  
    let bodies = $('.snakeBody')
    for(let body of bodies) {
      if(body === this.node) {}
      else if(Math.round(position.top) === parseInt(body.style.top) && Math.round(position.left) === parseInt(body.style.left)) {
        this.collide();
        return;
      }
    }

    // check if snake hits wall
    if(position.top < -1 || position.left < -1 || position.top >= 700 || position.left >= 700) {
      this.collide();
    }
    else{
      this.node.css(position);
      setTimeout(this.move.bind(this), this.SPEED);
    }
  }
}
