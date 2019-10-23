// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided

  //We add the moving keys and the sprinting key
  constructor(x, y, speed, img, radius, upKey, downKey, leftKey, rightKey, speedKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    //this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health

    this.preyEaten = 0;

    // Input properties, I changed them
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;

    //Sprinting propreties
    this.speedKey = speedKey;
    this.speedBoost = speed + 5 ;
    this.initialSpeed= speed; //The predator returns to normal speed if the sprint key is not pressed

    this.img = img;

//Key Codes -----------------------------------
    //Down = 83
    //Up= 87
    //Left = 65
    //Right = 68
    //Left sprint: left shift (18)
    //Right sprint: L  (76)
  //-------------------------------------------
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }

    if (keyIsDown (this.speedKey)){
      this.speed = this.speedBoost;
    }

    else {
      this.speed = this.initialSpeed;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        prey.reset();
        this.preyEaten +=1;
          }
        }
      }


  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    //I also made their starting size bigger
    this.radius = this.health*2;
    imageMode(CENTER);
    if (this.radius > 0){
      image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }
}
