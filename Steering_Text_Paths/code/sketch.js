var p = new p5();
var p5v = p5.Vector;
class Sketch {
    constructor() {
        this.vehicles = new Array();
        this.font = './assets/Hi.otf';
        this.dotSize = 10;
        this.sampleFactor = 0.1;
    }
    preload() {
    }
    setup() {
    }
    draw() {
        p.background(51);
        for (let v of this.vehicles) {
            v.behaviors();
            v.update();
            v.show();
        }
    }
    setupBoidsForWord(str, forceRedraw = false) {
        if (str != "" && (str != this.text || forceRedraw)) {
            this.text = str;
            p.loadFont(this.font, (f) => {
                let padding = 20;
                let fontSize = this.getFontSizeTextInBounds(f, str, p.width - padding, p.height - padding);
                var bbox = f.textBounds(str, 0, 0, fontSize);
                let x = 0;
                let y = (p.height / 2) + (bbox.h / 2);
                let points = f.textToPoints(str, x, y, fontSize, { sampleFactor: this.sampleFactor });
                this.migrateToNewPoints(points);
            });
        }
    }
    getFontSizeTextInBounds(font, text, boundsWidth, boundsHeight) {
        let fontSize = 1;
        let bbox = { w: 0, h: 0 };
        let padding = 10;
        while (bbox.w < boundsWidth && bbox.h < boundsHeight) {
            fontSize += 2;
            bbox = font.textBounds(text, 0, 0, fontSize);
        }
        return fontSize;
    }
    migrateToNewPoints(points) {
        if (this.vehicles.length == 0) {
            for (let point of points) {
                let target = p.createVector(point.x, point.y);
                let position = p.createVector(p.random(0, p.width), p.random(0, p.height));
                let acceleration = p.createVector();
                let velocity = p5.Vector.random2D();
                let v = new Vehicle(this.dotSize, target, position, acceleration, velocity);
                this.vehicles.push(v);
            }
        }
        else {
            var currentCount = this.vehicles.length;
            var difference = points.length - currentCount;
            if (difference > 0) {
                for (var i = 0; i < difference; i++) {
                    let randomIndex = Math.floor((Math.random() * this.vehicles.length));
                    let v = this.vehicles[randomIndex].copy();
                    this.vehicles.splice(randomIndex, 0, v);
                }
            }
            else if (difference < 0) {
                for (var i = 0; i < difference * -1; i++) {
                    let randomIndex = Math.floor((Math.random() * this.vehicles.length));
                    this.vehicles.splice(randomIndex, 1);
                }
            }
        }
        let colours = ColorHelper.getColorsArray(this.vehicles.length);
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            var v = this.vehicles[i];
            v.setTarget(new p5.Vector(point.x, point.y));
            v.setColor(colours[i]);
            v.setSize(this.dotSize);
        }
    }
}
//# sourceMappingURL=sketch.js.map