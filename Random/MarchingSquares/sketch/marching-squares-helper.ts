class MarchingSquaresHelper {
    // http://www.huderlem.com/demos/marchingsquares.html
    drawForCombination(bitmask: string) {

        if (bitmask == '0000') {
            // nothing
        }
        else if (bitmask == '0001') {
            line(0, 0.5, 0.5, 0);
        }
        else if (bitmask == '0010') {
            line(0.5, 0, 1, 0.5);
        }
    }
}