// Predator
// The shepherd

// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  //Not really a predator, more like a sheep keeper

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, img, radius) {
    // Position
    this.x = x;
    this.y = y;
    this.radius = radius; // Radius is defined in terms of health
    this.img = img;
    // Velocity and speed
    // this.vx = 0;
    // this.vy = 0;
    // this.speed = speed;
    // Health properties
    // this.maxHealth = radius;
    // this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // this.healthLossPerMove = 0.1;
    // this.healthGainPerEat = 1;
    // Display properties
    //this.fillColor = fillColor;

  }

  move() {

    this.x = mouseX;
    this.y = mouseY;

  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.img, mouseX, mouseY, this.radius * 2, this.radius * 2);
    pop();
  }
}
