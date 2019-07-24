class Point {
   constructor(
      private pointX: number,
      private pointY: number,
      public vx: number,
      public vy: number,
      private radius: number
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

   move() {
      this.pointX += this.vx / width;
      this.pointY += this.vy / height;

      if (this.x - this.r < 0 || this.x + this.r > width) {
         this.vx *= -1;
      }
      if (this.y - this.r < 0 || this.y + this.r > height) {
         this.vy *= -1;
      }
   }
   get r() {
      // console.log(this.r, PARAMS.maxPointSize);
      return this.radius * PARAMS.maxPointSize;
   }

   get x() {
      return this.pointX * width;
   }
   get y() {
      return this.pointY * height;
   }

}