class ColorHelper
{
    private static getColorVector (c: p5.Color) {
        return p.createVector(
            p.red(c), 
            p.green(c),
            p.blue(c)
        );
    }

    public static getColorsArray (total: number): p5.Color[] {
        
      var rainbowColors = [
            this.getColorVector(p.color('red')),
            this.getColorVector(p.color('orange')),
            this.getColorVector(p.color('yellow')),
            this.getColorVector(p.color('green')),
            p.createVector(38, 58, 150), // blue
            this.getColorVector(p.color('indigo')),
            this.getColorVector(p.color('violet'))
        ];
        
        let colours = new Array<p5.Color>();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);

            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;

            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex],
            rainbowColors[colorIndex + 1],
            colorPercentage);

            colours.push(p.color(nameColor.x, nameColor.y, nameColor.z))
        }

        return colours;
    }

    private static getColorByPercentage(firstColor, secondColor, percentage) {
        // assumes colors are p5js vectors
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();

        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    }
}