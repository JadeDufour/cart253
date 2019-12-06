
//A class for the water animation that runs at the bottom of the screen

class waterAnimation {


  constructor(x, y, width, height) {
    // Position
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  display(){
//Thanks to James Paterson for his sequential, it took me a while to figure everything out, but I made it! https://processing.org/examples/sequential.html
    for ( (this.x = -100); (this.x < width); (this.x += waterAnimationFrame[0].width)) {
      imageMode(CENTER);
      image(waterAnimationFrame[waterCurrentFrame], this.x, this.y, this.width, this.height);
      let programFramesPerAnimationFrame = floor(programFrameRate / animationFrameRate);
       if (frameCount % programFramesPerAnimationFrame === 0) {
      waterCurrentFrame++;
         if (waterCurrentFrame >=waterAnimationFrame.length) {
        waterCurrentFrame = 0;
            }
          }
        }
      }
    }
