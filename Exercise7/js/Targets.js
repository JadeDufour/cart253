class Targets {

  // constructor

  constructor(x, y, speed, fillColor, radius) {
    //the Position
    this.x = x;
    this.y = y;
    // The Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    // this.maxHealth = radius;
    // this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    // this.radius = this.health;
    this.radius = radius;
    //minimum size
    this.minRadius = 10;
    //maximum size
    this.maxRadius = 50;
    //change speed for size (how much will the size increase/decrease each frame)
    this.radiusSpeed = .5;

  }
//The circles shrink and grow
  update(){

    //if the size is either too small, or too big, flip the size speed sign (if it was positive (growing) - make it negative (shrink) - and vice versa)
      if(this.radius < this.minRadius || this.radius > this.maxRadius) {
        this.radiusSpeed *= -1;
      }
      //increment the size with the size speed (be it positive or negative)
      this.radius += this.radiusSpeed;
  }

  // move
  //
  // // Sets velocity based on the noise() function and the Prey's speed
  // // Moves based on the resulting velocity and handles wrapping
  // move() {
  //   // Set velocity via noise()
  //   this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
  //   this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
  //   // Update position
  //   this.x += this.vx;
  //   this.y += this.vy;
  //   // Update time properties
  //   this.tx += 0.01;
  //   this.ty += 0.01;
  //   // // Handle wrapping
  //   // this.handleWrapping();
  // }



  // display
  //
  // Draw the musical circles as an ellipse on the canvas

  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
  // push();
  // noStroke();
  // imageMode(CENTER);
  // image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
  // pop();

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  // reset() {
  //   // Random position
  //   this.x = random(0, width);
  //   this.y = random(0, height);
  //   // Default health
  //   this.health = this.maxHealth;
  //   // Default radius
  //   this.radius = this.health;
  // }
}
