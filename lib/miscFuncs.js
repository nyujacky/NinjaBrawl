
function hideMenu(){
  // debugger
  window.p1Dead = false;
  window.p2Dead = false;
  window.p1Hit = false;
  window.p2Hit = false;
  hideGameOver();
  var menu = document.getElementById("game-screen");
  if(!menu.className.includes("hide")){
    menu.className += (" hide");
  }
  document.getElementById('main-Canvas').style.visibility = "visible";

  // menu.style.visibility = "hidden";
  // menu.style.zIndex = -1;
  // var start = document.getElementById("start-button");
}
function showMenu(){
  // debugger
  hideGameOver();
  var menu = document.getElementById("game-screen");
  if(menu.className.includes("hide")){
    menu.className = menu.className.replace(" hide","");
  }
  document.getElementById('main-Canvas').style.visibility = "hidden";
  // menu.style.visibility = "hidden";
  // menu.style.zIndex = -1;
  // var start = document.getElementById("start-button");
}
function gameOverMenu(animate){
  // hideMenu();
  var menu = document.getElementById("game-end-screen");
  if(menu.className.includes("hide")){
    menu.className = menu.className.replace(" hide", "");
    menu.style.zIndex = 3;
    // animate.gotoAndStop("falldead");
  }
  document.getElementById('main-Canvas').style.visibility = "hidden";
}
function hideGameOver(){
  var menu = document.getElementById("game-end-screen");
  if(!menu.className.includes("hide")){
    menu.className += (" hide");
    menu.style.zIndex = 1;
  }
  // document.getElementById('main-Canvas').style.visibility = "visible";

}
