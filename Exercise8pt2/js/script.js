// Infinite runner - The great escape
// by Jade Dufour
//
// This is an endless runner -------------------------  continue description ------------------------------------------------------------------

let state = "StartScreen";
let player;


function preload(){

  imgPlayer = loadImage("assets/images/player.png");

}


function setup() {
  createCanvas(900, 600);

  //the runner (player)
  player = new Runner(100,400,3, imgPlayer, 15, 32,65,68);
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

function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
