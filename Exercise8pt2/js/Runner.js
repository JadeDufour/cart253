// The player

// A class that represents the runner (player)
// controlled by the arrow keys.

class Runner {


  constructor(x, y, speed, img, radius,  jump, left, right) {
    // Position
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.img = img;
    // Velocity & speed
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

        //Up= 32 (space bar)
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
    // Horizontal movements
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    // Jumping

    if (keyIsDown(this.jumpKey)) {
      this.vy = -this.jumpingSpeed;
    }

    console.log(this.y)

  }

// move()

move() {
  // Update the position of the object
  this.x += this.vx;
  this.y += this.vy;
}

handleWrapping(){
  if (this.y < 0) {
   // nextLevel()
   //
   // Once the climber goes up, the state moves to the next level
   state = "GameOverScreen";
}
}

// gravity()
//
// When the climber is up in the air, it has to come down
gravityEffect() {
  // Gravity pulls the player to the ground
  this.vy += this.gravity;
}


  display() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}
