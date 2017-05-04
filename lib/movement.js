var left, right, up, down, space, left2, right2, up2, down2;
var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40,
    KEYCODE_A = 65,
    KEYCODE_D = 68,
    KEYCODE_W = 87,
    KEYCODE_S = 83;

// class Movement{
  exports.keyPressed = function(event) {
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
        // case KEYCODE_A:
        //     console.log("left2 held");
        //     left2 = true;
        //     break;
        // case KEYCODE_D:
        //     console.log("right2 held");
        //     right2 = true;
        //     break;


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
            console.log(player1Bitmap.y);
            player1Bitmap.gravitySpeed = -20;
            break;
        // case KEYCODE_W:
        //     console.log("up2 held");
        //     // space = true;
        //     console.log(player1Bitmap.y);
        //     player1Bitmap.gravitySpeed = -20;
        //     break;


        // case KEYCODE_DOWN:
        //     console.log("down held");
        //     // space = true;
        //     player1Bitmap.gravitySpeed = + 7;
        //     break;
    }
  };

  // keyUp(event) {
  //   event.preventDefault();
  //   if (!event) {
  //       var event = window.event;
  //   }
  //   switch (event.keyCode) {
  //       case KEYCODE_LEFT:
  //           console.log("left released");
  //           console.log(player1Bitmap.x);
  //           left = false;
  //           // debugger
  //           break;
  //       case KEYCODE_RIGHT:
  //           console.log("right released");
  //           console.log(player1Bitmap.x);
  //           right = false;
  //           break;
  //
  //       // case KEYCODE_A:
  //       //     console.log("left2 released");
  //       //     left2 = false;
  //       //     break;
  //       // case KEYCODE_D:
  //       //     console.log("right2 released");
  //       //     right2 = false;
  //       //     break;
  //
  //
  //       // case KEYCODE_UP:
  //       //     console.log("up released");
  //       //     up = false;
  //       //     break;
  //       // case KEYCODE_DOWN:
  //       //     console.log("down released");
  //       //     down = false;
  //       //     break;
  //       // case KEYCODE_SPACE:
  //       //     console.log("space released");
  //       //     space = false;
  //       //     break;
  //   }
  // }

  
// }

// module.exports = Movement;
