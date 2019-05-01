

var paused = false;
var world: World;
function setup() {
    createCanvas(windowWidth/2, windowHeight, WEBGL);
    var bounds = width / 4;
    var agentCount = 25;
    var foodCount = 10;
    world = new World(bounds, agentCount, foodCount);
}
  

function draw() {

    background(250);    
    // normalMaterial();

    // ortho(-400, 400, 400, -400, 0, 1000);
    colorMode(HSB);
    // pointLight(255, 255, 255, 0, 0, 400);
    // pointLight(100, 50, 100, -300, -300, height / 2);
    directionalLight(150, 150, 150, 1, 1, 0);
    ambientLight(200);

    world.step();
    world.draw();
    

    //drag to move the world.
    orbitControl();
    // debugMode();
}  
    function keyPressed() {
    if (key == 'p') {
        paused = !paused;
    }
}