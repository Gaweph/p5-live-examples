var Agent = (function () {
    function Agent(position, speed, direction, size, color) {
        this.position = position;
        this.speed = speed;
        this.direction = direction;
        this.size = size;
        this.color = color;
        this.startingPosition = position.copy();
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
        console.log('move', outOfBounds, this.direction.x, this.direction.y);
    };
    Agent.prototype.draw = function () {
        push();
        noStroke();
        ambientLight(200);
        ambientMaterial(this.color);
        translate(this.position.x, 0, this.position.y);
        box(this.size, this.size, this.size);
        pop();
    };
    return Agent;
}());
var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.getColorsArray = function (total, betweenColors) {
        if (betweenColors === void 0) { betweenColors = null; }
        if (betweenColors == null) {
            betweenColors = [
                color('red'),
                color('orange'),
                color('yellow'),
                color('green'),
                color(38, 58, 150),
                color('indigo'),
                color('violet')
            ];
        }
        var rainbowColors = [];
        for (var i = 0; i < betweenColors.length; i++) {
            rainbowColors[i] = this.getColorVector(betweenColors[i]);
        }
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var paused = false;
var world;
function setup() {
    createCanvas(windowWidth / 2, windowHeight, WEBGL);
    var bounds = width / 4;
    var agentCount = 25;
    world = new World(bounds, agentCount);
}
function draw() {
    background(250);
    colorMode(HSB);
    directionalLight(150, 150, 150, 1, 1, 0);
    world.step();
    world.draw();
    orbitControl();
    debugMode();
}
function keyPressed() {
    if (key == 'p') {
        paused = !paused;
    }
}
var World = (function () {
    function World(bounds, agentCount) {
        this.bounds = bounds;
        this.agentCount = agentCount;
        this.size = 10;
        var colors = ColorHelper.getColorsArray(5, [color('indigo'), color('violet')]);
        this.agents = [];
        for (var i = 0; i < agentCount; i++) {
            var position = createVector(random(-bounds, bounds), random(-bounds, bounds));
            var speed = createVector(random(1, 3), random(1, 3));
            var direction = createVector(random([-1, 1]), random([-1, 1]));
            this.agents[i] = new Agent(position, speed, direction, this.size, random(colors));
        }
    }
    World.prototype.draw = function () {
        this.agents.forEach(function (a) {
            a.draw();
        });
    };
    World.prototype.step = function () {
        var _this = this;
        this.agents.forEach(function (a) {
            if (!paused) {
                a.move(_this.bounds);
            }
        });
    };
    return World;
}());
//# sourceMappingURL=build.js.map