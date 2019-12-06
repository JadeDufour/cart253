// The platforms

// A class that represents the ground
// ''move'' with an array
class Platforms {

  constructor(x, y, speed, width, height, img) {
    // Position
    this.x = x;
    this.y = y;
    //size
    this.width = width;
    this.height = height;
    //display proprety
    this.img = img;
    //movement
    this.speed = speed;
    this.vx = 0;
    this.acceleration = 0.008;
    this.remove= false;
  }

//move()
move(){
  //Update the position based on the Velocity
    this.x -= this.vx;
  //they only move on the X axis, and accelerate as time goes by
    this.vx+= this.acceleration;

}

//If they go off the left side of the screen, they reappear on the right side
handleWrapping(){
  // Off the left
  if (this.x*2 < -600) {
    //everytime they go off the screen, they reappear with new and randomized properties
    this.x += (width+500);
    this.y= random(220,580);
    this.width= random(200,700);
  }
}

//display()
  display() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
    pop();
  }
}
