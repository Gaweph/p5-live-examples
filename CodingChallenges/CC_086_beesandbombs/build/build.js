class ColorHelper {
    static getColorVector(p, c) {
        return p.createVector(p.red(c), p.green(c), p.blue(c));
    }
    static getColorsArray(p, total) {
        var rainbowColors = [
            this.getColorVector(p, p.color("red")),
            this.getColorVector(p, p.color("orange")),
            this.getColorVector(p, p.color("yellow")),
            this.getColorVector(p, p.color("green")),
            p.createVector(38, 58, 150),
            this.getColorVector(p, p.color("indigo")),
            this.getColorVector(p, p.color("violet")),
        ];
        let colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(p.color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    }
    static getColorByPercentage(firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    }
}
var sketch = (p) => {
    let showRainbowColors = false;
    let canvasWidth = 400;
    let canvasHeight = 400;
    let angle = 0;
    let w = 24;
    let ma;
    let maxD;
    let minHeight = 100;
    let maxHeight = 300;
    var leftBuffer;
    var rightBuffer;
    var pg;
    var speed = 0.06;
    var heightsColors;
    var rowColors;
    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
        ma = p.atan(p.cos(p.QUARTER_PI));
        maxD = p.dist(0, 0, 200, 200);
        var button = p.createButton("Toggle RAINBOW");
        button.position(0, 0);
        button.mousePressed(this.toggleRainbow);
        let cols = canvasHeight / w;
        let rows = canvasHeight / w;
        heightsColors = ColorHelper.getColorsArray(p, maxHeight - minHeight);
        rowColors = ColorHelper.getColorsArray(p, rows);
    };
    p.draw = () => {
        p.background(100);
        p.ortho(-400, 400, 400, -400, 0, 1000);
        p.rotateX(-ma);
        p.rotateY(-p.QUARTER_PI);
        p.pointLight(255, 255, 255, 0, 0, 400);
        p.pointLight(100, 50, 100, -300, -300, canvasHeight / 2);
        p.directionalLight(150, 150, 150, -0.8, -0.8, 0);
        for (let z = 0; z < canvasHeight; z += w) {
            for (let x = 0; x < canvasHeight; x += w) {
                p.push();
                let d = p.dist(x, z, canvasHeight / 2, canvasHeight / 2);
                let offset = p.map(d, 0, maxD, -p.PI, p.PI);
                let a = angle + offset;
                let h = this.mapHeight(a);
                if (showRainbowColors) {
                    let heightColor = heightsColors[h - minHeight];
                    p.ambientMaterial(heightColor);
                }
                else {
                    let row = p.floor(z / w);
                    let rowColor = rowColors[row];
                    p.ambientMaterial(rowColor);
                }
                p.translate(x - canvasHeight / 2, 0, z - canvasHeight / 2);
                p.box(w, h, w);
                p.pop();
            }
        }
        angle -= speed;
    };
    this.toggleRainbow = () => {
        showRainbowColors = !showRainbowColors;
    };
    this.mapHeight = (angle) => {
        return p.floor(p.map(p.sin(angle), -1, 1, minHeight, maxHeight));
    };
};
//# sourceMappingURL=build.js.map