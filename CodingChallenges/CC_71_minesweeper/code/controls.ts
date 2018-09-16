

class Controls {
    public BeeCount: Slider;
    public GridSize: Slider;

    public setup() {
        // create canvas
        textSize(15);
        noStroke();

        // create sliders
        this.BeeCount = createSlider(0, 100, totalBees);
        this.BeeCount.position(20, 20);
        this.GridSize = createSlider(0, 100, 0);
        this.GridSize.position(20, 50);
    }

    public draw () {
        strokeWeight(0.5);
        stroke(255);
        text("Graph Lines", this.BeeCount.x * 2 + this.BeeCount.width, 35);
        text("Circle Lines", this.GridSize.x * 2 + this.GridSize.width, 65);
    }
}