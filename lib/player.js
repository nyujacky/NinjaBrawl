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
    var image;
class Player{
  constructor(stage, xstartPos, ystartPos, controlType){
    if(controlType === 1){
      image = "images/full_cat.png";
    }
    else{
      image = "images/full_cat_blue.png";
    }
    var fighterData = {
      images: [image],
      frames: {width: 64, height: 64},
      animations: {
        idle: [0,3, "idle", .05],
        walk:[ 16,23, "idle", .15],
        powershot:[80,85, "idle", .5],
        jump: [32, 39, "idle", .15],
        falldead: [64, 70, "dead", .15],
        dead: [70]
      }
      };
    var fighterSheet = new createjs.SpriteSheet(fighterData);
    this.stage = stage;
    this.handleTick = this.handleTick.bind(this);
    this.xstartPos = xstartPos;
    this.ystartPos = ystartPos;
    this.controlType = controlType;
    this.keyPressed = this.keyPressed.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.drawCharacters = this.drawCharacters.bind(this);

    this.resetAttack = this.resetAttack.bind(this);
    this.animations = new createjs.Sprite(fighterSheet);
    let shuriken = new Shuriken(this.stage, 110 ,400, this.faceDirection, this.resetAttack, this.controlType);

    if (controlType === 2){
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
    this.stage.addChild(this.animations);
    this.animations.gotoAndPlay("idle");
    if (this.controlType === 1){

      this.animations.regX = 32;
      this.animations.scaleX = 3;
    }
    else{
      this.animations.regX = 32;
      this.animations.scaleX = -3;
    }
    this.animations.regY = 0;
    this.animations.scaleY = 3;

    // debugger
    this.setStart(this.xstartPos, this.ystartPos);
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 1.5;
    this.gravitySpeed = 0;
    this.bounce = 0;
    // this.scaleX = 0.3;
    // this.scaleY = 0.3;
    this.stage.update();
  }
  setStart(xPos, yPos){
    // player1Bitmap.x = this.stage.canvas.width - xPos;
    this.animations.x = xPos;
    this.animations.y = this.stage.canvas.height - yPos;
  }

  keyPressed(event) {

    event.preventDefault();
    if(this.controlType == 1 && window.p1Dead == true){
      return
    }
    if(this.controlType == 2 && window.p2Dead == true){
      return
    }
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
          this.animations.gotoAndPlay("jump");
          this.gravitySpeed = -20;
          break;
        case this.throw:
        // debugger
          if(this.makethrow !== true){
            this.makethrow = true;
            this.animations.gotoAndPlay("powershot");


            let shuriken = new Shuriken(this.stage, this.animations.x , this.animations.y, this.faceDirection, this.resetAttack, this.controlType);
            this.attacking = true;
            shurikenContainer.push(shuriken);
            createjs.Ticker.addEventListener("tick",shuriken.handleTick);

          }

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
          // await sleep(1000);
          break;
    }
  }


  handleTick(event) {

      /*Scaling down the image*/
      if(this.controlType == 1 && window.p1Dead == true){
        return
      }
      if(this.controlType == 2 && window.p2Dead == true){
        return
      }
      // debugger
      if (this.moveleft) {
        this.animations.scaleX = -3;
        this.animations.gotoAndPlay("walk");
          this.animations.x -= this.speedX + 5;

          this.hitEdges();
      } else if (this.moveright) {
          this.animations.scaleX = 3;

          this.animations.gotoAndPlay("walk");
          this.animations.x += this.speedX + 5;
          this.hitEdges();
      }
      if (left2) {
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

      if (window.p1Dead != true && window.p1Hit && this.controlType == 1){
        // debugger
        // this.animations.gotoAndStop("falldead");
        // this.loseHealth();
        this.animations.gotoAndStop("idle");
        this.animations.gotoAndPlay("falldead");
        window.p1Dead = true;

        this.animations.gotoAndPlay("falldead");
        gameOverMenu();

      }
      else if(window.p2Dead != true && window.p2Hit&& this.controlType == 2){
        // debugger
        this.animations.gotoAndStop("idle");
        this.animations.gotoAndPlay("falldead");
        window.p2Dead = true;
        // window.p2Hit = false;
        this.animations.gotoAndPlay("falldead");

        gameOverMenu();

      }

      this.stage.update();
  }



  hitEdges(){
    // var rockbottom = this.stage.canvas.height - (this.animations.getBounds().height*3) ;
    var rockbottom = this.stage.canvas.height - 176 ;
    var rightEdge = this.stage.canvas.width ;
    if (this.animations.y > rockbottom){
      this.animations.y = rockbottom;
      this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    }
    else if (this.animations.y < 0){
      this.animations.y = 0;
      this.gravitySpeed = 0;
    }
    else if (this.animations.x > rightEdge){
      this.animations.x = rightEdge;
    }
    else if(this.animations.x < 0 ){
      this.animations.x = 0;
    }
  }


  loseHealth(){
    // var
      // hitBtn = $('button.damage'),
        // reset = $('button.reset'),

        this.hBar = $('.health-bar');
        this.bar = this.hBar.find('.bar');
        this.hit = this.hBar.find('.hit');

    // hitBtn.on("click", function(){
      // var
      this.total = this.hBar.data('total');
          this.value = this.hBar.data('value');
          debugger
      // if (value < 0) {
      //   return;
      // }
      // max damage is essentially quarter of max life
      // var
      // this.damage = Math.floor(Math.random()*this.total);
      this.damage = 100;
      // var
      this.newValue = this.value - this.damage;
      // calculate the percentage of the total width
      // var
      this.barWidth = (this.newValue / this.total) * 100;
      // var
      this.hitWidth = (this.damage / this.value) * 100 + "%";

      // show hit bar and set the width
      this.hit.css('width', this.hitWidth);
      this.hBar.data('value', this.newValue);
      setTimeout(function(){
        this.hit.css({'width': '0'});
        this.bar.css('width', this.barWidth + "%");
      }, 500);
      //bar.css('width', total - value);
      //
      // log(value, damage, hitWidth);
      //
      // if( value < 0){
      //   log("DEAD");
      // }
    // });

    // reset.on('click', function(e){
    //   hBar.data('value', hBar.data('total'));
    //
    //   hit.css({'width': '0'});
    //
  	// 	bar.css({'width': '100%'});
    // });
  };



  log(_total, _damage, _hitWidth){
    var log = $('.log');

    if(_damage !== undefined && _hitWidth !== undefined) {
  	  log.append("<div>H:"+_total+" D:"+_damage+" W:"+_hitWidth+" = " + (_total - _damage) + "</div>");
    } else {
      log.append("<div>"+_total+"</div>");
    }
  };
}






module.exports = Player;
