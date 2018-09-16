class Controls {
    setup() {
        p.textSize(15);
        p.noStroke();
        this.graphWeight = createSlider(0, 100, 50);
        this.graphWeight.position(20, 20);
        this.circleWeight = createSlider(0, 100, 20);
        this.circleWeight.position(20, 50);
    }
    draw() {
        p.strokeWeight(0.5);
        p.stroke(255);
        p.text("Graph Lines", this.graphWeight.x * 2 + this.graphWeight.width, 35);
        p.text("Circle Lines", this.circleWeight.x * 2 + this.circleWeight.width, 65);
    }
}
//# sourceMappingURL=controls.js.map