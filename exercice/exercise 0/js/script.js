/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup
"use strict";
let x=0;
let y=0;
let speed;
let circleColor=253;

function setup() {
  createCanvas(500,500);
  x = width/2;
  y = height/2;
  speed = random(1,10);
  let circleColor = random(255);
  fill(circleColor);
}
function draw() {
  x += speed;
  console.log("x is:" + x )
  let circleSize = 50;
  ellipse(x,y,circleSize,circleSize);
}
