// Infinite runner - The great escape
// by Jade Dufour
//
// This is an endless runner -------------------------  continue description ------------------------------------------------------------------

let state = "StartScreen";
let player;
let uiFont;
let playerScoreOverTime =0;
//The platforms loop,  *** I went to Stack Overflow for help and inspiration****
// let platformsGroup;
// let currentPlatformLocation;

let plat = [];
let numPlat = 3;

let backgroundX = 0;
let backgroundSpeed = 0.09;
// let platArray = [];

// platArray[0] = {
//   x: 900,
//   y:0
// };

let testArray=[];
let numTest = 1;

function preload(){
  //the player
  imgPlayer = loadImage("assets/images/player.png");
  //the UI font, called SuperMario256
  uiFont = loadFont("assets/fonts/SuperMario256.ttf");
  //the in-game background (found on itch.io, in a free platformer art asset)
  ingameBackground = loadImage("assets/images/Background.png");
  //the platform images
  tilesImg = loadImage("assets/images/platforms.png");

}


function setup() {
  createCanvas(1200, 700);
  //the runner (player)
  player = new Runner(100,475,6,7, imgPlayer, 45, 32,65,68);
                      //x, y, speed, img, radius,  jump, left, righ


  for(i=0; i< numTest; i++){

    let testX= 100;
    let testY= 500;


    let test = new Platforms(testX, testY,9, 500,200, tilesImg);

//x, y, speed, width, height, img


    testArray.push(test);
  }
  //
  //

  for(i=0; i< numPlat; i++){
    r = new platf(random(0,width), random(20,680), 50,50);
    plat.push(r);
  }

}




function draw() {

    background(50,150,200);
     image(ingameBackground, backgroundX, 0, width, height);
     image(ingameBackground,backgroundX + width, 0, width, height);
     if (backgroundX < (width)) {
       backgroundX = backgroundX - backgroundSpeed;
     } else {
       backgroundX -= width;
     }


     // if (this.x < 0) {
     //   this.x += width;
     // } else if (this.x > width) {
     //   this.x -= width;
     // }


    if (state === "StartScreen") {
      displayIntroduction();
    } else if (state === "PlayScreen") {
      // camera.position.x = player.x + 300;
      player.falling();
      player.handleInput();
      player.move();
      player.gravityEffect();
      player.display();
      // player.stayOnScreen();

      player.gravity = 1;
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
        // plat[i].collide(player);

      }


      drawSprites();
      updateScore();
      updatePoints();
      }



    else if(state === "GameOverScreen") {
       displayGameOver();
    //   //music.pause();
     }
  }
// }





function platf(x,y,w,h){
this.x= x;
this.y=y;
this.w= w;
this.h=h;
this.color = color(random(255),random(255),random(255));

this.disp = function(){
    noStroke();
		fill(this.color);
		this.x -= 13; //move to the right!
    // Off the left or right
     if (this.x < (-900)) {
      this.x += 2800;
      this.y = random(20,700);
      this.color = color(random(255),random(255),random(255));
     }

		rect(this.x,this.y,this.w,this.h);

	}
}



function displayIntroduction(){
  background(200,55,155);

}

function displayGameOver(){
  background(200,55,155);
  fill(255);
  textFont('SuperMario256');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text("Game Over", width/2, height/2);
}

function updateScore(){
  //based on how long the player has been running (got help from p5js with that one)
  if (frameCount % 60 === 0){
    playerScoreOverTime++;
  }
  fill(255);
  textFont('SuperMario256');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(playerScoreOverTime + " s ", camera.position.x + 360, camera.position.y +160);
}

function updatePoints(){
  fill(255);
  textFont('SuperMario256');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(player.points + " points ", camera.position.x + 360, camera.position.y +100);
}





  // for (let i=0; i < platformsArray.length; i++){
  //   platformsArray[i].display();
  //   platformsArray[i].move();
  //
  //   if (platformsArray[i].x ==125){
  //       platformsArray.push(ground);
  //   }
  //   // platformsArray[i].handleWrapping();
  //
  // }

// }







function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
