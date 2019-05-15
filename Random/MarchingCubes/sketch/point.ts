class Point {
   constructor(
      public x: number,
      public y: number, 
      public vx: number, 
      public vy: number, 
      public r: number,
      public color: p5.Color
   )
   {}

   draw() {
      stroke(this.color);
      strokeWeight(0.5);
      
      circle(this.x, this.y, this.r);
   }
   
}