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
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;

    this.radius = 50;

}


handleWelcomingSheeps(){
  if ()

}

display() {
  push();
  noStroke();
  fill(this.fillColor);
  this.radius = this.health;
  ellipse(this.x, this.y, this.radius * 2);
  pop();
}
