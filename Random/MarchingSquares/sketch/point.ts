class Point {
   constructor(
      public x: number,
      public y: number,
      public vx: number,
      public vy: number,
      public r: number
   ) { }

   draw() {
      // square(this.x, this.y, this.r)
      point(this.x, this.y);
      circle(this.x, this.y, this.r);
   }

   // http://jamie-wong.com/2014/08/19/metaballs-and-marching-squares/
   inside(x: number, y: number) {

      var res = (this.r * this.r) / (((x - this.x) * (x - this.x)) + ((y - this.y) * (y - this.y)))
      //console.log(res);
      return res;
   }

}