// Predator-Prey Simulation
// by Jade Dufour
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let hogan;
//Our second predator, macho man
let machoMan;

// The three prey
let turtle;
let zebra;
let bee;
// Declare the score counter (prey eaten)
let preyEaten = 0;

//Declare the images for the avatars
// Our first competitor, Hulk Hogan
let imgHogan;
//Our second predator, Macho man
let imgMachoMan;

// The three prey
let imgTurtle;
let imgZebra;
let imgBee;

//The background ambiance
let backgroundMusic;

//let game state
let state = "StartScreen";

//Add a preload function
function preload() {
  //Load the images for the avatars
  imgHogan = loadImage("assets/images/hogan.png");
  imgMachoMan = loadImage("assets/images/manly.png");
  imgTurtle = loadImage("assets/images/squirtle.png");
  imgZebra = loadImage("assets/images/marty.png");
  imgBee = loadImage("assets/images/bee1.png");
  //Load the background music (village people)
  backgroundMusic = new Audio("assets/sounds/machoSong.mp3");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //WE MOVE HULK HOGAN WITH WASD
  //Hulk Hogan
  hogan = new Predator(100, 100, 5, imgHogan, 60, 87, 83, 65, 68, 16);
  //We load our second predator, machoMan
  //WE MOVE MACHO MAN WITH ARROWS
  machoMan = new Predator(200, 250, 7, imgMachoMan, 60, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 76);
  turtle = new Prey(100, 100, 10, imgTurtle, 70);
  zebra = new Prey(100, 100, 8, imgZebra, 70);
  bee = new Prey(100, 100, 20, imgBee, 70);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);
  //Organize the functions to make it clearer
  //Add a start screen
  if (state === "StartScreen") {
    displayIntro();
  } else if (state === "PlayScreen") {
    // Handle input for Hulk Hogan and Macho Man
    hogan.handleInput();
    machoMan.handleInput();

    // Move all the avatars
    hogan.move();
    machoMan.move();
    turtle.move();
    zebra.move();
    bee.move();

    // Handle Hulk Hogan eating any of the prey
    hogan.handleEating(turtle);
    hogan.handleEating(zebra);
    hogan.handleEating(bee);

    //Handle the manly man over consuming the preys
    machoMan.handleEating(turtle);
    machoMan.handleEating(zebra);
    //Yes, the manliest of manly men also eat bees.
    machoMan.handleEating(bee);

    // Display all the avatars
    hogan.display();
    //Display the man
    machoMan.display();
    turtle.display();
    zebra.display();
    bee.display();

    //Add a function so that the turtle avoids Hulk Hogan and Macho Man.
    turtle.avoid(hogan);
    turtle.avoid(machoMan);

    //We display the score
    displayEaten();
    //Add music playing in the background. Who doesn't love some good ol' Village people anthem
    backgroundMusic.play();
  }

  //Add a game over screen
  else if (state === "GameOverScreen") {
    displayGameOver();
    backgroundMusic.pause();
  }
}

function displayEaten() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(30);
  textFont("Impact")
  text("Hulk Hogan's prey count: " + hogan.preyEaten, width * 2 / 3, height / 4);
  text("Macho Man's prey count: " + machoMan.preyEaten, width / 3, height / 4);
}

function displayIntro() {
  background(0);
  push();
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont("Impact");
  fill(255);
  text("MACHO CHASE\nCLICK TO START \n\nMacho Man (arrows): Sprint with L\n Hulk Hogan (wasd): Sprint with LEFT SHIFT\n\n FIRST TO 30 POINTS WIN", width / 2, height / 2);
  pop();
}

function displayGameOver() {
  background(0);
  push();
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont("Impact");
  fill(255);
  text("MATCH OVER", width / 2, height / 2);
  pop();

}

function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
