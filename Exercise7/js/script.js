//Project 3
// by Jade Dufour

let numPrey = 12;
let prey = [];
let state = "StartScreen";
let dj;

function preload(){
  //the background image for the intro
  introBackground = loadImage("assets/images/musicDisc.jpg");
  gameBackground = loadImage("assets/images/electro-background.jpg");
  player = loadImage("assets/images/playerImgDJ.jpg");
}

function setup() {
  createCanvas(900,600);


  dj = new DJ(width/2, height/2, 5, player, 30);

  for (let i = 0; i < numPrey; i++) {
  // Generate (mostly) random values for the arguments of the Prey constructor
  let preyX = random(80, width-80);
  let preyY = random(80, height-80);
  let preySpeed = random(2, 10);
  let preyColor = color(random(255),random(255),random(255));
  let preyRadius = random(3, 50);
  // Create a new Prey objects with the random values
  let newPrey = new Targets(preyX, preyY, preySpeed, preyColor, preyRadius);
  // Add the new Prey object to the END of our array using push()
  prey.push(newPrey);

  }
}

function draw() {
  push()
  imageMode(CENTER);
  image(gameBackground, width / 2, height / 2, width, height);
  pop();


if (state === "StartScreen"){
  displayIntroduction();
  }

else if (state === "PlayScreen"){



  dj.handleInput();
  dj.move();
  dj.display();

  for (let i = 0; i < prey.length; i++) {
    // And again we ask prey[i] to display itself because i gives us the current
    // element we are counting through in the loop
    prey[i].display();
    // prey[i].update();
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
  // textFont(pixelFont);
  text("Musical Mayhem", width / 2, height / 2);
  pop();
}

function mousePressed() {
  if (state === "StartScreen") {
    //Remove the instrutions if mouse is pressed
    //Display the gameplay
    state = "PlayScreen";
  }
}
