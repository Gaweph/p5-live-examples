var p = new p5();
var resolution = 25;
let fullRotation = p.PI * 2;
let leftStartingAngle = -p.PI;
let rightStartingAngle = (p.PI * 2);
let bottomStartingAngle = p.PI / 2;
let bottomLeftStartingAngle = p.PI / 2 + (p.PI / 5);
let topStartingAngle = -p.PI / 2;
class Sketch {
    constructor() {
        this.suns = [];
    }
    setup() {
        var k = 4;
        var change = ((k + 1) * 2);
        var leftAngle = leftStartingAngle + (p.PI / change);
        change = ((k + 1) * 2);
        var rightAngle = rightStartingAngle - (p.PI / change);
        change = ((k + 1));
        console.log(change);
        var bottomAngle = bottomStartingAngle - (p.PI / change);
        var topAngle = topStartingAngle;
        var colors = ColorHelper.getColorsArray(5);
        for (var i = 1; i <= 1; i++) {
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, leftAngle, colors[0], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, topAngle, colors[1], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, rightAngle, colors[2], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, bottomAngle, colors[3], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, bottomLeftStartingAngle, colors[4], fullRotation / 4));
        }
    }
    draw() {
        p.background(51);
        p.strokeWeight(5);
        for (var s of this.suns) {
            s.update();
            s.show();
        }
    }
}
//# sourceMappingURL=sketch.js.map