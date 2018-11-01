var angle = 50;
var growth = 0.05;
var maxLevel = 8;
var sketch = (p) => {
    p.preload = () => {
    };
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    this.currentLevel = 0;
    this.currentLevelGrowth = 0;
    this.finishedGrowing = false;
    p.draw = () => {
        p.background(51);
        p.translate(p.width / 2, p.height);
        if (!this.finishedGrowing) {
            this.currentLevelGrowth += growth;
            if (this.currentLevelGrowth > 1) {
                this.currentLevel++;
                this.currentLevelGrowth = 0;
            }
            if (this.currentLevel > this.maxLevel) {
                this.currentLevel = this.maxLevel;
                this.finishedGrowing = true;
                this.currentLevelGrowth = 1;
            }
        }
        this.branch(p.height / 3, 1, this.currentLevel);
    };
    this.branch = (len, level, maxLevel) => {
        p.stroke(p.color(255));
        p.strokeWeight(maxLevel / level);
        const lastBranch = (level > maxLevel);
        if (lastBranch) {
            p.stroke(p.color('red'));
            let partialLen = p.lerp(0, -len, this.currentLevelGrowth);
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
            this.branch(len * 0.67, newLevel, maxLevel);
            p.pop();
            p.push();
            p.rotate(-angle);
            this.branch(len * 0.67, newLevel, maxLevel);
            p.pop();
        }
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=sketch.js.map