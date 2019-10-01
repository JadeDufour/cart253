"use strict";

/******************************************************************************
Where's Sausage Dog?
by Jade Dufour

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
let imageSize;

//Displays the instructions to find the missing Dog
let findDog = "MISSING\nDOG :("

//Display a different reward when the player wins
let winningText = "";
let winningTextX;
let winningTextY;

//Defines values for the dog when player wins (Your dog is happy to see you!)
//Set win dog image
let winDogImg;
//set win dog image position
let winDogImgX;
let winDogImgY;
//Set win dog image velocity
let winDogImgVX;
let winDogImgVY;
//Set win dog image speed
let winDogImgSpeed = 3;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
//Added decoys at the start
let numDecoys = 150;

// Keep track of whether they've won
let gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  //Add a second target dog image so it can move and grow when player wins
  winDogImg = loadImage("assets/images/animals-target.png");


  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}


// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {

  createCanvas(windowWidth,windowHeight);
  //Changed background color
  background("#98FB98");
  imageMode(CENTER);



  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  //So we can display the win dog image over the image targer when player wins
  winDogImgX= targetX;
  winDogImgY = targetY;
  winDogImgVX=0;
  winDogImgVY=0;

  //Load the sausage dog image
   image(targetImage,targetX,targetY,imageSize,imageSize);
}


//the dog used Decoy!



// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {

  //Draw the white rectangle behind the image of the dog
  fill(255);
  rect(width-150,0,170,180);
  image(targetImage,width-80,110,100,100);



//Add the missing dog text
      textFont('Georgia');
      textSize(18);
      textAlign(TOP,RIGHT);
      noStroke();
      fill(0);
      text(findDog,width-125,40);



  if (gameOver) {
    //The dog runs around the screen when player wins
   winDogImgVX += random(-winDogImgSpeed,winDogImgSpeed);
   winDogImgVY += random(-winDogImgSpeed,winDogImgSpeed);
   winDogImgX += winDogImgVX;
   winDogImgY += winDogImgVY;

   image(winDogImg,winDogImgX,winDogImgY);


  winMessage();

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);
    image(targetImage,targetX,targetY);

    //Set some boundaries for the dog, so you won't lose it again
    //It can't go off screen (bounces)
    if (winDogImgX < 0 || winDogImgX > width) {
      winDogImgVX *= -1;
    }
  if (winDogImgY < 0 || winDogImgY > height) {
      winDogImgVY *= -1;
    }


}


function winMessage(){

  // Prepare our typography
  textFont("Helvetica");
  textSize(110);
  /*textAlign(CENTER,CENTER);*/
  noStroke();
  fill(random(255,255,255));

  // Tell them they won!
  winningTextX= windowWidth/2;
  winningTextY=windowHeight/2;
  text(winningText,winningTextX,winningTextY);

  let r = random(0, 1);

   if (r < 0.01) {
     winningText += "no1";
   }
   else if (r < 0.1) {
     winningText += "no2";
   }
   else if (r < 0.4) {
     winningText += "no3";
   }
   else {
     winningText += "no4";
   }
}


}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}