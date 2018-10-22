var angle = 0;
var slider;
var sketch = (p) => {
    p.preload = () => {
    };
    p.setup = () => {
        p.createCanvas(400, 400);
        slider = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
    };
    p.windowResized = () => {
    };
    p.draw = () => {
        p.background(51);
        angle = slider.value();
        p.stroke(p.color(255));
        p.translate(200, p.height);
        this.branch(100);
    };
    this.branch = (len) => {
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        if (len > 4) {
            p.push();
            p.rotate(angle);
            this.branch(len * 0.67);
            p.pop();
            p.push();
            p.rotate(-angle);
            this.branch(len * 0.67);
            p.pop();
        }
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=sketch.js.map