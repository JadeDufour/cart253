//
// The squares in the intro screen
//


class Squares {


  constructor(x, y, width, height, color, speed) {
    //Position
    this.x = x;
    this.y = y;
    //size & color
    this.width = width;
    this.height = height;
    this.color = color;
    //velocity & speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 10); // To make x and y noise different
    this.ty = random(0, 10); // we use random starting values

  }
  //The squares avoid the mouse
  avoid() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 50) {
      let distX = this.x - mouseX;
      let distY = this.y - mouseY
      this.vx = map(noise(this.tx), 0, 1, distX / 10, distX / 10);
      this.vy = map(noise(this.ty), 0, 1, distY / 10, distY / 10);
      // Update position
      this.x += this.vx;
      this.y += this.vy;

    } else {
      this.move();
    }
  }
  //And they move accordingly
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
  }

  //display()
  display() {
    push();
    rectMode(CENTER);
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    pop();

  }
}
