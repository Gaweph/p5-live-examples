class ColorHelper
{
    private static getColorVector (c: p5.Color) {
        return createVector(
            red(c), 
            green(c),
            blue(c)
        );
    }

    public static getColorsArray (total: number): p5.Color[] {
        
      var rainbowColors = [
            this.getColorVector(color('red')),
            this.getColorVector(color('orange')),
            //this.getColorVector(color('yellow')),
            this.getColorVector(color('purple')),
            createVector(38, 58, 150), // blue
            this.getColorVector(color('indigo')),
            this.getColorVector(color('violet'))
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

            colours.push(color(nameColor.x, nameColor.y, nameColor.z))
        }

        return colours;
    }

    private static getColorByPercentage(firstColor:p5.Vector, secondColor:p5.Vector, percentage:number) {
        // assumes colors are p5js vectors
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();

        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    }
}