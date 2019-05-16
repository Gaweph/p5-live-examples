class Point {
   constructor(
      public x: number,
      public y: number,
      public vx: number,
      public vy: number,
      public r: number
   ) { }

   draw() {
      circle(this.x, this.y, this.r);
   }

}