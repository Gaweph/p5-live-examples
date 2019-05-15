class Point {
   constructor(
      public x: number,
      public y: number,
      public vx: number,
      public vy: number,
      public r: number
   ) { }

   draw() {
      stroke('white');
      strokeWeight(0.5);
      noFill();
      circle(this.x, this.y, this.r);
   }

}