// The player

// A class that represents the runner (player)
// controlled by the arrow keys.

class Runner {

  constructor(x, y, speed, jumpSpeed, img, radius, jump, left, right, maxhealth) {
    // Position
    this.x = x;
    this.y = y;
    this.img = img;
    this.radius = radius;
    // Velocity & speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    //Health
    this.maxHealth = maxhealth;
    this.health = this.maxHealth;

    // Input properties
    this.jumpKey = jump; // (up)
    this.leftKey = left;
    this.rightKey = right;

    // display propreties
    this.img = img;
    //the gravity
    this.gravity = 2;
    this.jumpingSpeed = jumpSpeed;
    this.acceleration = 0.8;
    // this.grounded = false;
    this.jump = false;
    this.points = 0;
    this.touching = false;
    //Key Codes -----------------------------------

    //Up= 32 (space bar)
    //Left = 65
    //Right = 68

    //-------------------------------------------

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
      this.jump = true;
    }
    console.log("y position : " + this.y);
    console.log("x position : " + this.x);
  }

  //Every frame the player loses a certain amount of health
  updateHealth() {
    this.health -= 0.2;
    this.health = constrain(this.health, 0, this.maxHealth);
    //of they get to 0, its game over
    if (this.health === 0) {
      state = "GameOverScreen";
    }
  }


  // move()
  move() {
    // Update the position of the object
    this.x += this.vx += this.acceleration;
    this.y += this.vy;
  }

  //Check if the player has gone off the screen
  falling() {
    if (this.y >= 1200 || this.x < 0 || this.x > width || this.y < 0) {

      // If the player falls off the screen, its game over
      state = "GameOverScreen";
    }
    //And if they overlap the water, a water drop sfx plays
    if (this.y >= 700 && this.y <= 1000) {
      waterSound.play();
    }
  }

  // gravity()
  //
  gravityEffect() {
    // Gravity pulls the player to the ground
    this.vy += this.gravity;
  }

  //The player has to be able to stand on the platforms
  stayOnScreen(platforms) {

    let d = dist(this.x, this.y, platforms.x, platforms.y);
    //To keep track of the platform and the player
    if (d < this.radius + platforms.width / 2) {
      this.touching = true;
      //so the player stays on the platform
      if (this.jump = false) {
        this.gravity = 0;
      }

      this.vy = 0;
      this.speed + 3;
      this.health += 0.5;
      this.y = constrain(this.y, (platforms.y - 105), (this.y));
    }

    if (d > this.radius + platforms.width / 2) {
      this.touching = false;
    }
    //if they are on the platform, they get points
    else if (d < this.radius + platforms.y, platforms.x) {
      this.points += 1;
    }

  }
  //This (display) is probably the most chaotic thing i've ever done in javascript. But it works, kinda, and this is truly where my knowledge ends, so i'll embrace this mess of a script I created
  display() {

    if ((keyIsDown(this.leftKey)) || (keyIsDown(this.rightKey))) {
      noStroke();
      imageMode(CENTER);
      image(animationFrames[currentAnimationFrame], this.x, this.y, this.radius * 2, this.radius * 2);
      let programFramesPerAnimationFrame = floor(programFrameRate / animationFrameRate);
      if (frameCount % programFramesPerAnimationFrame === 0) {
        currentAnimationFrame++;
        if (currentAnimationFrame >= animationFrames.length) {
          currentAnimationFrame = 0;
        }
      }
    } else if (keyIsDown(this.jumpKey) && (player.y++)) {
      imageMode(CENTER);
      image(jumpUp, this.x, this.y, this.radius * 2, this.radius * 2);
    } else if (!(keyIsDown(this.jumpKey)) && (player.y--)) {
      imageMode(CENTER);
      image(jumpDown, this.x, this.y, this.radius * 2, this.radius * 2);
    } else if ((this.touching = true) && (this.vx++) && (this.vy = 0) && (this.jump = false)) {
      imageMode(CENTER);
      image(idle, this.x, this.y, this.radius * 2, this.radius * 2);
    }
  }
}
