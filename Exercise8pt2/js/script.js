// --------------------
//Infinite runner - The cute escape
//Someone moved the big squares that were keeping you safe from the outside world and now they're flying everywhere...
//Run as fast as you can while avoiding the squares and jump on the platforms to get some rest and win points.
//Good luck!
//There is no Winning screen in this game, all you gotta do is try your best and run as fast as you can!
// by Jade Dufour
//
//----------------------

//We start at the pre intro screen
let state = "IntroScreen";


//========== (Player inputs) =========//
let player;
let uiFont;
let playerScoreOverTime = 0;

//========== (Animation for the player and the running water) =========//

//Inspiration : Pippin's code https://github.com/pippinbarr/cart253-2019/blob/master/examples/arrays-of-images.md -----------------
let animationFrames = [];
let numberAnimationFrames = 6;
let currentAnimationFrame = 0;
let animationFrameRate = 12; // How many frames per second for this animation (run)

let waterAnimationFrame = [];
let numberWaterAnimationFrame = 17;
let waterCurrentFrame = 0;
let waterAnimationFrameRate = 34;
let programFrameRate = 60; //-----------------------

//========== (The platforms fot the player to rest and heal) ===========//
let restingPlat = [];
let numRestingPlat = 3;


//========== (The scrolling background propreties) ===========//
let backgroundX = 0;
let backgroundSpeed = 0.09;


//========== (The flying squares ingame) ===========//
let flySquareArray = [];
let numFlySquare = 1;

//========== (The flying squares in the intro) ===========//
let introSquares = [];
let numSquares = 600;
//when the player hits a flying square
let hitMark;

//========== (Sounds) ===========//
//the outro song
let gameOverSong;
//the intro song
let introSong;
//the ingame music
let inGameSong;

//small icons I found in a game asset on itch.io
//https://bayat.itch.io/platform-game-assets  All assests created by Bayat Games ~~~~~~~~~~~~~~~~~~~~~~~~~~~
let lifeIcon;
let timeIcon;
let pointsIcon;


function preload() {
  //the player
  imgPlayer = loadImage("assets/images/player.png");
  //the UI font, called SuperMario256
  uiFont = loadFont("assets/fonts/SuperMario256.ttf");
  //the in-game background (found on itch.io, in the free platformer art asset)
  ingameBackground = loadImage("assets/images/Background.png");
  //the platform images
  tilesImg = loadImage("assets/images/Goodplatforms.png");

  //the intro image
  //
  //***Both the intro and game over background images were made in photoshop with the same game asset art***
  introImg = loadImage("assets/images/introBackgroundFinal.png");
  //the gameover image
  gameOverImg = loadImage("assets/images/gameover.png");
  //the small icons
  lifeIcon = loadImage("assets/images/blueIcon.png");
  timeIcon = loadImage("assets/images/timeIcon.png");
  pointsIcon = loadImage("assets/images/pointsIcon.png");
  //the hit square sound
  hitMark = new Audio("assets/sounds/hit.wav");
  //the song used in the outro
  gameOverSong = new Audio("assets/sounds/introOutro.mp3");
  //the introSong
  introSong = new Audio("assets/sounds/intro.wav");
  //the game Song
  inGameSong = new Audio("assets/sounds/game.mp3");
  //when the player overlaps the water
  waterSound = new Audio("assets/sounds/drop2.wav");

  //
  for (let i = 1; i <= numberAnimationFrames; i++) {
    let filePath = "assets/images/animation/" + i + ".png";
    animationFrames.push(loadImage(filePath));
  }

  for (let i = 1; i <= numberWaterAnimationFrame; i++) {
    let filePath = "assets/images/animation/water/" + i + ".png";
    waterAnimationFrame.push(loadImage(filePath));
  }

  //========== (Images for player's movements) ===========//
  jumpUp = loadImage("assets/images/animation/jump/up.png");
  jumpDown = loadImage("assets/images/animation/jump/down.png");
  idle = loadImage("assets/images/animation/idle/1.png");

}


function setup() {
  createCanvas(1200, 700);
  //the runner (player)
  player = new Runner(150, 255, 6, 7, tilesImg, 45, 32, 65, 68, 450);
  //the water at the bottom of the canvas
  water = new waterAnimation(1700, 780, 256, 256);
  //the array for the flying squares seen in the intro
  for (i = 0; i < numFlySquare; i++) {
    let testX = 100;
    let testY = 500;

    let flySquare = new Platforms(testX, testY, 9, 500, 130, tilesImg);
    flySquareArray.push(flySquare);
  }
  //the array for the platforms used to rest and heal
  for (i = 0; i < numRestingPlat; i++) {
    r = new platf(random(0, width), random(0, 620), 50, 50);
    restingPlat.push(r);
  }
  //the array for the squares flying around in the game
  for (i = 0; i < numSquares; i++) {
    squares = new Squares(random(0, width), random(0, height), random(50, 80), random(50, 80), color(random(255), random(255), random(255)), random(2, 3));
    introSquares.push(squares);
  }
}


function draw() {
  //========== (Pre intro) ===========//
  if (state === "IntroScreen") {
    movingBackground();
    push();
    fill(255);
    textFont('SuperMario256');
    noStroke();
    textSize(30);
    textAlign(CENTER);
    text("click to start ", width / 2, height / 2);
    pop();
  }

  //========== (Intro) ===========//
  else if (state === "StartScreen") {
    displayIntroduction();
    for (i = 0; i < introSquares.length; i++) {
      introSquares[i].display();
      introSquares[i].avoid();
      introSquares[i].move();
    }
    introSong.play();

    //========== (GamePlay) ===========//
  } else if (state === "PlayScreen") {
    movingBackground();
    introSong.pause();
    player.falling();
    player.handleInput();
    player.move();
    player.gravityEffect();
    player.display();
    introSong.pause();
    inGameSong.play();
    water.display();
    player.gravity = 1.5;
    drawSprites();
    updateTime();
    updatePoints();
    player.updateHealth();
    lifeBar();

    for (i = 0; i < flySquareArray.length; i++) {
      flySquareArray[i].display();
      flySquareArray[i].move();
      flySquareArray[i].handleWrapping();
      player.stayOnScreen(flySquareArray[i]);
    }

    for (i = 0; i < numRestingPlat; i++) {
      restingPlat[i].disp();
      restingPlat[i].collide(player);
    }
  }

  //========== (GameOver) ===========//
  else if (state === "GameOverScreen") {
    displayGameOver();
    inGameSong.pause();
    gameOverSong.play();
  }
}


//=====================================================================//

//**I wanted to try a different way of playing with arrays, I tried the method
//shown on Bmoren's github : https://bmoren.github.io/p5.collide2D/examples/objectCollision/index.html**
function platf(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color(random(255), random(255), random(255));
  this.hit = false;

  this.disp = function() {
    noStroke();
    fill(this.color);
    this.x -= 12; //move to the right!
    // Off the left or right
    if (this.x < (-900)) {
      this.x += 2800;
      this.y = random(80, 600);
      this.color = color(random(255), random(255), random(255));
      this.w = random(40, 60);
      this.h = random(30, 65);
    }

    rect(this.x, this.y, this.w, this.h);

  }

  this.collide = function(player) {
    this.hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.radius);
    if (this.hit) {
      player.health -= 3.5;
      hitMark.play();

    }
  }
}

//=======================================================================//

function movingBackground() {
  //The background is moving very slowly to the left
  background(48, 242, 242);
  image(ingameBackground, backgroundX, 0, width, height);
  image(ingameBackground, backgroundX + width, 0, width, height);
  if (backgroundX < (width)) {
    backgroundX = backgroundX - backgroundSpeed;
  } else {
    backgroundX -= width;
  }
}

function displayIntroduction() {
  push();
  imageMode(CENTER);
  image(introImg, width / 2, height / 2, width, height);
  pop();
}

function displayGameOver() {
  push();
  imageMode(CENTER);
  image(gameOverImg, width / 2, height / 2, width, height);
  pop();
  fill(240, 160, 20);
  textFont('SuperMario256');
  noStroke();
  textSize(40);
  textAlign(CENTER);
  text("You made " + player.points + " points" + "\n In " + playerScoreOverTime + " seconds" + "\n\n Good Job!", width / 2, height / 2);

}

function updateTime() {
  //based on how long the player has been running (got help from p5js with that one)
  if (frameCount % 60 === 0) {
    playerScoreOverTime++;
  }
  push();
  imageMode(CENTER);
  image(timeIcon, 100, 50, 40, 40);
  pop();
  fill(250, 160, 20);
  textFont('SuperMario256');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(playerScoreOverTime + " s ", 190, 60);
}


function updatePoints() {
  push();
  imageMode(CENTER);
  image(pointsIcon, 300, 50, 40, 40);
  pop();
  fill(250, 160, 20);
  textFont('SuperMario256');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(player.points + " points ", 440, 60);
}

function lifeBar() {
  push();
  imageMode(CENTER);
  image(lifeIcon, 600, 50, 40, 40);
  pop();
  fill(186, 85, 211);
  textSize(35);
  fill((player.health), 170, 40);
  rect(650, 38, player.health, 25);
}



function mousePressed() {
  if (state === "IntroScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "StartScreen";
  } else if (state === "StartScreen") {
    state = "PlayScreen"
  }
}
