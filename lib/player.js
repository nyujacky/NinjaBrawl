const Shuriken = require('./attacks.js');

// var player1Bitmap;
var shurikenContainer = [];

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

var fighterData = {
  images: ["images/full_cat.png"],
  frames: {width: 64, height: 64},
  animations: {
    idle: [0,3, "idle", .05],
    walk:[ 16,23, "idle", .15],
    // powershot:{frames:[79,85], speed: .7}
    // powershot:[63,71]
    powershot:[80,85, "powershot", .15],
    jump: [32, 39, "idle", .15]
  }
  };
var fighterSheet = new createjs.SpriteSheet(fighterData);
class Player{
  constructor(stage, imageId, xstartPos, ystartPos, controlType){
    this.stage = stage;
    this.handleTick = this.handleTick.bind(this);
    // this.char = document.getElementById(imageId);
    // this.id = this.char.id;
    this.xstartPos = xstartPos;
    this.ystartPos = ystartPos;
    this.controlType = controlType;
    this.keyPressed = this.keyPressed.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.drawCharacters = this.drawCharacters.bind(this);
    // this.setStart = this.setStart.bind(this);
    // this.moveleft = false;
    // this.moveright = false;
    // this.moveup = false;
    // this.makethrow = false;
    // this.attacking = false;
    // debugger
    this.resetAttack = this.resetAttack.bind(this);
    this.animations = new createjs.Sprite(fighterSheet);
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
  resetAttack(){
    this.attacking = false;
  }
  drawCharacters(event){
    // player1Bitmap = new createjs.Bitmap(this.char);
    // this.bitmap = player1Bitmap;
    // this.stage.addChild(player1Bitmap);
    this.stage.addChild(this.animations);
    this.animations.gotoAndPlay("idle");
    if (this.controlType === 2){

      this.animations.scaleX = 3;
    }
    else{
      this.animations.scaleX = -3;
    }
    this.animations.scaleY = 3;
    // debugger
    this.setStart(this.xstartPos, this.ystartPos);
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 1.5;
    this.gravitySpeed = 0;
    this.bounce = 0;
    this.scaleX = 0.3;
    this.scaleY = 0.3;
    this.stage.update();
  }
  // setStart(xPos, yPos){
  //   // player1Bitmap.x = this.stage.canvas.width - xPos;
  //   player1Bitmap.x = xPos;
  //   player1Bitmap.y = this.stage.canvas.height - yPos;
  // }
  setStart(xPos, yPos){
    // player1Bitmap.x = this.stage.canvas.width - xPos;
    this.animations.x = xPos;
    this.animations.y = this.stage.canvas.height - yPos;
  }

  keyPressed(event) {
    event.preventDefault();
    if (!event) {
        var event = window.event;
    }
    switch (event.keyCode) {
        case this.left:
        this.animations.gotoAndPlay("walk");

          this.moveleft = true;
          this.faceDirection = "left";


          break;
        case this.right:
          this.animations.gotoAndPlay("walk");

          this.moveright = true;
          this.faceDirection = "right";

          break;

        case this.up:
          this.moveup = true;
          this.animations.gotoAndPlay("jump");
          this.gravitySpeed = -20;
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
        this.animations.gotoAndPlay("walk");
          this.moveleft = false;
          break;
        case this.right:
        this.animations.gotoAndPlay("walk");

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
          this.animations.x -= this.speedX + 5;
          this.hitEdges();
          this.animations.gotoAndPlay("walk");
      } else if (this.moveright) {
        this.animations.gotoAndPlay("walk");

          this.animations.x += this.speedX + 5;
          this.hitEdges();
          // debugger
      }
      if (left2) {
        // debugger
          this.x -= this.speedX + 5;
          this.hitEdges();
      } else if (right2) {
          this.x += this.speedX + 5;
          this.hitEdges();
      }

      if (this.moveup){

        this.gravitySpeed += this.gravity;
        this.animations.y += this.speedY + this.gravitySpeed;
        this.hitEdges();
      }
      if (this.makethrow && this.attacking === false){
        // console.log("new shuriken");
        let shuriken = new Shuriken(this.stage, this.x, this.y, this.faceDirection, this.resetAttack);
        this.attacking = true;
        shurikenContainer.push(shuriken);
        // shuriken.drawShuriken();
        // debugger
        createjs.Ticker.addEventListener("tick",shuriken.handleTick);
      }

      shurikenContainer = shurikenContainer.filter(shuriken => {
        // this.stage.removeChild(shuriken.bitmap);
        // console.log("hi");
        // console.log(shurikenContainer.length);
        return shuriken.hit === false;
      });
      // debugger
      // console.log(shurikenContainer.length);
      shurikenContainer.forEach(shuriken => {
        shuriken.drawShuriken();
      });


      this.stage.update();
  }

  hitEdges(){
    var rockbottom = this.stage.canvas.height - (this.animations.getBounds().height*3);
    var rightEdge = this.stage.canvas.width - (this.animations.getBounds().width*3);
    if (this.animations.y > rockbottom){
      this.animations.y = rockbottom;
      this.animations.gravitySpeed = -(this.animations.gravitySpeed * this.animations.bounce);
    }
    else if (this.animations.y < 0){
      this.animations.y = 0;
      this.animations.gravitySpeed = 0;
    }
    else if (this.animations.x > rightEdge){
      this.animations.x = rightEdge;
    }
    else if(this.animations.x < 0 ){
      this.animations.x = 0;
    }
  }
}



module.exports = Player;
