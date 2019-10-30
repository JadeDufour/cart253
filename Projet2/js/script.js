// The shepherd (the very best)
// by Jade Dufour
//
// This is a variation of the predator-prey game.
// The shepherd (predator) has to bring all the sheeps in the barn before the time is up
// The sheeps (preys) are repelled by the predator (which is move with the mouseX and mouseY)
//The sheeps are AI

// Our "predator", the shepherd
let shepherd;
//The preys
let prey = [];
//The number of preys (sheeps)
let numberOfPreys = 15;

//the font
let pixelFont;

//The 2 barn
let onePointBarnImg;
let twoPointsBarnImg;
//time count
let timeRemaining = 60;

let state = "StartScreen";

// Loads the images before the program starts
function preload(){
//The shepherd
shepherdImg = loadImage("assets/images/farmer.png")
//The sheeps
sheepImg = loadImage("assets/images/sheep1.png")
//The one point barn
onePointBarnImg = loadImage("assets/images/1point.png")
//the two points barn
twoPointsBarnImg = loadImage("assets/images/2points.png")
//The background for the play state
grassBackground = loadImage("assets/images/grass.png")
//the background image for the intro
introBackground = loadImage("assets/images/farm.png")
//the font
pixelFont = loadFont("assets/fonts/slkscr.ttf");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(900,600);
  //The predator
  shepherd = new Predator(15, 30, 5, shepherdImg, 30);
//the two barns
  onePointBarn = new barnBox(width/2, 100, onePointBarnImg, 50);
  twoPointsBarn = new barnBox(width/2, height -100, twoPointsBarnImg, 50);

//We use a for loop for the preys
for (let i = 0; i < numberOfPreys; i++) {
    // Create a new Prey objects with the random values
    let sheep = new Prey (random(0,width), random(0, height),random(1, 4), sheepImg, 15);
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
  timeRemaining -= 1/60;
  text("time remaining : " + floor(timeRemaining), width/2,height/2);
  if (timeRemaining <= 0 ){
    displayGameOver();
  }



  for (let i = 0; i < prey.length; i++) {
      // And again we ask prey[i] to display itself because i gives us the current
      // element we are counting through in the loop
      prey[i].display();
      prey[i].move();
      prey[i].avoid(shepherd);

      //Check if the sheeps are in the barn and update the score
      onePointBarn.handleWelcomingSheeps(prey[i]);
      twoPointsBarn.handleWelcomingSheeps(prey[i]);
    }

    // Display all the images
    shepherd.display();
    onePointBarn.display();
    twoPointsBarn.display();



  //display the updated score
  displayScore();

  }

else if (state ==="GameOverScreen"){
  displayGameOver();
}


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
//the image
  push();
  imageMode(CENTER);
  image(introBackground, width / 2, height / 2, width, height);
  pop();

//the transparent rectangle
  push();
  strokeWeight(0.5);
  rectMode(CENTER);
  fill(211, 211, 211, 127);
  rect(0, height/2, width * 2, height / 5);
  pop();
//the text
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  textFont(pixelFont);
  text("A day in a shepherd's life", width / 2, height / 2);
  pop();
}

//A function that displays the game over screen
function displayGameOver(){
  push();
  imageMode(CENTER);
  image(introBackground, width / 2, height / 2, width, height);
  pop();
  text("Game Over!, \nYou managed to make " + (onePointBarn.preysWelcomed + twoPointsBarn.preysWelcomed) + "\n by leading your sheeps inside the barns", width/2,height/2);
}
function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
