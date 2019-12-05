// --------------------
//Infinite runner - The cute escape
//Someone moved the big squares that were keeping you safe from the outside world and now they're flying everywhere...
//Run as fast as you can while avoiding the squares, good luck!
// by Jade Dufour
//
//----------------------

let state = "IntroScreen";
let player;
let uiFont;
let playerScoreOverTime =0;


let plat = [];
let numPlat = 3;

let backgroundX = 0;
let backgroundSpeed = 0.09;

let testArray=[];
let numTest = 1;

let introSquares=[];
let numSquares = 600;
//when the player hits a flying square
let hitMark;
//the outro song
let gameOverSong;
//the intro song
let introSong;


function preload(){
  //the player
  imgPlayer = loadImage("assets/images/player.png");
  //the UI font, called SuperMario256
  uiFont = loadFont("assets/fonts/SuperMario256.ttf");
  //the in-game background (found on itch.io, in a free platformer art asset)
  ingameBackground = loadImage("assets/images/Background.png");
  //the platform images
  tilesImg = loadImage("assets/images/platforms.png");
  //the intro image
  //
  //Both the intro and game over background images were made in photoshop with game asset art I found on itch.io
  introImg = loadImage("assets/images/introRealbackground.png");
  //the gameover image
  gameOverImg= loadImage("assets/images/gameover.png");
  //the hit square sound
  hitMark = new Audio("assets/sounds/hit.wav");
  //the song used in the outro
  gameOverSong =new Audio("assets/sounds/introOutro.mp3");
  //the introSong
  introSong = new Audio("assets/sounds/intro.wav");
}


function setup() {
  createCanvas(1200, 700);
  //the runner (player)
  player = new Runner(100,475,6,7, imgPlayer, 45, 32,65,68,450);

  for(i=0; i< numTest; i++){
    let testX= 100;
    let testY= 500;

    let test = new Platforms(testX, testY,9, 500,200, tilesImg);
    testArray.push(test);
  }

  for(i=0; i< numPlat; i++){
    r = new platf(random(0,width), random(0,620), 50,50);
    plat.push(r);
  }

  for(i=0; i< numSquares; i++){
    squares = new Squares(random(0,width), random(0,height),random(50,80), random(50,80), color(random(255),random(255),random(255)), random(2,3));
    introSquares.push(squares);
  }

}




function draw() {
//The background in moving very slowly to the left
    background(50,150,200);
     image(ingameBackground, backgroundX, 0, width, height);
     image(ingameBackground,backgroundX + width, 0, width, height);
     if (backgroundX < (width)) {
       backgroundX = backgroundX - backgroundSpeed;
     } else {
       backgroundX -= width;
     }

     if (state === "IntroScreen"){

       push();
       fill(255);
       textFont('SuperMario256');
       noStroke();
       textSize(30);
       textAlign(CENTER);
       text("click to start " , width/2, height/2);
       pop();
        introSong.play();

     }
    else if (state === "StartScreen") {
      displayIntroduction();

      for(i=0; i< introSquares.length; i++){
      introSquares[i].display();
      introSquares[i].avoid();
      introSquares[i].move();


      }
    } else if (state === "PlayScreen") {
      introSong.pause();
      player.falling();
      player.handleInput();
      player.move();
      player.gravityEffect();
      player.display();
      // player.stayOnScreen();

      player.gravity = 1.5;
      // player.grounded = false;


      for(i=0; i< testArray.length; i++){
        testArray[i].display();
        testArray[i].move();
        testArray[i].handleWrapping();
        // plat[i].collide(player);
        player.stayOnScreen(testArray[i]);


      }


      for(i=0; i<numPlat; i++){
        plat[i].disp();
        plat[i].collide(player);

      }


      drawSprites();
      updateTime();
      updatePoints();
      player.updateHealth();
      lifeBar();
      }



    else if(state === "GameOverScreen") {
       displayGameOver();
       gameOverSong.play();
     }
  }





//**I wanted to try a different way of playing with arrays, I tried the method
//shown on Bmoren's github : https://bmoren.github.io/p5.collide2D/examples/objectCollision/index.html**
function platf(x,y,w,h){
this.x= x;
this.y=y;
this.w= w;
this.h=h;
this.color = color(random(255),random(255),random(255));
this.hit = false;

this.disp = function(){
    noStroke();
		fill(this.color);
		this.x -= 12; //move to the right!
    // Off the left or right
     if (this.x < (-900)) {
      this.x += 2800;
      this.y = random(20,620);
      this.color = color(random(255),random(255),random(255));
      this.w= random(40,60);
      this.h= random(30,65);
     }

		rect(this.x,this.y,this.w,this.h);

	}

this.collide = function(player){
  this.hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.radius);
  if(this.hit){
    player.health -=3.5;
    hitMark.play();

  }
}
}



function displayIntroduction(){
  push();
  imageMode(CENTER);
  image(introImg, width / 2, height / 2, width, height);
  pop();

}

function displayGameOver(){
  push();
  imageMode(CENTER);
  image(gameOverImg, width / 2, height / 2, width, height);
  pop();
  fill(240,160,20);
  textFont('SuperMario256');
  noStroke();
  textSize(40);
  textAlign(CENTER);
  text("You made " + player.points +  " points" + "\n In " + playerScoreOverTime + " seconds", width/2, height/2 );

}

function updateTime(){
  //based on how long the player has been running (got help from p5js with that one)
  if (frameCount % 60 === 0){
    playerScoreOverTime++;
  }
  fill(255);
  textFont('SuperMario256');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(playerScoreOverTime + " s ", 180, 670);
}

function updatePoints(){
  fill(255);
  textFont('SuperMario256');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(player.points + " points ", 440, 670);
}

function lifeBar(){

    fill(255);
    textSize(35);
    fill(200,100 , (player.health));
    rect(640, 640, player.health, 25);


}



function mousePressed() {
  if (state === "IntroScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "StartScreen";
  }

  else if (state === "StartScreen"){
    state = "PlayScreen"
  }


}
