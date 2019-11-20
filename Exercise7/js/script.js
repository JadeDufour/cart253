//Project 3
// by Jade Dufour

let ship = {
  angle: 0,
  speed: 0,
  x: 0,
  y: 0,
}

let numPrey = 10;
let prey = [];
let state = "StartScreen";

function preload(){
  //the background image for the intro
  introBackground = loadImage("assets/images/musicDisc.jpg");
}

function setup() {
  createCanvas(900,600);
  ship.x = width/2;
  ship.y = height/2;

  for (let i = 0; i < numPrey; i++) {
  // Generate (mostly) random values for the arguments of the Prey constructor
  let preyX = random(0, width);
  let preyY = random(0, height);
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
  background(200,200,200);


if (state === "StartScreen"){
  displayIntroduction();
  }

else if (state === "PlayScreen"){
  handleInput();
  moveShip();
  drawShip();

  for (let i = 0; i < prey.length; i++) {
    // And again we ask prey[i] to display itself because i gives us the current
    // element we are counting through in the loop
    prey[i].display();
  }

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    ship.angle -= 0.1;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    ship.angle += 0.1;
  }

  if (keyIsDown(UP_ARROW)) {
    ship.speed = 5;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    ship.speed = 0;
  }
}

function moveShip() {
  // The magic lines for calculating velocity!
  let vx = ship.speed * cos(ship.angle);
  let vy = ship.speed * sin(ship.angle);

  ship.x += vx;
  ship.y += vy;
}

function drawShip() {
  push();
  translate(ship.x,ship.y);
  rotate(ship.angle);
  noStroke();
  fill(255,0,0);
  ellipse(0,0,50,50);
  stroke(0);
  line(0,0,50,0);
  pop();
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
