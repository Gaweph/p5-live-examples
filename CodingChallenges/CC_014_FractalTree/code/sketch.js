let angle = 26;
let growth = 0.05;
let maxLevel = 8;
let wind = 1;
let doWind = true;
let baseAngle = 26;
var sketch = (p) => {
    p.preload = () => {
    };
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        wind = p.random(1.96, 2.01);
        currentWind = wind;
        currentAngle = angle;
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    let currentLevel = 0;
    let currentLevelGrowth = 0;
    let finishedGrowing = false;
    let currentWind = 0;
    let currentAngle = 0;
    p.draw = () => {
        p.background(51);
        p.translate(p.width / 2, p.height);
        if (!finishedGrowing) {
            currentLevelGrowth += growth;
            if (currentLevelGrowth > 1) {
                currentLevel++;
                currentLevelGrowth = 0;
            }
            if (currentLevel > maxLevel) {
                currentLevel = maxLevel;
                finishedGrowing = true;
                currentLevelGrowth = 1;
            }
        }
        if (doWind) {
            if (currentWind.toPrecision(3) > wind.toPrecision(3)) {
                currentWind -= p.random(0.0001, 0.001);
            }
            else if (currentWind.toPrecision(3) < wind.toPrecision(3)) {
                currentWind += p.random(0.0001, 0.001);
            }
            else {
                wind = p.random(1.96, 2.01);
            }
        }
        if (currentAngle.toPrecision(3) > angle.toPrecision(3)) {
            currentAngle -= p.random(0.0001, 0.00001);
            console.log("<");
        }
        else if (currentAngle.toPrecision(3) < angle.toPrecision(3)) {
            currentAngle += p.random(0.0001, 0.00001);
            console.log(">", currentAngle, angle);
        }
        else {
            angle = angle * p.random(1, 0.95);
            console.log("new angle");
        }
        branch(p.height / 3, 1, 0, currentLevel);
    };
    const branch = (len, level, branchno, maxLevel) => {
        p.stroke(p.color(255));
        p.strokeWeight(maxLevel / level);
        const lastBranch = (level > maxLevel);
        if (lastBranch) {
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
            p.rotate(angle);
            branch(len * 0.67, newLevel, 1, maxLevel);
            p.pop();
            p.push();
            p.rotate(-angle / currentWind);
            branch(len * 0.67, newLevel, 2, maxLevel);
            p.pop();
        }
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=sketch.js.map