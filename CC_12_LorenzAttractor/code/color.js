class ColorHelper {
    static getColorVector(c) {
        return p.createVector(p.red(c), p.green(c), p.blue(c));
    }
    static getColorsArray(total) {
        var rainbowColors = [
            this.getColorVector(p.color('red')),
            this.getColorVector(p.color('orange')),
            this.getColorVector(p.color('yellow')),
            this.getColorVector(p.color('green')),
            p.createVector(38, 58, 150),
            this.getColorVector(p.color('indigo')),
            this.getColorVector(p.color('violet'))
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
//# sourceMappingURL=color.js.map