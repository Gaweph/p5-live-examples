///NO d.TS file for p5.dom
declare class Slider {
    position:(a:number,b:number)=>any;
    x:number;
    y:number;
    value:()=>number;
    width: number;
}
declare function createSlider(a:number,b:number,c:number) : Slider;
///

class Controls {
    public graphWeight: Slider;
    public circleWeight: Slider;

    public setup() {
        // create canvas
        p.textSize(15);
        p.noStroke();

        // create sliders
        this.graphWeight = createSlider(0, 100, 50);
        this.graphWeight.position(20, 20);
        this.circleWeight = createSlider(0, 100, 20);
        this.circleWeight.position(20, 50);
    }

    public draw () {
        p.strokeWeight(0.5);
        p.stroke(255);
        (<any>p.text)("Graph Lines", this.graphWeight.x * 2 + this.graphWeight.width, 35);
        (<any>p.text)("Circle Lines", this.circleWeight.x * 2 + this.circleWeight.width, 65);
    }
}