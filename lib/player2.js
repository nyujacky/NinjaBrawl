var player2Bitmap;

var left, right, up, down, space;
var KEYCODE_A = 65,
    KEYCODE_D = 68,
    KEYCODE_W = 87,
    KEYCODE_S = 83;
    // KEYCODE_SPACE = 32;
class Player2{
  constructor(stage, imageId){
    // super(props);
    this.stage = stage;
    this.handleTick = this.handleTick.bind(this);
    this.char = document.getElementById(imageId);
    this.id = this.char.id;

  }

  drawCharacters(event){
    // var char = event.target;
    player2Bitmap = new createjs.Bitmap(this.char);

    this.stage.addChild(player2Bitmap);
    player2Bitmap.x = 0 + 70;
    player2Bitmap.y = this.stage.canvas.height - 110;
    player2Bitmap.speedX = 0;
    player2Bitmap.speedY = 0;
    player2Bitmap.gravity = 1.5;
    player2Bitmap.gravitySpeed = 0;
    player2Bitmap.bounce = 0;
    this.stage.update();
    // debugger
  }


  keyPressed(event) {
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    switch (event.keyCode) {
        case KEYCODE_A:
            console.log("left held");
            left = true;
            break;
        case KEYCODE_D:
            console.log("right held");
            right = true;
            break;
        // case KEYCODE_W:
        //     console.log("up held");
        //     up = true;
        //     break;
        // case KEYCODE_S:
        //     console.log("down held");
        //     down = true;
        //     break;
        case KEYCODE_W:
            console.log("up held");
            // space = true;
            console.log(player2Bitmap.y);
            player2Bitmap.gravitySpeed = -20;
            break;
        // case KEYCODE_S:
        //     console.log("down held");
        //     // space = true;
        //     player2Bitmap.gravitySpeed = + 7;
        //     break;
    }
  }

  keyUp(event) {
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    switch (event.keyCode) {
        case KEYCODE_A:
            console.log("left released");
            console.log(player2Bitmap.x);
            left = false;
            break;
        case KEYCODE_D:
            console.log("right released");
            console.log(player2Bitmap.x);
            right = false;
            break;
        // case KEYCODE_W:
        //     console.log("up released");
        //     up = false;
        //     break;
        // case KEYCODE_S:
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
      player2Bitmap.scaleX = 0.3;
      player2Bitmap.scaleY = 0.3;

      if (left) {
        console.log("going left");
        console.log(player2Bitmap.x);
        // debugger
          player2Bitmap.x -= player2Bitmap.speedX + 5;
          this.hitEdges();
      } else if (right) {
        console.log("going right");
        console.log(player2Bitmap.x);
          player2Bitmap.x += player2Bitmap.speedX + 5;
          this.hitEdges();
      }

      // if (up) {
      //   console.log("going up");
      //     player2Bitmap.y -= 5;
      // }
      // else if (down) {
      //   console.log("going down");
      //     player2Bitmap.y += 5;
      //   }
      // if (space){
        // console.log("jumping up");
        // player2Bitmap.speedY = - 10;
        // if (player2Bitmap.gravitySpeed != 0){
          player2Bitmap.gravitySpeed += player2Bitmap.gravity;
        // }
        // player2Bitmap.x += player2Bitmap.speedX;
        player2Bitmap.y += player2Bitmap.speedY + player2Bitmap.gravitySpeed;
        this.hitEdges();

      // }

      // if (player2Bitmap.x > this.stage.canvas.width) {
      //     player2Bitmap.x = this.stage.canvas.width;
      // }
      this.stage.update();
  }

  hitEdges(){
    var rockbottom = this.stage.canvas.height - (player2Bitmap.getBounds().height*.3);
    var rightEdge = this.stage.canvas.width - (player2Bitmap.getBounds().width*.3);
    // debugger
    // console.log(player2Bitmap.y);
    if (player2Bitmap.y > rockbottom){
      // debugger
      player2Bitmap.y = rockbottom;
      // console.log(player2Bitmap.y);
      player2Bitmap.gravitySpeed = -(player2Bitmap.gravitySpeed * player2Bitmap.bounce);
    }
    else if (player2Bitmap.y < 0){
      // debugger
      // player2Bitmap.y = rockbottom;
      console.log( player2Bitmap.y);
      player2Bitmap.y = 0;
      player2Bitmap.gravitySpeed = 0;
    }
    else if (player2Bitmap.x > rightEdge){
      // debugger
      player2Bitmap.x = rightEdge;
    }
    else if(player2Bitmap.x < 0 ){
      player2Bitmap.x = 0;
    }
  }
}



module.exports = Player2;
