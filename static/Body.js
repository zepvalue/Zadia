class Body {
  constructor($el, direction = 'right', prevDirection = 'right') {
    this.node = $('<img class="snakeBody" id="body"></img>');
    $el.append(this.node);
    this.node.css({ top: 0, left: 0 });
    this.next = null;
    this.setDirection(direction, prevDirection);
    this.direction = direction;
  }

  setDirection(direction, prev) {
    this.node.attr('src', `static/assets/snakeBody/${prev + direction}.png`);
  }

  setTail() {
    let deg = 0;
    this.node.attr('src', `static/assets/snakeBody/tail.png`);
    switch(this.direction) {
      case 'right':
        deg = 0;
        break;
      case 'up':
        deg = 270;
        break;
      case 'down':
        deg = 90;
        break;
      case 'left':
        deg = 180;
    }
    this.node.css({transform: `rotate(${deg}deg)`});
  }
}