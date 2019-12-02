// Infinite runner - The great escape
// by Jade Dufour
//
// This is an endless runner -------------------------  continue description ------------------------------------------------------------------

let state = "StartScreen";

function setup() {
createCanvas(900, 600);

}
function preload(){

}



  function draw() {
    //a blue background (sky)
    background(55,200,255);


    if (state === "StartScreen") {
      displayIntroduction();
    } else if (state === "PlayScreen") {


      //The prey array----------------------

      // Display all the images

      //display the updated score
      // displayScore();

    } else if (state === "GameOverScreen") {
      displayGameOver();
      // happyMusic.pause();
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
