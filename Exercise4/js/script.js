"use strict";

// Pong
// by Jade Dufour
//
// A "simple" implementation of Pong, the background changes color depending on who scored. The paddles also change color
// when a point is scored. Play with the arrows and hit SHIFT to spawn a secon ball to
//make the game crazier

//I'm sorry for your eyes


// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle


// Game colors (using hexadecimal)
//let bgColor = 0;
let fgColor = 255;

//Notes hit (when the ball hit a paddle, a note will play)
//Kind of like a points system
let notes = 0;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speedX: 5,
  speedY: 5,
  ballColor: 255
}

//Add a second ball with different values
let ball2 = {
  x: 0,
  y: 0,
  size: 25,
  vx: 0,
  vy: 0,
  speedX: 9,
  speedY: 9,
  ballColor: 255
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 8,
  upKey: 87,
  downKey: 83,
  //Add color to the paddles
  paddleColor: 255,
  points: 0,
  scored: false
}


// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 8,
  upKey: 38,
  downKey: 40,
  paddleColor: 255,
  points: 0,
  scored: false
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;
let wowC;
//The background music
let backgroundMusic;

//The background image for the instructions
let instructionsImg;

//A variable that states which state the player is in. Starts with the Start screen
// Tracks the game
let state = "StartScreen";

//Load the text fonts
let classicFont;

// preload()
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  wowC = new Audio("assets/sounds/wowc.mp3");
  backgroundMusic = new Audio("assets/sounds/inThe90s.mp3")
  instructionsImg = loadImage("assets/images/instructions.jpg");

  //Preload the text fonts
  classicFont = loadFont("assets/fonts/classic.otf");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(650, 450);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
  displayBackground();

  if (state === "StartScreen") {
    // Otherwise we display the message to start the game
    displayStartMessage();
  } else if (state === "PlayScreen") {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);

    updatePaddle(rightPaddle);
    updateBall();
    updateBall2();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    checkBall2WallCollision();
    checkBall2PaddleCollision(leftPaddle);
    checkBall2PaddleCollision(rightPaddle);

    updateScore();

    // We always display the paddles and ball so it looks like Pong!
    displayPaddle(leftPaddle);
    displayPaddle(rightPaddle);
    displayBall();

    displayBall2();

    backgroundMusic.play();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }

    if (ball2IsOutOfBounds()) {
      resetBall2();
    }
  } else if (state === "GameOverScreen") {
    displayGameOver();
    backgroundMusic.pause();
  }
}


function displayBackground() {
  //The background changes color depending on who scored
  //If right player scored = blue
  if (rightPaddle.scored) {
    background(0, 0, 200);
  }
  //If left player scored = red
  if (leftPaddle.scored) {
    background(230, 0, 0);
  }
  //If no one has scored yet, the background is blue
  else if (!leftPaddle.scored && !rightPaddle.scored) {
    background(0, 0, 139);
  }
}

function keyPressed() {
  if (keyCode === RETURN) {
    spawnSecondBall();
  }

}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

//Function to make the second ball
function spawnSecondBall() {

  displayBall2();

  updateBall2();

  checkBall2WallCollision();
  checkBall2PaddleCollision(leftPaddle);
  checkBall2PaddleCollision(rightPaddle);

  updateScore();

  if (ball2IsOutOfBounds) {
    resetBall2();
  }
}


// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

function updateBall2() {
  // Update the ball's position based on velocity
  ball2.x += ball2.vx;
  ball2.y += ball2.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides

  if (ball.x < 0 || ball.x > width) {

    if (ball.x < 0) {
      rightPaddle.points += 1;
      //We want the color of the paddle to change whenever the ball hit it
      rightPaddle.paddleColor = color(random(0, 255), random(0, 255), random(0, 255));
      //the ball respawns at a random speed
      ball.speedX = random(12, 6);
      //Who scored
      rightPaddle.scored = true;
      leftPaddle.scored = false;
    } else if (ball.x > width) {
      leftPaddle.points += 1;
      leftPaddle.paddleColor = color(random(0, 255), random(0, 255), random(0, 255));
      //the ball respawns at a random speed
      ball.speedX = random(-2, -6);
      //Who scored
      rightPaddle.scored = false;
      leftPaddle.scored = true;
    }
    //Show the score as a text in the console for debbuging purposes
    console.log("left: " + leftPaddle.points + "\nright: " + rightPaddle.points);
    return true;
  } else {
    return false;
  }
}


function ball2IsOutOfBounds() {
  // Check for ball going off the sides

  if (ball2.x < 0 || ball2.x > width) {

    if (ball2.x < 0) {
      rightPaddle.points += 1;
      //We want the color of the paddle to change whenever the ball hit it
      rightPaddle.paddleColor = color(random(0, 255), random(0, 255), random(0, 255));
      //the ball respawns at a random speed
      ball2.speedX = random(12, 6);
      //Who scored
      rightPaddle.scored = true;
      leftPaddle.scored = false;
    } else if (ball2.x > width) {
      leftPaddle.points += 1;
      leftPaddle.paddleColor = color(random(0, 255), random(0, 255), random(0, 255));
      //the ball respawns at a random speed
      ball2.speedX = random(-2, -6);
      //Who scored
      rightPaddle.scored = false;
      leftPaddle.scored = true;
    }
    //Show the score as a text in the console for debbuging purposes
    console.log("left: " + leftPaddle.points + "\nright: " + rightPaddle.points);
    return true;
  } else {
    return false;
  }
}


function updateScore() {

  if (rightPaddle.points >= 15 || leftPaddle.points >= 15) {
    state = "GameOverScreen";
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    wowC.play();
  }
}

function checkBall2WallCollision() {
  // Check for collisions with top or bottom...
  if (ball2.y < 0 || ball2.y > height) {
    // It hit so reverse velocity
    ball2.vy = -ball2.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    wowC.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      /*notes +=1;
      console.log(notes);*/
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      wowC.play();
    }
  }
}


function checkBall2PaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ball2Top = ball2.y - ball2.size / 2;
  let ball2Bottom = ball2.y + ball2.size / 2;
  let ball2Left = ball2.x - ball2.size / 2;
  let ball2Right = ball2.x + ball2.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ball2Bottom > paddleTop && ball2Top < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ball2Left < paddleRight && ball2Right > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball2.vx = -ball2.vx;
      /*notes +=1;
      console.log(notes);*/
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      wowC.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  fill(paddle.paddleColor);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  fill(random(0, 255), random(0.255), random(0, 255));
  rect(ball.x, ball.y, ball.size, ball.size);
}

function displayBall2() {
  // Draw the ball
  fill(random(0, 255), random(0.255), random(0, 255));
  rect(ball2.x, ball2.y, ball2.size, ball2.size);
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = ball.speedX;
  ball.vy = ball.speedY;
}

function resetBall2() {
  // Initialise the ball's position and velocity
  ball2.x = width / 2;
  ball2.y = height / 2;
  ball2.vx = ball2.speedX;
  ball2.vy = ball2.speedY;
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {

  push()
  imageMode(CENTER);
  image(instructionsImg, width / 2, height / 2, width, height);
  pop();

  push();
  textAlign(CENTER, CENTER);
  //Add instructions image later -------------------------------------------------
  textSize(32);
  textFont('classic');
  text("TRIPPY PONG\nCLICK TO START \n\n WHILE PLAYING,\n PRESS RETURN KEY FOR HARD MODE", width / 2, height / 2);
  pop();
}

function displayGameOver() {

  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(25);
  textFont("classic");
  text("GAME OVER" + "\n\n Score \n\n LEFT PLAYER: " + leftPaddle.points + " points" + "\nRIGHT PLAYER: " + rightPaddle.points + " points", width / 2, height / 2);
}


// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
