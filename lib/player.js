const Shuriken = require('./attacks.js');

var player1Bitmap;

var left, right, up, down, space, left2, right2, up2, down2;
var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40,
    KEYCODE_SHIFT = 16,
    KEYCODE_A = 65,
    KEYCODE_D = 68,
    KEYCODE_W = 87,
    KEYCODE_S = 83,
    KEYCODE_R = 82;
    // KEYCODE_SPACE = 32;
class Player{
  constructor(stage, imageId, xstartPos, ystartPos, controlType){
    this.stage = stage;
    this.handleTick = this.handleTick.bind(this);
    this.char = document.getElementById(imageId);
    this.id = this.char.id;
    this.xstartPos = xstartPos;
    this.ystartPos = ystartPos;
    this.keyPressed = this.keyPressed.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.drawCharacters = this.drawCharacters.bind(this);
    this.setStart = this.setStart.bind(this);
    this.moveleft = false;
    this.moveright = false;
    this.moveup = false;
    this.makethrow = false;


    if (controlType === 1){
      this.left = KEYCODE_LEFT;
      this.right = KEYCODE_RIGHT;
      this.up = KEYCODE_UP;
      this.throw = KEYCODE_SHIFT;
      this.faceDirection = "left";
    }
    else{
      this.left = KEYCODE_A;
      this.right = KEYCODE_D;
      this.up = KEYCODE_W;
      this.throw = KEYCODE_R;
      this.faceDirection = "right"
    }
  }

  drawCharacters(event){
    player1Bitmap = new createjs.Bitmap(this.char);
    this.bitmap = player1Bitmap;
    this.stage.addChild(player1Bitmap);
    this.setStart(this.xstartPos, this.ystartPos);
    // player1Bitmap.x = this.stage.canvas.width - 150;
    // player1Bitmap.y = this.stage.canvas.height - 110;
    player1Bitmap.speedX = 0;
    player1Bitmap.speedY = 0;
    player1Bitmap.gravity = 1.5;
    player1Bitmap.gravitySpeed = 0;
    player1Bitmap.bounce = 0;
    this.bitmap.scaleX = 0.3;
    this.bitmap.scaleY = 0.3;
    this.stage.update();
  }
  setStart(xPos, yPos){
    // player1Bitmap.x = this.stage.canvas.width - xPos;
    player1Bitmap.x = xPos;
    player1Bitmap.y = this.stage.canvas.height - yPos;
  }

  keyPressed(event) {
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    switch (event.keyCode) {
        case this.left:
          this.moveleft = true;
          this.faceDirection = "left";
          break;
        case this.right:
          this.moveright = true;
          this.faceDirection = "right";
          break;

        case this.up:
          this.moveup = true;
          this.bitmap.gravitySpeed = -20;
          break;
        case this.throw:
          this.makethrow = true;
          break;

    }
  }

  keyUp(event) {
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    switch (event.keyCode) {
        case this.left:
          this.moveleft = false;
          break;
        case this.right:
          this.moveright = false;
          break;
        case this.throw:
          this.makethrow = false;
          break;
    }
  }


  handleTick(event) {
      /*Scaling down the image*/


      if (this.moveleft) {
        // debugger
          this.bitmap.x -= this.bitmap.speedX + 5;
          this.hitEdges();
      } else if (this.moveright) {
          this.bitmap.x += this.bitmap.speedX + 5;
          this.hitEdges();
          // debugger
      }
      if (left2) {
        // debugger
          this.bitmap.x -= this.bitmap.speedX + 5;
          this.hitEdges();
      } else if (right2) {
          this.bitmap.x += this.bitmap.speedX + 5;
          this.hitEdges();
      }

      if (this.moveup){

        this.bitmap.gravitySpeed += this.bitmap.gravity;
        this.bitmap.y += this.bitmap.speedY + this.bitmap.gravitySpeed;
        this.hitEdges();
      }
      if (this.makethrow){
        new Attack(this.stage, this.bitmap.x, this.bitmap.y, this.faceDirection);
      }
      this.stage.update();
  }

  hitEdges(){
    var rockbottom = this.stage.canvas.height - (this.bitmap.getBounds().height*.3);
    var rightEdge = this.stage.canvas.width - (this.bitmap.getBounds().width*.3);
    if (this.bitmap.y > rockbottom){
      this.bitmap.y = rockbottom;
      this.bitmap.gravitySpeed = -(this.bitmap.gravitySpeed * this.bitmap.bounce);
    }
    else if (this.bitmap.y < 0){
      this.bitmap.y = 0;
      this.bitmap.gravitySpeed = 0;
    }
    else if (this.bitmap.x > rightEdge){
      this.bitmap.x = rightEdge;
    }
    else if(this.bitmap.x < 0 ){
      this.bitmap.x = 0;
    }
  }
}



module.exports = Player;
