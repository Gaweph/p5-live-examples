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
        var midpoint = 0.3;
        if (bitmask == '0000') {
            // nothing
        }
        else if (bitmask == '0001') {
            line(0, midpoint, midpoint, 0);
        }
        else if (bitmask == '0010') {
            line(1 - midpoint, 0, 1, midpoint);
        }
        else if (bitmask == '0011') {
            line(0, midpoint, 1, midpoint);
        }
        else if (bitmask == '0100') {
            line(1 - midpoint, 1, 1, 1 - midpoint);
        }
        else {
            console.log('bad number' + bitmask);
        }
        pop();
    }
}