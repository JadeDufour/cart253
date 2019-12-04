// The platforms

// A class that represents the ground
// ''move'' with an array
class Platforms {


  constructor(x, y, speed, width, height, img) {
    // Position
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.speed = speed;
    this.vx = 0;
    this.acceleration = 0.008;
    this.remove= false;

  }


move(){
  //Update the position based on the Velocity
    this.x -= this.vx;
  //they only move on the X axis, and accelerate as time goes by
    this.vx+= this.acceleration;
  //
  // this.handleWrapping();
}


handleWrapping(){
  // Off the left
  if (this.x*2 < -600) {
    this.x += (width+500);
    this.y= random(200,650);
    this.width= random(200,700);
  }
}




  display() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
    pop();
  }

}
