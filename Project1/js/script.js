"use strict";

/******************************************************

Game - The hero we need, and the one we deserve.
Modified by Jade Dufour

This might be a simple game, but it is nowhere near a simple task. Today, MemeMaster64,
you will need to save memes from a dark and mysterious dungeon. Who captured these innocent memes
you might say? We will never know, but we shall fear such mad man. Watch yourself though, for this dungeon seems
to drain your stamina and your will to live. Press Shift to hit maximum overdrive and move with the
arrows, like the Pro League player that you are. For every meme you catch, your health will fill back up.
You need memes to stay alive, MemeMaster, just like in real life.

________________________________________________________________________________________________________
Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/
//Load text fonts
let alex;
let amatic;
let pricedow;
// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 35;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 4;

//Add Player size
let playerSizeX = 80;
let playerSizeY = 75;

//Add a boosted speed (we will switch between the two when holding Shift)
let playerBoostedSpeed = 9;

// Player health
let playerHealth;
let playerMaxHealth = 265;

// Player fill color
let playerFill = 50;

//Changing the circle for the playerimage (naruto)
let playerImage;

// Prey position, size, velocity
let memeX;
let memeY;
let memeRadius = 35;
let memeVX;
let memeVY;
let memeTX;
let memeTY;
let memeMaxSpeed = 6;
// Prey health
let memeHealth;
let memeMaxHealth = 200;
// Prey fill color
let memeFill = 255;

//Prey size (for the images)
let memeSizeX = 60;
let memeSizeY = 60;

//Declare that the preys are now old memes (and will change depending on the game stage)
let meme1;
let meme2
let meme3;
let meme4;
let meme5;
let meme6;
let meme7;
let meme8;
let meme9;
let meme10;
let meme11;
let meme12;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 55;
// Number of prey eaten during the game (the "score")
let memeEaten = 0;

//Add a counter so the player know at which stage of theur life they are
let stage = 0;

//Add a background to the game
let backgroundImg;
//Add a background image to the instructions
let instructionsBackg;
//Add a background for losing screen
let failBackg;
//Add background for winning screen
let winBackg;

//Declare the instructions. Tell them to the player before the game starts
let showInstructions = true;

// Track whether the game is over
let state = "StartScreen";
//The background music for the game
let backgroundMusic;
//the sound when game over is true
let overSound;
//The sound for the winning screen
let cheeringKids;

function preload() {
  //Load the player image
  playerImage = loadImage('assets/images/naruto1.gif');

  //Load the memes (preys)
  meme1 = loadImage("assets/images/pepe1.png");
  meme2 = loadImage("assets/images/doge2.png");
  meme3 = loadImage("assets/images/gabe3.png");
  meme4 = loadImage("assets/images/harambe4.png");
  meme5 = loadImage("assets/images/shia5.png");
  meme6 = loadImage("assets/images/kid6.png");
  meme7 = loadImage("assets/images/patrick7.png");
  meme8 = loadImage("assets/images/ron8.png");
  meme9 = loadImage("assets/images/safe9.png");
  meme10 = loadImage("assets/images/brian10.png");
  meme11 = loadImage("assets/images/ugandan11.png");
  meme12 = loadImage("assets/images/man12.png");

  //Load the background image
  backgroundImg = loadImage("assets/images/ground1.jpg");
  //Load the instructions background image
  instructionsBackg = loadImage("assets/images/fond.jpg");
  //Load the background for the loosing screed
  winBackg = loadImage("assets/images/dankWIN.jpg");
  //Load failling screen background
  failBackg = loadImage("assets/images/fail.jpg");
  //Load the background music
  backgroundMusic = new Audio("assets/sounds/gameMusic.mp3");
  //Load the game over sound
  overSound = new Audio("assets/sounds/busted.mp3")
  //Load the winning game sound
  cheeringKids = new Audio("assets/sounds/kidsYay.mp3")

  //Load the two text fonts
  alex = loadFont("assets/fonts/AlexBrush-Regular.ttf");
  amatic = loadFont("assets/fonts/Amatic-Bold.ttf");
  pricedow = loadFont("assets/fonts/pricedow.ttf");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(700, 600);
  noSmooth();
  noStroke();
  // We're using simple functions to separate code out
  setupMeme();
  setupPlayer();
}

// Initialises meme's position, velocity, and health
function setupMeme() {
  memeX = width / 5;
  memeY = height / 2;
  memeVX = -memeMaxSpeed;
  memeVY = memeMaxSpeed;
  memeHealth = memeMaxHealth;
  //Add time parameter to determine how similar in time the x and y values of the meme will be (noise)
  memeTX = noise(0, 1);
  memeTY = noise(0, 1);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of meme and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {

  if (state === "StartScreen") {
    //Added an instructions function
    showInstructionsFirst();
  } else if (state === "Play") {
    handleInput();

    movePlayer();
    moveMeme();

    updateHealth();
    checkEating();
    displayUI();
    showPlayerMessages();
    drawMeme();
    drawPlayer();
    lifeBar();
  } else if (state === "GameOver") {
    showGameOver();
  } else if (state === "Win") {
    displayWinning();
  }
}

function displayWinning() {
  imageMode(CENTER);
  image(winBackg, width / 2, height / 2, width, height);
  textFont('Amatic-Bold');
  textAlign(CENTER, CENTER);
  textSize(55);
  fill(255);
  text("CONGRATS, MEMEMASTER64.\n You really are the MVP\n after all", width / 2, height / 2);
}

function displayUI() {
  imageMode(CENTER);
  image(backgroundImg, width / 2, height / 2, width, height);
  textFont('Amatic-Bold');
  textAlign(CENTER, CENTER);
  textSize(55);
  fill(255);
  text("Memes saved: " + stage, width / 2, height - 50);
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  } else {
    playerVY = 0;
  }

  //Add the possibility for the player to sprint
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = playerBoostedSpeed;
    //The player looses health when they speed up
    playerHealth -= 1.4;
  } else {
    playerMaxSpeed = 4; //Reset the player speed if the shift key is not pressed
  }
}
// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    stage = 0;
    state = "GameOver";
    overSound.play();
    backgroundMusic.pause();
  }
}

function showPlayerMessages(){
  if (playerHealth < 150) {
    showPlayerMessage();
  }

  if (playerHealth < 80) {
    showPlayerMessage2();
  }
}

//A function that draws the text when player's health is halfway down
function showPlayerMessage() {
  console.log("m1");
  textSize(35);
  textFont('Amatic-Bold');
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the first text to display (the first message the avatar says)
  let playerMessage = "Mr. Stark, I don't feel so good...";

  // Display it in the centre of the screen, at 1/8 the height
  text(playerMessage, width / 2, height / 7);
}

//A second function that draws the text when the is 1/3 of player's health left
function showPlayerMessage2() {
  console.log("m2");
  textSize(25);
  textFont('Amatic-Bold');
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the second text to display (the last message the avatar says before it vanishes)
  let playerMessage2 = "Mr. Stark, I don't wanna go..";

  // Display it in the centre of the screen, at 1/6 the height
  text(playerMessage2, width / 2, height / 5);
}
// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, memeX, memeY);
  // Check if it's an overlap
  if (d < playerRadius + memeRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the meme's health
    memeHealth = memeHealth - memeHealth;
    // Constrain to the possible range
    memeHealth = constrain(memeHealth, 0, memeMaxHealth);

    // Check if the meme died (health 0) :(
    if (memeHealth === 0) {

      drawMeme();
      // Move the "new" meme to a random position
      memeX = random(0, width);
      memeY = random(0, height);
      // Give it full health
      memeHealth = memeMaxHealth;

      // Track how many meme were eaten
      memeEaten = memeEaten + 1;
      //Update score
      stage += 1;
      if (stage >= 12) {
        background(255, 0, 0);
        state = "Win";
        backgroundMusic.pause();
        cheeringKids.play();
      }
    }
  }
}

// moveMeme()
//
// Moves the meme based on random velocity changes
function moveMeme() {
  // Change the meme's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the meme
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the meme

    //The meme now moves according to the Perlin noise
    memeVX = map(noise(memeTX), 0, 1, -memeMaxSpeed, memeMaxSpeed);
    memeVY = map(noise(memeTY), 0, 1, -memeMaxSpeed, memeMaxSpeed);
    memeX += memeVX;
    memeY += memeVY;
  }

  // Update meme position based on velocity
  memeX = memeX + memeVX;
  memeY = memeY + memeVY;

  // Screen wrapping
  if (memeX < 0) {
    memeX = memeX + width;
  } else if (memeX > width) {
    memeX = memeX - width;
  }

  if (memeY < 0) {
    memeY = memeY + height;
  } else if (memeY > height) {
    memeY = memeY - height;
  }
  memeTX += 0.02;
  memeTY += 0.01;
}

// Draw the meme with alpha based on health
function drawMeme() {

  if (stage <= 0) {
    imageMode(CENTER);
    image(meme1, memeX, memeY, memeSizeX, memeSizeY);

  } else if (stage <= 1) {
    imageMode(CENTER);
    image(meme2, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 2) {
    imageMode(CENTER);
    image(meme3, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 3) {
    imageMode(CENTER);
    image(meme4, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 4) {
    imageMode(CENTER);
    image(meme5, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 5) {
    imageMode(CENTER);
    image(meme6, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 6) {
    imageMode(CENTER);
    image(meme7, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 7) {
    imageMode(CENTER);
    image(meme8, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 8) {
    imageMode(CENTER);
    image(meme9, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 9) {
    imageMode(CENTER);
    image(meme10, memeX, memeY, memeSizeX, memeSizeY);
  } else if (stage <= 10) {
    imageMode(CENTER);
    image(meme11, memeX, memeY, memeSizeX, memeSizeY);
  } else {
    imageMode(CENTER);
    image(meme12, memeX, memeY, memeSizeX, memeSizeY);
  }
}

function drawPlayer() {
  //The tint is white so we dont lose any of the image's original color
  //The playerImage fades as its health decreases
  push();
  tint(255, 255, 255, playerHealth);
  imageMode(CENTER);
  image(playerImage, playerX, playerY, playerSizeX, playerSizeY);
  pop();
}

function lifeBar() {
  fill(255);
  textSize(35);
  text("Will to survive : ", width / 2 - 120, 40);
  fill(0, playerHealth, 0);
  rect(width / 2, 30, playerHealth, 25);
}

// showGameOver()
// Display text about the game being over!
function showGameOver() {
  imageMode(CENTER);
  image(failBackg, width / 2, height / 2, width, height);
  rectMode(CENTER);
  fill(211, 211, 211,127);
  rect(0, 150, width * 2, height / 5);
  // Set up the font
  textSize(60);
  textFont('pricedow');
  textAlign(CENTER, CENTER);
  // Set up the text to display
  let gameOverText = "WASTED\n\n"; //
  gameOverText = gameOverText + "You saved " + memeEaten + " meme(s)\n";
  gameOverText = gameOverText + "but couldn't get out\n the dungeon on time."
  fill(255, 0, 0);
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

function showInstructionsFirst() {
  imageMode(CENTER);
  image(instructionsBackg, width / 2, height / 2, width, height);
  //We don't want the game running in the background of the instructions
}

function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instructions if the player clicked
    state = "Play";
    backgroundMusic.play();
  }
}
