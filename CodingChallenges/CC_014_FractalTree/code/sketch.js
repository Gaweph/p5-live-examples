let angle = 50;
let growth = 0.05;
let maxLevel = 8;
var sketch = (p) => {
    p.preload = () => {
    };
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    let currentLevel = 0;
    let currentLevelGrowth = 0;
    let finishedGrowing = false;
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
        branch(p.height / 3, 1, 0, currentLevel);
    };
    let branchAngles = {};
    const branch = (len, level, branchno, maxLevel) => {
        if (branchAngles[`${level}_${branchno}_1`] == null) {
            branchAngles[`${level}_${branchno}_1`] = p.random(0, 2);
        }
        if (branchAngles[`${level}_${branchno}_2`] == null) {
            branchAngles[`${level}_${branchno}_2`] = p.random(0, 2);
        }
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
            p.rotate(angle / branchAngles[`${level}_${branchno}_1`]);
            branch(len * 0.67, newLevel, 1, maxLevel);
            p.pop();
            p.push();
            p.rotate(-angle / branchAngles[`${level}_${branchno}_2`]);
            branch(len * 0.67, newLevel, 2, maxLevel);
            p.pop();
        }
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=sketch.js.map