/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var shurikenBitmap;

class Attacks {
  constructor(stage, startX, startY, direction, callback, controlType){
    this.stage = stage;
    if(controlType === 1){
      this.image = document.getElementById("shuriken1");
    }
    else{
        this.image = document.getElementById("shuriken");
    }
    // debugger
    if (direction === "right"){
      this.x = startX + 48;
      this.y = startY + 96;
      this.speed = 15;
      this.direction = "right";
    }
    else{
      this.x = startX - 48;
      this.y = startY + 96 ;
      this.speed = -15;
      this.direction = "left";
    }
    this.drawShuriken = this.drawShuriken.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.hitEdge = this.hitEdge.bind(this);
    this.reset = callback;

  }
  drawShuriken(event){
    // debugger
    this.stage.removeChild(this.bitmap);
    // console.log("children[1] bounds");
    // console.log(this.stage.children[1].getTransformedBounds());
    // console.log("Start pos");
    // console.log(this.x);
    shurikenBitmap = new createjs.Bitmap(this.image);
    this.bitmap = shurikenBitmap;
    this.bitmap.x = this.x;
    this.bitmap.y = this.y;
    this.bitmap.regX = 16;
    this.bitmap.regY = 0;
    this.bitmap.speed = this.speed;
    this.bitmap.direction = this.direction;
    this.hit = false;
    this.stage.addChild(this.bitmap);
    // debugger
    // this.stage.update();
  }

  handleTick(event){
    // debugger

    if(this.direction === "right"){
      // console.log("shuriken going right");
      // console.log(this.x);
      this.x += this.speed;
      this.drawShuriken();
      this.hitPerson();
      this.hitEdge();
    }
    else{
      // debugger
      this.x += this.speed;
      this.drawShuriken();
      this.hitPerson();
      this.hitEdge();
    }
    // this.stage.update();
  }

  hitEdge(){
    var rightSide = this.stage.canvas.width ;
    if ((this.x > rightSide) ||(this.x < 0)){
      console.log("hitting edge");
      console.log(this.x);
      // debugger
      createjs.Ticker.removeEventListener("tick", this.handleTick);
      this.stage.removeChild(this.bitmap);
      this.hit = true;
      this.reset();
    }
  }

  hitPerson(){
    let p1 = this.stage.children[0];
    let p2 = this.stage.children[1];
    let curShuriken = this.bitmap;
    //Cat is 22 pixels wide, tranformed bounds has center x
    //            Used 21 instead of 16(width of shuriken) to allow better approximation
    let hitp1 = ((curShuriken.x >= p1.x - 21) && (curShuriken.x <= p1.x +21) &&
                    //Should be 32 but to make it hit closer, use 48
                  (curShuriken.y >= p1.y + 48) && (curShuriken.y <= p1.y + 96 + 48)
                  );
    let hitp2 = ((curShuriken.x >= p2.x -21 ) && (curShuriken.x <= p2.x + 21)&&
    (curShuriken.y >= p2.y + 48) && (curShuriken.y <= p2.y + 96 + 48)

                  );
    if (hitp1 || hitp2){
      // debugger
      console.log("Hit person");
      createjs.Ticker.removeEventListener("tick", this.handleTick);
      this.stage.removeChild(curShuriken);
      if(hitp1){
        window.p1Hit = true;
      }
      else{
        window.p2Hit = true;

      }
    }
  }
}

module.exports = Attacks;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(3);
const Shuriken = __webpack_require__(0);
// const Player2 = require('./player2.js');
// const Shuriken = require('./attacks.js');
var stage;
var canvas;
var bg;
var char;
class Game{
  constructor(){


  }

  init(){
    if(stage){
      stage.removeAllChildren();
      // debugger
      createjs.Ticker.removeAllEventListeners();
      stage.enableDOMEvents(false);
      stage.canvas = this.canvas;
      stage.clear();
    }

    canvas = document.getElementById("main-Canvas");
    let context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width,canvas.height);
    stage = new createjs.Stage(canvas);
  //Creates background
    // bg = new Image();
    // bg.src = "images/dojobackground2.jpg";
    // bg.onload = setBG;

    // char = new Image();
    // char.src = "images/ninjaplayer1.png";
    // 176 because 192(full height) - 16(white space below cat) above bottom of screen
    let player1 = new Player(stage, 70, 176, 1);
    let player2 = new Player(stage, 1000, 176, 2);

    // let player1 = new Player(stage, "cat-img", 930, 110, 1);
    // let player2 = new Player(stage, "white-cat-img", 70, 110, 2);
    player1.drawCharacters();
    player2.drawCharacters();


    // document.onkeydown = player1.keyPressed;
    document.onkeydown = (e) => {player2.keyPressed(e);
                                 player1.keyPressed(e)};

    // document.onkeyup = player1.keyUp;
    document.onkeyup = (e) => {player2.keyUp(e);
                               player1.keyUp(e)};

    createjs.Ticker.addEventListener("tick", player1.handleTick);
    createjs.Ticker.addEventListener("tick", player2.handleTick);
    createjs.Ticker.setFPS(60);

  }

}


module.exports = Game;
//

// function setBG(event){
//   var background = new createjs.Bitmap(bg);
//   stage.addChild(background);
//   stage.update();
// }


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
var game = new Game();

document.addEventListener("DOMContentLoaded", function(){
  // const canvasEl = document.getElementsById("main-Canvas");
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;

  // const ctx = canvasEl.getContext("2d");
  // new GameView(game, ctx).start();
  document.getElementById('main-Canvas').style.visibility = "hidden";
  game.init();

  document.getElementById("reset-game").addEventListener("click", ()=> {
    game.init();
    showMenu();
  });
  // game.displayMenu();
});

function resetGame(){
  hideGameOver();


}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Shuriken = __webpack_require__(0);

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
        // setInterval(this.animations.gotoAndStop("falldead"), 2000);
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map