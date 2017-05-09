var shurikenBitmap;

class Attacks {
  constructor(stage, startX, startY, direction, callback){
    this.stage = stage;
    this.image = document.getElementById("shuriken");
    if (direction === "right"){
      this.x = startX + 122.5;
      this.y = startY + 60;
      this.speed = 15;
      this.direction = "right";
    }
    else{
      this.x = startX + 10;
      this.y = startY + 60;
      this.speed = -15;
      this.direction = "left";
    }
    this.drawShuriken = this.drawShuriken.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.hitEdge = this.hitEdge.bind(this);
    this.reset = callback;
  }
  drawShuriken(event){
    this.stage.removeChild(this.bitmap);

    shurikenBitmap = new createjs.Bitmap(this.image);
    this.bitmap = shurikenBitmap;
    this.bitmap.scaleX = 0.1;
    this.bitmap.scaleY = 0.1;
    this.bitmap.x = this.x;
    this.bitmap.y = this.y;
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
      this.hitEdge();
    }
    else{
      // debugger
      this.x += this.speed;
      this.drawShuriken();
      this.hitEdge();
    }
    // this.stage.update();
  }

  hitEdge(){
    var rightSide = this.stage.canvas.width - (this.image.width * .1);
    if ((this.x > rightSide) ||(this.x < 0)){
      console.log("hitting edge");
      console.log(this.x);
      createjs.Ticker.removeEventListener("tick", this.handleTick);
      this.stage.removeChild(this.bitmap);
      this.hit = true;
      this.reset();
      // debugger
    }
  }
}

module.exports = Attacks;
