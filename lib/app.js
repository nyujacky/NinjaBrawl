const Game = require('./game.js');
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
