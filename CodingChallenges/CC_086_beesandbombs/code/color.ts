class ColorHelper {
  private static getColorVector(p: p5, c: p5.Color) {
    return p.createVector(p.red(c), p.green(c), p.blue(c));
  }

  public static getColorsArray(p: p5, total: number): p5.Color[] {
    var rainbowColors = [
      this.getColorVector(p, p.color("red")),
      this.getColorVector(p, p.color("orange")),
      this.getColorVector(p, p.color("yellow")),
      this.getColorVector(p, p.color("green")),
      p.createVector(38, 58, 150), // blue
      this.getColorVector(p, p.color("indigo")),
      this.getColorVector(p, p.color("violet")),
    ];

    let colours = new Array<p5.Color>();
    for (var i = 0; i < total; i++) {
      var colorPosition = i / total;
      var scaledColorPosition = colorPosition * (rainbowColors.length - 1);

      var colorIndex = Math.floor(scaledColorPosition);
      var colorPercentage = scaledColorPosition - colorIndex;

      var nameColor = this.getColorByPercentage(
        rainbowColors[colorIndex],
        rainbowColors[colorIndex + 1],
        colorPercentage
      );

      colours.push(p.color(nameColor.x, nameColor.y, nameColor.z));
    }

    return colours;
  }

  private static getColorByPercentage(
    firstColor: p5.Vector,
    secondColor: p5.Vector,
    percentage: number
  ) {
    // assumes colors are p5js vectors
    var firstColorCopy = firstColor.copy();
    var secondColorCopy = secondColor.copy();

    var deltaColor = secondColorCopy.sub(firstColorCopy);
    var scaledDeltaColor = deltaColor.mult(percentage);
    return firstColorCopy.add(scaledDeltaColor);
  }
}
