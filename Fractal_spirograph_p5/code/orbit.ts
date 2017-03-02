

class Orbit {
  
  public child: Orbit = null;
  private speed: number;
  
  constructor(public x: number, public y: number, public r: number, protected n: number, private k: number, public angle: number, public parent: Orbit) {
    this.speed = (p.radians(p.pow(k, n-1)))/resolution;
  }

  addChild () {
    var newr = this.r / 3.0;
    var newx = this.x + this.r + newr;
    var newy = this.y;
    this.child = new Orbit(newx, newy, newr, this.n+1, this.k, this.angle, this);
    return this.child;
  }

  update () {
    var parent = this.parent;
    if (parent != null) {
      this.angle += this.speed;
      var rsum = this.r + parent.r;
      this.x = parent.x + rsum * p.cos(this.angle);
      this.y = parent.y + rsum * p.sin(this.angle);
    }
  }

  show () {
    p.stroke(255, 100);
    //p.strokeWeight(1);
    p.noFill();
    p.ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}
