var charBitmap;

var left, right, up, down, space;
var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;
    KEYCODE_SPACE = 32;
class Cat{
  constructor(stage){
    // super(props);
    this.stage = stage;
    this.handleTick = this.handleTick.bind(this);
    this.char = document.getElementById("cat-img");
  }

  drawCharacters(event){
    // var char = event.target;
    charBitmap = new createjs.Bitmap(this.char);

    this.stage.addChild(charBitmap);
    charBitmap.x = this.stage.canvas.width - 150;
    charBitmap.y = this.stage.canvas.height - 110;
    this.stage.update();

  }


  keyPressed(event) {
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    switch (event.keyCode) {
        case KEYCODE_LEFT:
            console.log("left held");
            left = true;
            break;
        case KEYCODE_RIGHT:
            console.log("right held");
            right = true;
            break;
        case KEYCODE_UP:
            console.log("up held");
            up = true;
            break;
        case KEYCODE_DOWN:
            console.log("down held");
            down = true;
            break;
        case KEYCODE_SPACE:
            console.log("space held");
            space = true;
            break;
    }
  }

  keyUp(event) {
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    switch (event.keyCode) {
        case KEYCODE_LEFT:
            console.log("left released");
            left = false;
            break;
        case KEYCODE_RIGHT:
            console.log("right released");
            right = false;
            break;
        case KEYCODE_UP:
            console.log("up released");
            up = false;
            break;
        case KEYCODE_DOWN:
            console.log("down released");
            down = false;
            break;
        case KEYCODE_SPACE:
            console.log("space released");
            space = false;
            break;
    }
  }


  handleTick(event) {
      /*Scaling down the image*/
      charBitmap.scaleX = 0.3;
      charBitmap.scaleY = 0.3;

      if (left) {
        console.log("going left");
          charBitmap.x -= 5;
      } else if (right) {
        console.log("going right");
          charBitmap.x += 5;
      }

      if (up) {
        console.log("going up");
          charBitmap.y -= 5;
      }
      else if (down) {
        console.log("going down");
          charBitmap.y += 5;
        }
      else if (space){
        console.log("jumping up");
        charBitmap.y -= 50;
      }

      if (charBitmap.x > this.stage.canvas.width) {
          charBitmap.x = this.stage.canvas.width;
      }
      this.stage.update();
  }
}

module.exports = Cat;
