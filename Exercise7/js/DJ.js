class DJ {

  // constructor

  constructor(x, y, speed, fillColor, radius) {

      this.angle= 0;
      this.speed= 0;
      this.x= x;
      this.y= y;
      this.radius = radius;


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
  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
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


  // overlapping(prey) {
  //   // Calculate distance from this predator to the prey
  //   let d = dist(this.x, this.y, newPrey.x, newPrey.y);
  //   // Check if the distance is less than their two radii (an overlap)
  //   if (d < this.radius + newPrey.radius) {
  //
  //     this.radius +=10;
  //
  //     // Increase predator health and constrain it to its possible range
  //    //  this.health += this.healthGainPerEat;
  //    //  this.health = constrain(this.health, 0, this.maxHealth);
  //    //  // Decrease prey health by the same amount
  //    // Targets.health -= this.healthGainPerEat;
  //     // Check if the prey died and reset it if so
  //     // if (prey.health < 0) {
  //     //   prey.reset();
  //     //   this.preyEaten +=1;
  //     //     }
  //     //   }
  //       //Add a condition that ends the game
  //       // if (this.preyEaten >= 30 || this.radius <= 0) {
  //       //   state = "GameOverScreen";
  //       // }
  //     }

}
