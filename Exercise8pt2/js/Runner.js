// The player

// A class that represents the runner (player)
// controlled by the arrow keys.

class Runner {


  constructor(x, y, speed, img, radius, jump, left, right) {
    // Position
    this.x = x;
    this.y = y;
    this.radius = radius; // Radius is defined in terms of health
    this.img = img;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Input properties
    this.jumpKey = jump;  // (up)
    this.leftKey = left;
    this.rightKey = right;
    // display propreties
    this.img = img;
    //the gravity
    this.gravity = 1;
    this.jumpingSpeed = 15;

    //Key Codes -----------------------------------

        //Up= 87
        //Left = 65
        //Right = 68

      //-------------------------------------------




    // Health properties
    // this.maxHealth = radius;
    // this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // this.healthLossPerMove = 0.1;
    // this.healthGainPerEat = 1;
    // Display properties
    //this.fillColor = fillColor;

  }


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
    if (keyIsDown(this.upKey){
        // The jumping power velocity
        this.vy = -jumpingSpeed;

  }





  move() {



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
