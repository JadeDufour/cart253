// Predator-Prey Simulation
// by Jade Dufour
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;
//Our second predator, the manly man
let manlyMan;

// The three prey
let antelope;
let zebra;
let bee;

let preyEaten = 0;


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //WE MOVE THE TIGER WITH WASD
  //The tiger is yellow
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 80, 87, 83, 65, 68, 16);
  //We load our second predator, manlyMan
  //WE MOVE THE MAN WITH ARROWS
  //The manlyMan is pink
  manlyMan = new Predator(200, 250, 7, color(250, 120, 140), 80, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 76);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black

  //Might change the color --------------------------------------
  background(0);

  // Handle input for the tiger
  tiger.handleInput();
  manlyMan.handleInput();

  // Move all the "animals"
  tiger.move();
  //The Man is an animal too, no matter how manly it is
  manlyMan.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  //Handle the manly man over consuming the preys
  manlyMan.handleEating(antelope);
  manlyMan.handleEating(zebra);
  //Yes, the manliest of manly men also eat bees.
  manlyMan.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  //Display the man
  manlyMan.display();
  antelope.display();
  zebra.display();
  bee.display();

  displayEaten();

}


function  displayEaten() {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(30);
    text("Prey eaten: " + tiger.preyEaten, width* 2/3, height/4);
    text("Prey eaten: " + manlyMan.preyEaten, width /3, height / 4);
  }
