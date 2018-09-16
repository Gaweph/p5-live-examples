class Controls {
    setup() {
        textSize(15);
        noStroke();
        this.BeeCount = createSlider(0, 100, totalBees);
        this.BeeCount.position(20, 20);
        this.GridSize = createSlider(0, 100, 0);
        this.GridSize.position(20, 50);
    }
    draw() {
        strokeWeight(0.5);
        stroke(255);
        text("Graph Lines", this.BeeCount.x * 2 + this.BeeCount.width, 35);
        text("Circle Lines", this.GridSize.x * 2 + this.GridSize.width, 65);
    }
}
//# sourceMappingURL=controls.js.map