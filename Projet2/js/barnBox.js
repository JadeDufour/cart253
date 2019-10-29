// Where the player need to lead the sheep
//
// A class that represents a barn
//It can't move around
// "Consumes" Prey objects

class barnBox {

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

//So that the shepherd cant go in the barn
checkBarnCollision(){


}
//When the sheeps overlap the barn, they disappear
handleWelcomingSheeps(){

    // Calculate distance from this barn to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Decrease prey health by the same amount
      prey.health = 0;
      // Check if the prey "died"
      if (prey.health < 0) {
        prey.reset();
        this.preysWelcomed += 1;
      }
  }
}

display() {
  push();
  noStroke();
  imageMode(CENTER);
  image(this.img, this.x, this.y,this.radius * 2, this.radius * 2);
  pop();
}
}
