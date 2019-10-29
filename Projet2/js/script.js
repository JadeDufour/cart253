// The shepherd (the very best)
// by Jade Dufour
//
// This is a variation of the predator-prey game.
// The shepherd (predator) has to bring all the sheeps in the barn before the time is up
// The sheeps (preys) are repelled by the predator (which is move with the mouseX and mouseY)
//The sheeps are AI

// Our "predator", the shepherd
let shepherdImg;
//The preys
let sheepImg;
//The number of preys (sheeps)
let numberOfPreys = 15;

// The prey array to contain all the Prey objects
let prey = [];

//The 2 barn
let onePointBarnImg;
let twoPointsBarnImg;

let state = "StartScreen";

// Loads the images before the program starts
function preload(){
//The shepherd
shepherdImg = loadImage("assets/images/farmer.png")
//The sheeps
sheepImg = loadImage("assets/images/sheep1.png")
//The one point barn
onePointBarnImg = loadImage("assets/images/barn1pt.png")
//the two points barn
twoPointsBarnImg = loadImage("assets/images/barn.png")
//The background for the play state
grassBackground = loadImage("assets/images/grass.png")

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //The predator
  shepherd = new Predator(15, 30, 5, shepherdImg, 30);


  onePointBarn = new barnBox(width/2, 0, onePointBarnImg, 50);
  twoPointsBarn = new barnBox(width/2, height, twoPointsBarnImg, 50);


//We use a for loop for the preys
for (let i = 0; i < numberOfPreys; i++) {
    // Generate random values for the arguments of the Prey constructor
    let preyX = random(0, width);
    let preyY = random(0, height);
    let preySpeed = random(2, 12);
    let preyImg = image(sheepImg, preyX, preyY);
    let preyRadius = random(3, 50);
    // Create a new Prey objects with the random values
    let sheep = new Prey(preyX, preyY,preySpeed, preyImg, preyRadius);
    // Add the new Prey object to the END of our array using push()
     prey.push(sheep);
  }
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
//A function to display the background
  displayBackground();
  // Handle input for the tiger
  //tiger.handleInput();

  /*// Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();*/

  for (let i = 0; i < prey.length; i++) {
      // And again we ask prey[i] to display itself because i gives us the current
      // element we are counting through in the loop
      //prey[i].display();
      prey[i].move();
      prey[i].avoid(shepherd);

      //Check if the sheeps are in the barn and update the score
      onePointBarn.handleWelcomingSheeps(prey[i]);
      twoPointsBarn.handleWelcomingSheeps(prey[i]);
    }

  // Display all the "animals"
  shepherd.display();
  /*antelope.display();
  zebra.display();
  bee.display();*/

  //the avoid method()
//whiteSheep.avoid(shepherd);




  //display the updated score
  displayScore();

  }

/*else if (state ==="GameOverScreen"){
  displayGameOver();
}*/


}

function displayBackground(){
  push()
  imageMode(CENTER);
  image(grassBackground, width / 2, height / 2, width, height);
  pop();

}


  //Displays the score depending on which barn welcomed the preys (sheeps)
function displayScore(){
  textAlign(CENTER);
  fill(255);
  textSize(30);
  textFont("Georgia");
  text("Points: " + (onePointBarn.preysWelcomed + twoPointsBarn.preysWelcomed), width/2, height / 8);
}

//Displays the introductin
function displayIntroduction(){
  background(0);
  push();
  textAlign(CENTER, CENTER);
  //Add instructions image later -------------------------------------------------
  textSize(32);
  fill(255);
  textFont('Arial');
  text("OOP chaser", width / 2, height / 2);
  pop();
}

function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
