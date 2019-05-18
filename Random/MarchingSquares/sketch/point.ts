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

}