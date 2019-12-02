// Infinite runner - The great escape
// by Jade Dufour
//
// This is an endless runner -------------------------  continue description ------------------------------------------------------------------

let state = "StartScreen";
let player;
let uiFont;
let playerScore =0;


function preload(){
  //the player
  imgPlayer = loadImage("assets/images/player.png");
  //the UI font, called SuperMario256
  uiFont = loadFont("assets/fonts/SuperMario256.ttf")


}


function setup() {
  createCanvas(900, 600);

  //the runner (player)
  player = new Runner(100,400,3, imgPlayer, 45, 32,65,68);
}
//(x, y, speed, img, radius,  jump, left, right)


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
  textFont("uiFont");
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(playerScore , camera.position.x + 360, camera.position.y +160);


}



function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
