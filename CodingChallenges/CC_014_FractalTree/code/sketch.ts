// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

var angle = 50;
var growth  = 0.01;
var maxLevel = 5;
// var sliderAngle: any;
// var sliderBranches: any;

var sketch = (p: p5) => {
  p.preload = () => {

  }
  
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // sliderAngle = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
    // sliderBranches = p.createSlider(1, 50, 4);
  }
  
  p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  
  let currentLevel = 0;
  let currentLevelGrowth = 0;
  let finishedGrowing = false;
  p.draw = () => {
    p.background(51);
    // angle = sliderAngle.value();
    p.translate(p.width/2, p.height);

    if(!finishedGrowing) {
      currentLevelGrowth += growth;
      if(currentLevelGrowth > 1) {
        currentLevel++;
        currentLevelGrowth = 0;
      }
      if(currentLevel > this.maxLevel) {
        currentLevel = this.maxLevel;
        finishedGrowing = true;
        currentLevelGrowth = 1;
      }
    }
    
    this.branch(p.height/3, 0, currentLevel);   
  }

  this.branch = (len: number, level: number, maxLevel: number) => {

    p.stroke(p.color(255));
    const lastBranch = (level >= maxLevel);

    
    if(lastBranch) {
      p.stroke(p.color('red'));
      let partialLen = p.lerp(0, -len, currentLevelGrowth);
      p.line(0, 0, 0, partialLen);
    }
    else {
      p.line(0, 0, 0, -len);
    }

    p.translate(0, -len);
    if (!lastBranch) {
      const newLevel = level + 1;
      p.push();
      p.rotate(angle); // divide by 2 for wind?
      this.branch(len * 0.67, newLevel, maxLevel);
      p.pop();
      p.push();
      p.rotate(-angle);
      this.branch(len * 0.67, newLevel, maxLevel);
      p.pop();
    }
  
  }
}

var sketchP = new p5(sketch);