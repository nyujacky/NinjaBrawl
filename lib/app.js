const Game = require('./game.js');


document.addEventListener("DOMContentLoaded", function(){
  // const canvasEl = document.getElementsById("main-Canvas");
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;

  // const ctx = canvasEl.getContext("2d");
  const game = new Game();
  // new GameView(game, ctx).start();
  document.getElementById('main-Canvas').style.visibility = "hidden";
  game.init();
  // game.displayMenu();
});
