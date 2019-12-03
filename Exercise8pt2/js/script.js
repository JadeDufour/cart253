// Infinite runner - The great escape
// by Jade Dufour
//
// This is an endless runner -------------------------  continue description ------------------------------------------------------------------

let state = "StartScreen";
let player;
let uiFont;
let playerScore =0;
//The platforms loop,  *** I went to Stack Overflow for help and inspiration****
let platformsGroup;
let currentPlatformLocation;

let plat = [];
let numPlat = 5;

// let platArray = [];

// platArray[0] = {
//   x: 900,
//   y:0
// };


//we need to move the background and it needs to loop
// let backgroundSpritePosition
// let backgroundSprite = [];

function preload(){
  //the player
  imgPlayer = loadImage("assets/images/player.png");
  //the UI font, called SuperMario256
  uiFont = loadFont("assets/fonts/SuperMario256.ttf")
  //the in-game background (found on itch.io, in a free platformer art asset)
  ingameBackground = loadImage("assets/images/Background.png");
  //the platform images
  tilesImg = loadImage("assets/images/platforms.png");

}


function setup() {
  createCanvas(900, 600);
  //the runner (player)
  player = new Runner(100,200,3, imgPlayer, 45, 32,65,68);
  // player.setCollider("rectangle", 0,0,10,40);
// for( let i = 0; i < 5; i ++);{
//   platform = new Platforms(-900,550,15,500,300, tilesImg);
//   platArray.push(platform);}
//x, y, speed, width, height, img
  // player.setCollider('rectangle', 0,0,10,40);
  platformsGroup = new Group();
  currentPlatformLocation = -900;


  for(i=0; i< numPlat; i++){
    r = new platf(600, 500, 500,200);
    plat.push(r);
  }


}




function draw() {
    //a blue background (sky)
    background(55,200,255);


    if (state === "StartScreen") {
      displayIntroduction();
    } else if (state === "PlayScreen") {

      player.handleWrapping();
      player.handleInput();
      player.move();
      player.gravityEffect();
      player.display();
      player.stayOnScreen();


      for(i=0; i<numPlat; i++){
        plat[i].disp();
        // plat[i].collide(player);

      }



      addNewPlatforms();
      removeOldPlatforms();
      // player.collide();
      drawSprites();

      }


      updateScore();
      camera.position.x = player.x + 300;
      //The prey array----------------------

      // Display all the images

      //display the updated score
      // displayScore();

    // } else if (state === "GameOverScreen") {
    //   displayGameOver();
    //   //music.pause();
    // }
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
     if (this.x > 0) {
       this.x -= width;
     }if (this.x < width) {
      this.x += width;
     }
		rect(this.x,this.y,this.w,this.h);

	}
}










function displayIntroduction(){
  background(200,55,155);

}

function updateScore(){
  //based on how long the player has been running (got help from p5js with that one)
  if (frameCount % 60 === 0){
    playerScore++;
  }
  fill(255);
  textFont('uiFont');
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(playerScore , camera.position.x + 360, camera.position.y +160);
}



function addNewPlatforms(){

  if (platformsGroup.length < 5){

      let currentPlatformLength = 1000;
      let platformHeight = 450;
      let platform = createSprite(((currentPlatformLocation += currentPlatformLength)),platformHeight , random(500,1000), 200);

      // image(tilesImg, currentPlatformLocation.x, currentPlatformLocation.y);
      platformsGroup.add(platform);
      // console.log(currentPlatformLocation.x);
      }
  }

  function removeOldPlatforms() {
      for (let i = 0; i < platformsGroup.length; i++) {
        if ((platformsGroup[i].position.x) < player.x - 900) {
          platformsGroup[i].remove();
        }
      }
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
