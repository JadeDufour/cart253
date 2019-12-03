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




    // this.radius = radius;
    // this.img = img;
    // // Velocity & speed
    // this.vx = 0;
    // this.vy = 0;
    // this.speed = speed;


  }

move(){
  //Update the position based on the Velocity
    this.x += this.vx;
  //they only move on the X axis, and accelerate as time goes by
    this.vx-= this.acceleration;
  //
  // this.handleWrapping();
}


// handleWrapping(){
//   // Off the left or right
//   if (this.x > 0) {
//     this.x -= width;
//   } else if (this.x < width) {
//     this.x += width;
//   }
//
//
// }




  display() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
    pop();
  }

}
