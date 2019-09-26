/******************************************************

Game - The Cone Dodger
Jade Dufour

A simple dodging game with keyboard controls

******************************************************/


// The position and size of our avatar
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy
let enemySpeed = 5;
let enemyVX = 5;





//The speed, velocity, size and position of the police (in that order)
let policeSpeed = 2;
let policeVX = 5;
let policeX;
let policeY;
let policeSize = 30



// How many dodges the player has made
let dodges = 0;

// The two deadly rivals,  <----------------------------------
//the car
let avatarImage;
//the cone
let enemyImage;

//The background
let backgroundImg;


//The police (watch out!)
let police;


//Add instructions
let showInstructions = true;


//Insert function preload to load in images  <-------------------
function preload(){


//So our avatar and enemy can look like their true selves :)  <-----------------
//Save the images in Assets <----------------------

avatarImage = loadImage('assets/images/54502-00.png');
enemyImage = loadImage('assets/images/orange.png');
backgroundImg= loadImage('assets/images/greyRoad.png');
policeImage = loadImage('assets/images/police.png');

}

// setup()
//
// Make the canvas, position the avatar and enemy
function setup() {
  // Create our playing area
  //Increase the size of the canvas <-----------------------------
  createCanvas(900,600);


  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  //Put the police also at random y coordinates
  policeX = 0;
  policeY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}


// Handle moving the avatar and enemy and checking for dodges and
// game over situations.


function draw() {
  // A grey background (the road)<---------------------------------
  imageMode(CENTER);
  image(backgroundImg, width/2, height/2, width, height);


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;


//Set the player speed faster if in the 1/3 left of the screen <--------------------

    if (avatarX <= width/3) {
      avatarSpeed = 12;
    }
    else if (avatarX <= width/3*2) {
      avatarSpeed = 10;
    }

    //And much slower if the player is in the 1/3 right <-------------------------
    else {
      avatarSpeed = 4;
    }




  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }


  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;

  //So does the police
  policeVX = policeSpeed;


  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;


  // Update the police's position based on it's velocity
  policeX = policeX + policeVX;




  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");

  // Reset the enemy's position and speed  <------------------------
    enemyX = 0;
    enemyY = random(0,height);
    enemySize=40;
    enemySpeed=7;


  // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;

  //Decrease the police's speed
    policeSpeed -= 1;

  // Reset the dodge counter
    dodges = 0;
  }





  // Check if the police and avatar overlap - if they do the player loses
  if (dist(policeX,policeY,avatarX,avatarY) < policeSize/2 + policeSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");

  // Reset the police's position and speed  <------------------------
    policeX = 0;
    policeY = random(0,height);
    policeSize=40;
    policeSpeed=2;


  // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;

  //Reset the enemy's (cones) position
    enemyX = width/2;
    enemyY = height/2;

  // Reset the dodge counter
    dodges = 0;
  }



  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
  // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {

  //Increase the enemy (cone) size when the player dodges  <--------------
    enemySize +=12;
  //The enemy gains speed at the same time  <---------------
    enemySpeed +=0.7;


// This means the player dodged so update its dodge statistic
    dodges = dodges + 1;



  // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
   // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
  }



  // Check if the police has moved all the way across the screen
  if (policeX > width) {


 // Dodging the police does not increase score counter (just the price of your ticket) <-------------------
 //The police does NOT gain in size as it goes across the screen <-----------------------------------


  // How many dodges the player has made
    console.log(dodges + " DODGES!");
   // Reset the police's position to the left at a random height
    policeX = 0;
    policeY = random(0,height);
  }




  // Display the number of successful dodges in the console
  console.log(dodges);




  //Tell the player how many dodges they achieved <----------------------------
  //Changed the text color depending on the score <-----------------------------

  textFont('Arial');
  textAlign(RIGHT,TOP);
  textSize(70);
  //Green <--------------------------------------
  if(dodges <= 5) {
    fill(20,250,20);

  }
  //Blue <---------------------------------------
  else if (dodges < 8){
    fill(25,23,211);

  }
//Red <-----------------------------------------
  else if (dodges < 12){
    fill(255,0,0);

  }
//Yellow <---------------------------------------
  else {
    fill(255,255,0);
    //Add a little commentary <--------------------
    text("GodSpeed!", width, 90);
  }
 text(dodges, width, 0);


 // Display the number of successful dodges in the console
 console.log(dodges);


imageMode(CENTER);
//Display the images onto the avatars <---------------------------
  //the car  <----------------------------------------------------
  image(avatarImage,avatarX,avatarY,avatarSize,avatarSize);
  //The cone(s) <-------------------------------------------------
  image(enemyImage,enemyX,enemyY,enemySize,enemySize);
  //The police <--------------------------------------------------
  image(policeImage,policeX,policeY,policeSize+30,policeSize+10);


//Add instructions before the game starts <-----------------------
if (showInstructions){
  background(255);
  textAlign(CENTER);
  fill(0);
  textSize(20);
  text("The Cone Dodger\n\n*Speed your way through road work*\n\n-Single player : Dodge the cones with the arrows\n-Multiplayer: Grab the mouse and hit the cones to make them bigger\nand hit the police to make it go faster\n\nClick to continue", width/2, 90);
  textAlign(CENTER);
  fill(0);
  textSize(10);
  text("Btw, dodging the police does won't make you a better driver, just a worse citizen", width/2,400);

  //We don't want the game running in the background of the instructions <----------
  noLoop();
}

}


  //Implement second player with mouseClicked function <---------------------
function mousePressed() {
  // Check if the distance between the mouse and the centre of the circle <--
  // is less than the circle's radius
  if (dist(mouseX,mouseY,enemyX,enemyY) < enemySize/2) {

    // Make the circle bigger (harder for the other player) <-----------------
    enemySize = enemySize +30;
  }

  if (dist(mouseX,mouseY,policeX,policeY) < policeSize/2) {
    //Make the police go faster! <-------------------------------------------
  policeSpeed +=2;

  }

//Remove the instructions if the player clicked <-----------------------------
  showInstructions = false;
  loop();

}
