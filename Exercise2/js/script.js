/******************************************************

Game - The Cone Dodger
Jade Dufour

A simple dodging game with keyboard controls

******************************************************/


// The position and size of our avatar 
let avatarX;
let avatarY;
let avatarSize = 10;

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

// How many dodges the player has made
let dodges = 0;

// The two deadly rivals  <----------------------------------
let cone;
let car;




//Insert function preload to load in images  <-------------------

function preload(){

/*//So our avatar and enemy can look like their true selves :)  <-----------------
//Save the images in Assets <----------------------

car = loadImage("assets/images/car.png");
cone = loadImage("assets/images/smallcone.png");*/

}



// setup()
//
// Make the canvas, position the avatar and enemy
function setup() {
  // Create our playing area
  //Increase the size of the canvas <-----------------------------
  createCanvas(700,700);


  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}


// Handle moving the avatar and enemy and checking for dodges and
// game over situations.



function draw() {
  // A grey background (the road)<---------------------------------
  background(128,128,128);
  //The yellow line on the street  <---------------------------------
  fill(220,220,0);
  rect(0,350, 700, 20);



  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;


//Set the player speed faster if in the 1/3 left of the screen <--------------------

    if (avatarX <= width/3) {
      avatarSpeed = 12;
    }
    else if (avatarX <= width/3*2) {
      avatarSpeed = 6;
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


  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

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
    enemySize +=10;
  //The enemy gains speed at the same time  <---------------
    enemySpeed +=0.5;


// This means the player dodged so update its dodge statistic
    dodges = dodges + 1;


  
  // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
   // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
  }

  // Display the number of successful dodges in the console
  console.log(dodges);


/*//Display the images onto the avatars <-----------------
  //the car  <----------------------------------
  image(car,avatarX,avatarY,avatarSize,avatarSize);
  //The cone(s) <--------------------------------
  image(cone,enemyX,enemyY,enemySize,enemySize);*/



  
  //Tell the player how many dodges they achieved <----------------------------
  //Change the text color depending on the score <-----------------------------
  
  //Green <----------------
  if(dodges <= 5) {

  textFont('Arial');
  textAlign(RIGHT,TOP);
  textSize(70);
  fill(20,250,20);
  text(dodges, width, 0);
  }
  //Blue <-----------------
  if (dodges >5){
    fill(25,23,211);
    text(dodges, width, 0);

  }
//Red <---------------------
  if (dodges >= 12){
    
    fill(255,0,0);
    text(dodges, width, 0);
  }
//Yellow <--------------------
  if (dodges > 20){
    fill(255,255,0);
    text(dodges, width, 0);
  }

 // Display the number of successful dodges in the console
 console.log(dodges);

// The player is red
 fill(255,0,0);
 // Draw the player as a circle
 ellipse(avatarX,avatarY,avatarSize,avatarSize);

 // The enemy is orange <--------------------------------
 fill(255,140,0);
 // Draw the enemy as a triangle
 ellipse(enemyX,enemyY,enemySize,enemySize);

}





 