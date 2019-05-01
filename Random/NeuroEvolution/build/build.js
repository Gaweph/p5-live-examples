var Agent = (function () {
    function Agent(position, speed, direction, size) {
        this.position = position;
        this.speed = speed;
        this.direction = direction;
        this.size = size;
    }
    Agent.prototype.move = function (outOfBounds) {
        if (this.position.x > outOfBounds) {
            this.direction.x *= -1;
        }
        else if (this.position.x < -outOfBounds) {
            this.direction.x *= -1;
        }
        if (this.position.y > outOfBounds) {
            this.direction.y *= -1;
        }
        else if (this.position.y < -outOfBounds) {
            this.direction.y *= -1;
        }
        this.position.x += this.speed.x * this.direction.x;
        this.position.y += this.speed.y * this.direction.y;
    };
    Agent.prototype.draw = function () {
        push();
        translate(this.position.x, 0, this.position.y);
        box(this.size, this.size, this.size, 0, 0);
        pop();
    };
    return Agent;
}());
var bounds = 0;
var agentCount = 10;
var agents;
function setup() {
    createCanvas(windowWidth / 2, windowHeight, WEBGL);
    bounds = width / 4;
    agents = new Array();
    var size = 10;
    for (var i = 0; i < agentCount; i++) {
        agents[i] = new Agent(createVector(random(-bounds, bounds), 0, random(-bounds, bounds)), createVector(random(1, 3), random(1, 3)), createVector(random([-1, 1]), random([-1, 1])), size);
    }
}
function draw() {
    background(250);
    normalMaterial();
    agents.forEach(function (a) {
        a.move(bounds);
        a.draw();
    });
    orbitControl();
    debugMode();
}
//# sourceMappingURL=build.js.map