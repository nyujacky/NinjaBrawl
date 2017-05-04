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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Cat = __webpack_require__(2);
var stage;
var canvas;
var bg;
var char;
class Game{
  constructor(){

  }


  init(){
    canvas = document.getElementById("main-Canvas")
    stage = new createjs.Stage(canvas);
  //Creates background
    // bg = new Image();
    // bg.src = "images/dojobackground2.jpg";
    // bg.onload = setBG;

    // char = new Image();
    // char.src = "images/ninjacat.png";
    let cat = new Cat(stage);

    cat.drawCharacters();
    // $(document).keypress(cat.jump);

    // $(document).keypress(cat.keyPressed);



    document.onkeydown = cat.keyPressed;
    // $(document).on('keypress',()=>cat.jump);
    // document.onkeypress = cat.jump;
    document.onkeyup = cat.keyUp;

    createjs.Ticker.addEventListener("tick", cat.handleTick);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);


document.addEventListener("DOMContentLoaded", function(){
  // const canvasEl = document.getElementsById("main-Canvas");
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;

  // const ctx = canvasEl.getContext("2d");
  const game = new Game();
  // new GameView(game, ctx).start();
  game.init();

});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
    charBitmap.gravity = .2499;
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
            charBitmap.gravitySpeed = - 7;
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
      } else if (right) {
        console.log("going right");
        console.log(charBitmap.x);
          charBitmap.x += charBitmap.speedX + 5;
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
        if (charBitmap.gravitySpeed != 0){
          charBitmap.gravitySpeed += charBitmap.gravity;
        }
        // charBitmap.x += charBitmap.speedX;
        charBitmap.y += charBitmap.speedY + charBitmap.gravitySpeed;
        this.hitBottom();

      // }

      if (charBitmap.x > this.stage.canvas.width) {
          charBitmap.x = this.stage.canvas.width;
      }
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
  hitBottom(){
    var rockbottom = this.stage.canvas.height - (charBitmap.getBounds().height*.3);
    // debugger
    // console.log(charBitmap.y);
    if (charBitmap.y > rockbottom){
      // debugger
      charBitmap.y = rockbottom;
      charBitmap.gravitySpeed = -(charBitmap.gravitySpeed * charBitmap.bounce);
    }
  }
}



module.exports = Cat;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map