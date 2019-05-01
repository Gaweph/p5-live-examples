var bounds = 0;
var agentCount = 50;

var agents: Agent[];
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    bounds = windowWidth / 4;

    agents = new Array<Agent>();

    var size = 1;
    for(var i = 0; i < agentCount; i++) {
        agents[i] = new Agent(
            createVector(random(-bounds, bounds),random(-bounds, bounds)),
            createVector(random(1,10),random(1,10)),
            createVector(1,1),
            size //random(1,10)
           );
    }
    
  }
  

  function draw() {

    background(250);    
    normalMaterial();

    agents.forEach(a => {        
        a.move(bounds);
        a.draw();
    });

    //drag to move the world.
    orbitControl();
    debugMode();
  }