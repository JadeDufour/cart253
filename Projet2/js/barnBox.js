// Where the player need to lead the sheep
//
// A class that represents a barn
//It can't move around
// "Consumes" Prey objects

class Barn {

  // constructor
  //
  // Sets the initial values for the Barn's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, img, radius) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.radius = 50;
    this.preysWelcomed = 0;
}


handleWelcomingSheeps(){

    // Calculate distance from this barn to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Decrease prey health by the same amount
      prey.health = 0;
      // Check if the prey "died"
      if (prey.health < 0) {
      this.preysWelcomed += 1;
      }
  }
}

display() {
  push();
  noStroke();
  fill(this.fillColor);
  this.radius = this.health;
  ellipse(this.x, this.y, this.radius * 2);
  pop();
}
