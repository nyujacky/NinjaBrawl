var shurikenBitmap;

class Attacks {
  constructor(stage, startX, startY, direction, callback){
    this.stage = stage;
    this.image = document.getElementById("shuriken");
    // debugger
    if (direction === "right"){
      this.x = startX + 32;
      this.y = startY + 96;
      this.speed = 15;
      this.direction = "right";
    }
    else{
      this.x = startX - 32;
      this.y = startY + 96;
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
    // console.log("children[1] bounds");
    // console.log(this.stage.children[1].getTransformedBounds());
    // console.log("Start pos");
    // console.log(this.x);
    shurikenBitmap = new createjs.Bitmap(this.image);
    this.bitmap = shurikenBitmap;

    this.bitmap.x = this.x;
    this.bitmap.y = this.y;
    this.bitmap.regX = 32;
    this.bitmap.regX = 18;
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
      // this.hitPerson();
      this.hitEdge();
    }
    else{
      // debugger
      this.x += this.speed;
      this.drawShuriken();
      // this.hitPerson();
      this.hitEdge();
    }
    // this.stage.update();
  }

  hitEdge(){
    // debugger
    var rightSide = this.stage.canvas.width - (this.image.width * .1);
    if ((this.x > rightSide) ||(this.x < 0)){
      // debugger
      console.log("hitting edge");
      console.log(this.x);
      createjs.Ticker.removeEventListener("tick", this.handleTick);
      this.stage.removeChild(this.bitmap);
      this.hit = true;
      this.reset();
      // debugger
    }
  }

  hitPerson(){
    let p1 = this.stage.children[0];
    let p2 = this.stage.children[1];
    let curShuriken = this.bitmap;
    // console.log("Nothing");
    // console.log(p1.x + 192);
    // console.log(curShuriken.x);
    // console.log(p1.x);
    // debugger
    let hitp1 = ((curShuriken.x > p1.x) && (curShuriken.x < p1.x + 192)
                  );
    let hitp2 = ((curShuriken.x > p2.x) && (curShuriken.x < p2.x + 192) &&
                  (curShuriken.y > p2.y) && (curShuriken.y < p2.y + 96)
                  );
    console.log(hitp1);
    // console.log(hitp1);
    if (hitp1 || hitp2){
      console.log("Hit person");
      createjs.Ticker.removeEventListener("tick", this.handleTick);
      this.stage.removeChild(curShuriken);
    }
  }
}

module.exports = Attacks;
