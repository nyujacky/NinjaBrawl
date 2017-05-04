var stage;
var canvas;
var bg;
var charBitmap;
var char;
var left, right, up, down, space;
var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;
    KEYCODE_SPACE = 32;
function init(){
  canvas = document.getElementById("main-Canvas")
  stage = new createjs.Stage(canvas);

//Creates background
  // bg = new Image();
  // bg.src = "images/dojobackground2.jpg";
  // bg.onload = setBG;

  char = new Image();
  char.src = "images/ninjacat.png";
  char.onload = drawCharacters;
  document.onkeydown = keyPressed;
  document.onkeyup = keyUp;

  createjs.Ticker.addEventListener("tick", handleTick);
}
//

// function setBG(event){
//   var background = new createjs.Bitmap(bg);
//   stage.addChild(background);
//   stage.update();
// }
function drawCharacters(event){
  // var char = event.target;
  charBitmap = new createjs.Bitmap(char);
  stage.addChild(charBitmap);
  charBitmap.x = canvas.width - 150;
  charBitmap.y = canvas.height - 110;
  stage.update();
  // debugger

}


function keyPressed(event) {
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

function keyUp(event) {
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


function handleTick(event) {
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

    if (charBitmap.x > stage.canvas.width) {
        charBitmap.x = stage.canvas.width;
    }
    stage.update();
}
