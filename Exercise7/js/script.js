//Project 3 - Musical Mayhem - Alpha Stage
// Express your creativity or let go of all your anger and resentment with this chaotic musical mini game
//
//
//
// Continue Description ----------------------------------
//by Jade Dufour

let numCircles = 12;
let musicalCircles = [];
let state = "StartScreen";
let dj;
let introFont;

function preload(){
  //loading the images for the backgrounds, the player and the circles
  introBackground = loadImage("assets/images/musicDisc.jpg");
  gameBackground = loadImage("assets/images/electro-background.jpg");
  player = loadImage("assets/images/playerImgDJ.jpg");
  //Circles images
  musicPink= loadImage("assets/images/MusicPink.png");
  musicBLue= loadImage("assets/images/MusicBlue.png");
  musicYellow= loadImage("assets/images/MusicYellow.png");
  musicGreen= loadImage("assets/images/MusicGreen1.png");
  musicRed= loadImage("assets/images/Music-icon.png");
  //The font used in the intro
  introFont = loadFont("assets/fonts/marker.ttf");
  //loading the sounds
  //Beats
  overlapSound = new Audio("assets/sounds/bassSound2.wav");
  bassSound1 = new Audio("assets/sounds/bassSound1.wav");
}

function setup() {
  createCanvas(900,600);
//The player, a DJ
  dj = new DJ(width/2, height/2, 5, color(255,230,21), 30);
//The for loop for the circles
  for (let i = 0; i < numCircles; i++) {
  // Create a new Prey objects with the random values
  let circles = new Targets(random(60, width-60), random(60, height-60), random(2, 10), color(random(255),random(255),random(255)), random(10, 50));
  // Add the new Prey object to the END of our array using push()
  musicalCircles.push(circles);
  }
}

function draw() {
  push()
  imageMode(CENTER);
  image(gameBackground, width / 2, height / 2, width, height);
  pop();

//I added states to organize the game and the gameplay
if (state === "StartScreen"){
  displayIntroduction();
  }

else if (state === "PlayScreen"){

  dj.handleInput();
  dj.move();
  dj.display();
  dj.handleWrapping();
//A function for the sounds of the mouse, to clean the script
  playMouseInputs();

//The for loop for the circles
  for (let i = 0; i < musicalCircles.length; i++) {
    // And again we ask prey[i] to display itself because i gives us the current
    // element we are counting through in the loop
    musicalCircles[i].update();
    musicalCircles[i].display();
    dj.overlapping(musicalCircles[i]);
  }

}
//For now we keep it hidden
// else if (state ==="GameOverScreen"){
//
// }
//

}



//Displays the introductin
function displayIntroduction() {
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
  rect(0, height / 2, width * 2, height / 5);
  pop();
  //the text
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  textFont("marker");
  text("Musical Mayhem", width / 2, height / 2);
  pop();
}
//A beat plays depending on the location of the mouse on the canvas
function playMouseInputs(){

  if (mouseY < height/2){
      bassSound1.play();
  }

  if (mouseY > height/2){
      bassSound1.pause();
  }

    if (mouseX < width/2) {
      overlapSound.play();
  }

  if (mouseX > width/2){
    overlapSound.pause();
  }
}

function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
