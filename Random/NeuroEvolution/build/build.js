var x = 0;
var y = 0;
var directionX = 1;
var directionY = 1;
var speedx = 0;
var speedy = 0;
var bounds = 0;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    bounds = windowWidth / 4;
    speedx = random(1, 10);
    speedy = random(1, 10);
}
function draw() {
    background(250);
    var radius = width * 1.5;
    normalMaterial();
    translate(x, 0, y);
    box(10, 10, 10, 0, 0);
    x += speedx * directionX;
    y += speedy * directionY;
    debugMode();
    rotateX(frameCount * 0.01);
    orbitControl();
    if (x > bounds) {
        directionX *= -1;
    }
    else if (x < -bounds) {
        directionX *= -1;
    }
    if (y > bounds) {
        directionY *= -1;
    }
    else if (y < -bounds) {
        directionY *= -1;
    }
}
//# sourceMappingURL=build.js.map