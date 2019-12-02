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
    this.jumpingSpeed = 115;

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

    console.log(this.y);
    console.log(this.x);

  }

// move()

move() {
  // Update the position of the object
  this.x += this.vx;
  this.y += this.vy;
}

handleWrapping(){
  if (this.y < 0) {
   //
   // If the player falls off the screen, its game over
   state = "GameOverScreen";
}
}

// gravity()
//
gravityEffect() {
  // Gravity pulls the player to the ground
  this.vy += this.gravity;
}

stayOnScreen(){
  // let d = dist(this.x, this.y, platform.x, platform.y);

    // dist()
    //
    // To keep track of the platform and the avatar are in contact
    // if (d < this.width / 2 + platform.width / 2) {
    //   console.log("standing");
    //   // this.vy
    //   //
    //   // To make sure that the climber doesn't fall
    //   this.grounded = true;
    //   this.pull = 0;
    //   this.vy = 0;

    // }

    if(this.y = 400){
      this.gravity = 0;
      this.vy = 0;
    }

}


  display() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}
