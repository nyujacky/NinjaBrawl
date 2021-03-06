const Player = require('./player.js');
const Shuriken = require('./attacks.js');
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
