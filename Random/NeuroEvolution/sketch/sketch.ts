var bounds = 0;
var agentCount = 50;
var paused = true;

var size= 10;

var agents: Agent[];
function setup() {
    createCanvas(windowWidth/2, windowHeight, WEBGL);

    bounds = width / 4;
    agents = new Array<Agent>();

    var colors = ColorHelper.getColorsArray(5, [color('indigo'), color('violet')]); // 5 shades of purple

    for(var i = 0; i < agentCount; i++) {
        var position = createVector(random(-bounds, bounds),random(-bounds, bounds));
        var speed = createVector(random(1,3),random(1,3));
        var direction = createVector(random([-1,1]),random([-1,1]));
        agents[i] = new Agent(
            position,
            speed,
            direction,
            size,
            random(colors)
           );
    }    
}
  

  function draw() {
   
    background(250);    
    // normalMaterial();

    // ortho(-400, 400, 400, -400, 0, 1000);
    colorMode(HSB);
    // pointLight(255, 255, 255, 0, 0, 400);
    // pointLight(100, 50, 100, -300, -300, height / 2);
    directionalLight(150, 150, 150, 1, 1, 0);

    agents.forEach(a => {        
        if(!paused) 
        {
            a.move(bounds);
        }        
        a.draw();
    });

    //drag to move the world.
    orbitControl();
    debugMode();
  }  
  function keyPressed() {
    if (key == 'p') {
        paused = !paused;
    }
  }