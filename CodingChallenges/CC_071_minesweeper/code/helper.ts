class Helper {
    static make2DArray(cols: number, rows: number): any[][] {
        var arr: any[][] = new Array(cols);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }
}