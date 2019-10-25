// The shepherd (the very best)
// by Jade Dufour
//
// This is a variation of the predator-prey game.
// The shepherd (predator) has to bring all the sheeps in the barn before the time is up
// The sheeps (preys) are repelled by the predator (which is move with the mouseX and mouseY)
//The sheeps are AI

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

//The 2 barn
let onePointBarn;
let twoPointsBarn;

let state = "StartScreen";

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);

  //onePointBarn = new barnBox();
  //twoPointsBarn = new barnBox();
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

if (state ==="StartScreen"){
  displayIntroduction();
}
else if (state === "PlayScreen"){
  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
  }

/*else if (state ==="GameOverScreen"){
  displayGameOver();
}*/


}

function displayIntroduction(){
  background(0);
  push();
  textAlign(CENTER, CENTER);
  //Add instructions image later -------------------------------------------------
  textSize(32);
  fill(255);
  textFont('Arial');
  text("Apex chaser", width / 2, height / 2);
  pop();
}

function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
