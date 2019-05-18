class MarchingSquaresHelper {
    // http://www.huderlem.com/demos/marchingsquares.html
    //  4---3
    //  |   |
    //  1---2
    static drawForCombination(x: number, y: number, bitmask: string) {

        push();
        translate(x * PARAMS.gridSize, y * PARAMS.gridSize);
        scale(PARAMS.gridSize);
        strokeWeight(1 / PARAMS.gridSize);
        var midpoint = 0.5;
        if (bitmask == '0000') {
            // nothing
        }
        else if (bitmask == '0001') {
            line(0, midpoint, midpoint, 0);
            beginShape();
            vertex(0, midpoint);
            vertex(midpoint, 0);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '0010') {
            line(1 - midpoint, 0, 1, midpoint);
            beginShape();
            vertex(1 - midpoint, 0);
            vertex(1, midpoint);
            vertex(1, 0);
            endShape();
        }
        else if (bitmask == '0011') {
            line(0, midpoint, 1, midpoint);
            beginShape();
            vertex(0, midpoint);
            vertex(1, midpoint);
            vertex(1, 0);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '0100') {
            line(1 - midpoint, 1, 1, 1 - midpoint);
            beginShape();
            vertex(1 - midpoint, 1);
            vertex(1, 1 - midpoint);
            vertex(1, 1);
            endShape();
        }
        else if (bitmask == '0101') {
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '0001');
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '0100');
        }
        else if (bitmask == '0110') {
            line(midpoint, 0, midpoint, 1);
            beginShape();
            vertex(midpoint, 0);
            vertex(midpoint, 1);
            vertex(1, 1);
            vertex(1, 0);
            endShape();
        }
        else if (bitmask == '0111') {
            line(0, 1 - midpoint, midpoint, 1);
            beginShape();
            vertex(0, 1 - midpoint);
            vertex(midpoint, 1);
            vertex(1, 1);
            vertex(1, 0);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '1000') {
            line(0, 1 - midpoint, midpoint, 1);
            beginShape();
            vertex(0, 1 - midpoint);
            vertex(midpoint, 1);
            vertex(0, 1); y
            endShape();
        }
        else if (bitmask == '1001') {
            line(1 - midpoint, 0, 1 - midpoint, 1);
            beginShape();
            vertex(1 - midpoint, 0);
            vertex(1 - midpoint, 1);
            vertex(0, 1);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '1010') {
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '0010');
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '1000');
        }
        else if (bitmask == '1011') {
            line(1 - midpoint, 1, 1, 1 - midpoint);
            beginShape();
            vertex(1 - midpoint, 1);
            vertex(1, 1 - midpoint);
            vertex(1, 0);
            vertex(0, 0);
            vertex(0, 1);
            endShape();
        }
        else if (bitmask == '1100') {
            line(0, 1 - midpoint, 1, 1 - midpoint);
            beginShape();
            vertex(0, 1 - midpoint);
            vertex(1, 1 - midpoint);
            vertex(1, 1);
            vertex(0, 1);
            endShape();
        }
        else if (bitmask == '1101') {
            line(midpoint, 0, 1, midpoint);
            beginShape();
            vertex(midpoint, 0);
            vertex(1, midpoint);
            vertex(1, 1);
            vertex(0, 1);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '1110') {
            line(midpoint, 0, 0, midpoint);
            beginShape();
            vertex(midpoint, 0);
            vertex(0, midpoint);
            vertex(0, 1);
            vertex(1, 1);
            vertex(1, 0);
            endShape();
        }
        else if (bitmask == '1111') {
            // line(midpoint, 0, 0, midpoint);
            beginShape();
            vertex(0, 0);
            vertex(0, 1);
            vertex(1, 1);
            vertex(1, 0);
            endShape();
        }
        else {
            console.log('bad number' + bitmask);
        }
        pop();
    }
}