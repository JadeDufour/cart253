class Animals {
  constructor(x, y, speed, img, radius) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.radius = radius;
    this.speed = speed;
  }

  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
    console.log("mistake in move?")
  }

  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
    console.log("mistake in handle wrapping?")
  }


  display() {
    console.log("mistake in display?");
  }
}
