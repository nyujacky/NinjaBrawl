class Attack {
  constructor(stage, startX, startY, direction){
    this.stage = stage;
    if (direction === "right"){
      this.x = startX + 122.5;
      this.y = startY + 60;
      this.speed = 25;
    }
    else{
      this.x = startX + 10;
      this.y = startY + 60;
      this.speed = -25;
    }
  }





}

module.exports = Attack;
