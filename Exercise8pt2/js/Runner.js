// The player

// A class that represents the runner (player)
// controlled by the arrow keys.

class Runner {


  constructor(x, y, speed, jumpSpeed, img, radius,  jump, left, right, maxhealth) {
    // Position
    this.x = x;
    this.y = y;
    this.img = img;
    this.radius= radius;
    // Velocity & speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.maxHealth = maxhealth;
    this.health= this.maxHealth;

    // Input properties
    this.jumpKey = jump;  // (up)
    this.leftKey = left;
    this.rightKey = right;

    // display propreties
    this.img = img;
    //the gravity
    this.gravity = 2;
    this.jumpingSpeed =jumpSpeed;
    this.acceleration = 0.8;
    // this.grounded = false;
    this.jump=false;
    this.points= 0;
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


updateHealth(){
  this.health -= 0.2;
  this.health = constrain(this.health, 0, this.maxHealth);

  if (this.health ===0){
    state = "GameOverScreen";
  }
}


// move()

move() {
  // Update the position of the object
  this.x += this.vx += this.acceleration;
  this.y += this.vy;

}

falling(){
  if (this.y > 900 || this.x <0 || this.x>width) {
   //
   // If the player falls off the screen, its game over
   state = "GameOverScreen";
}
}

// gravity()
//
gravityEffect(platforms) {
  // Gravity pulls the player to the ground
  this.vy += this.gravity;

}

stayOnScreen(platforms){

  let d = dist(this.x, this.y, platforms.x, platforms.y);


    //To keep track of the platform and the avatar are in contact
    if (d < this.radius/4 + platforms.width/2) {

      //
      // To make sure that the climber doesn't fall

      this.gravity = 0;
      this.vy = 0;
      this.jump=true;
      this.speed +3;
      this.health += 0.5;

      this.y = constrain(this.y, (platforms.y-25),(this.y));

    }

      else if (d < this.radius + platforms.y, platforms.x){
        this.points +=1;
      }

    // else{
    //   this.gravity =2;
    //   this.jump=true;
    // }
}



  display() {
    push();
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}