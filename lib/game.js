var stage;
var canvas;
var bg;
var charBitmap;
var char;
function init(){
  canvas = document.getElementById("main-Canvas")
  stage = new createjs.Stage(canvas);

  // bg = new Image();
  // bg.src = "images/dojobackground2.jpg";
  // bg.onload = setBG;

  char = new Image();
  char.src = "images/ninjacat.png";
  char.onload = drawCharacters;

}
//

function setBG(event){
  var background = new createjs.Bitmap(bg);
  stage.addChild(background);
  stage.update();
}
function drawCharacters(event){
  // var char = event.target;
  charBitmap = new createjs.Bitmap(char);
  stage.addChild(charBitmap);
  charBitmap.x = canvas.width - 400;
  charBitmap.y = canvas.height - 345;
  stage.update();
  // debugger

}
