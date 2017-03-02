var p = new p5();
var resolution = 25;

let fullRotation: number = p.PI * 2;
let leftStartingAngle = -p.PI + (p.PI/10);
let rightStartingAngle = (p.PI * 2) - (p.PI/10);
let bottomStartingAngle = p.PI/2 - (p.PI/5);
let topStartingAngle = -p.PI/2;
class Sketch {

  private suns: Sun[] = [];

  constructor() {

  }
  setup () {
    var colors = ColorHelper.getColorsArray(6);
    this.suns.push(new Sun(p.width/4, 10, -4, leftStartingAngle, colors[0], fullRotation/2));
    this.suns.push(new Sun(p.width/4, 10, -4, topStartingAngle, colors[1], fullRotation/2));
    this.suns.push(new Sun(p.width/4, 10, -4, rightStartingAngle, colors[2], fullRotation/2));
    this.suns.push(new Sun(p.width/4, 10, -4, bottomStartingAngle, colors[3], fullRotation/2));
    // this.suns.push(new Sun(p.width/4, 10, -4, rightStartingAngle, colors[1], fullRotation/2));
    // this.suns.push(new Sun(p.width/4, 10, -4, bottomStartingAngle, colors[2], fullRotation/2));
    // this.suns.push(new Sun(p.width/5, 8, -3, rightStartingAngle, colors[1], fullRotation/2));
    // this.suns.push(new Sun(p.width/6, 6, -2, rightStartingAngle, colors[2], fullRotation/2));
    // this.suns.push(new Sun(p.width/7, 4, -1, rightStartingAngle, colors[3], fullRotation/2));
    // this.suns.push(new Sun(p.width/4, 10, -5, rightStartingAngle, colors[4], fullRotation/2));
    // this.suns.push(new Sun(p.width/4, 10, -6, rightStartingAngle, colors[5], fullRotation/2));
  }

  draw () {
    p.background(51);
    p.strokeWeight(2);
    for (var s of this.suns) {
        s.update();
        s.show();
    }
    
  }
}
