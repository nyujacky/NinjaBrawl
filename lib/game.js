const Cat = require('./cat.js');
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
    document.onkeydown = cat.keyPressed;
    document.onkeyup = cat.keyUp;

    createjs.Ticker.addEventListener("tick", cat.handleTick);
  }
}

module.exports = Game;
//

// function setBG(event){
//   var background = new createjs.Bitmap(bg);
//   stage.addChild(background);
//   stage.update();
// }
