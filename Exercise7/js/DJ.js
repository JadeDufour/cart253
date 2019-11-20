class DJ {

  // constructor

  constructor(x, y, speed, fillColor, radius) {

      this.angle= 0;
      this.speed= 0;
      this.x= x;
      this.y= y;


    // //the Position
    // this.x = x;
    // this.y = y;
    // // The Velocity and speed
    // this.vx = 0;
    // this.vy = 0;
    // this.speed = speed;
    // // Time properties for noise() function
    // this.tx = random(0, 1000); // To make x and y noise different
    // this.ty = random(0, 1000); // we use random starting values
    // // Health properties
    // this.maxHealth = radius;
    // this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // // Display properties
    // this.fillColor = fillColor;
    // this.radius = this.health;
    // this.size = this.radius;
  }

  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= 0.1;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 0.1;
    }

    if (keyIsDown(UP_ARROW)) {
      this.speed = 5;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      this.speed = 0;
    }
  }

  move() {
    // The magic lines for calculating velocity!
    let vx = this.speed * cos(this.angle);
    let vy = this.speed * sin(this.angle);

    this.x += vx;
    this.y += vy;
  }

  display() {
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    noStroke();
    fill(255,0,0);
    ellipse(0,0,50,50);
    stroke(0);
    line(0,0,50,0);
    pop();
  }



}
