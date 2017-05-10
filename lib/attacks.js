var shurikenBitmap;

class Attacks {
  constructor(stage, startX, startY, direction, callback){
    this.stage = stage;
    this.image = document.getElementById("shuriken");
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
    var rightSide = this.stage.canvas.width - (this.image.width );
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

      }
      else{

      }
    }
  }
}

module.exports = Attacks;
