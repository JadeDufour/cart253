// Where the player need to lead the sheep
//
// A class that represents a barn
// It can't move around
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

//When the sheeps overlap the barn, they disappear
// "handleEating"
//
// Takes a Prey object as an argument and checks if the barn
// overlaps it. If so, prey get deleted
// If the prey dies, it gets reset.

handleWelcomingSheeps(prey){

    // Calculate distance from this barn to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    console.log(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
        prey.reset();
        this.preysWelcomed += 1;
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
