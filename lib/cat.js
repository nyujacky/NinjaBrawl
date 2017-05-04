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
    charBitmap.speedX = 0;
    charBitmap.speedY = 0;
    charBitmap.gravity = 1.5;
    charBitmap.gravitySpeed = 0;
    charBitmap.bounce = 0;
    this.stage.update();
    // debugger
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
        // case KEYCODE_UP:
        //     console.log("up held");
        //     up = true;
        //     break;
        // case KEYCODE_DOWN:
        //     console.log("down held");
        //     down = true;
        //     break;
        case KEYCODE_UP:
            console.log("up held");
            // space = true;
            console.log(charBitmap.y);
            charBitmap.gravitySpeed = -20;
            break;
        // case KEYCODE_DOWN:
        //     console.log("down held");
        //     // space = true;
        //     charBitmap.gravitySpeed = + 7;
        //     break;
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
            console.log(charBitmap.x);
            left = false;
            break;
        case KEYCODE_RIGHT:
            console.log("right released");
            console.log(charBitmap.x);
            right = false;
            break;
        // case KEYCODE_UP:
        //     console.log("up released");
        //     up = false;
        //     break;
        // case KEYCODE_DOWN:
        //     console.log("down released");
        //     down = false;
        //     break;
        // case KEYCODE_SPACE:
        //     console.log("space released");
        //     space = false;
        //     break;
    }
  }


  handleTick(event) {
      /*Scaling down the image*/
      charBitmap.scaleX = 0.3;
      charBitmap.scaleY = 0.3;

      if (left) {
        console.log("going left");
        console.log(charBitmap.x);
        // debugger
          charBitmap.x -= charBitmap.speedX + 5;
          this.hitEdges();
      } else if (right) {
        console.log("going right");
        console.log(charBitmap.x);
          charBitmap.x += charBitmap.speedX + 5;
          this.hitEdges();
      }

      // if (up) {
      //   console.log("going up");
      //     charBitmap.y -= 5;
      // }
      // else if (down) {
      //   console.log("going down");
      //     charBitmap.y += 5;
      //   }
      // if (space){
        // console.log("jumping up");
        // charBitmap.speedY = - 10;
        // if (charBitmap.gravitySpeed != 0){
          charBitmap.gravitySpeed += charBitmap.gravity;
        // }
        // charBitmap.x += charBitmap.speedX;
        charBitmap.y += charBitmap.speedY + charBitmap.gravitySpeed;
        this.hitEdges();

      // }

      // if (charBitmap.x > this.stage.canvas.width) {
      //     charBitmap.x = this.stage.canvas.width;
      // }
      this.stage.update();
  }
  jump(event){
    console.log("jumping");
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    if (event.keyCode === KEYCODE_SPACE){
      charBitmap.gravitySpeed = - 10;

    }
  }
  hitEdges(){
    var rockbottom = this.stage.canvas.height - (charBitmap.getBounds().height*.3);
    var rightEdge = this.stage.canvas.width - (charBitmap.getBounds().width*.3);
    // debugger
    // console.log(charBitmap.y);
    if (charBitmap.y > rockbottom){
      // debugger
      charBitmap.y = rockbottom;
      // console.log(charBitmap.y);
      charBitmap.gravitySpeed = -(charBitmap.gravitySpeed * charBitmap.bounce);
    }
    else if (charBitmap.y < 0){
      // debugger
      // charBitmap.y = rockbottom;
      console.log( charBitmap.y);
      charBitmap.y = 0;
      charBitmap.gravitySpeed = 0;
    }
    else if (charBitmap.x > rightEdge){
      // debugger
      charBitmap.x = rightEdge;
    }
    else if(charBitmap.x < 0 ){
      charBitmap.x = 0;
    }
  }
}



module.exports = Cat;
