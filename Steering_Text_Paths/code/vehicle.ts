// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: [coming soon]

class Vehicle {
 
  public pos: p5.Vector;
  public target: p5.Vector;
  public vel: p5.Vector;
  public acc: p5.Vector;
  public radius: number = 5;
  private maxspeed: number = 10;
  private maxforce: number = 2;

  //private strokeColor: number = 255;
  private color: p5.Color;
  private arriveDistance: number = 100;
  private fleeRadius: number = 100;

  constructor(radius: number, target: p5.Vector, position: p5.Vector, acceleration: p5.Vector, velocity: p5.Vector) {
    this.pos = position;//p.createVector(p.random(0,p.width), p.random(0,p.height));
    this.target = target;//p.createVector(x, y);
    this.vel = velocity;//p5.Vector.random2D();
    this.acc = acceleration;//p.createVector();
    this.radius = radius;
  }

  copy() {
    return new Vehicle(this.radius, this.target.copy(), this.pos.copy(), this.acc.copy(), this.vel.copy())
  }

  behaviors () {
    var arrive = this.arrive(this.target);
    var mouse = p.createVector(p.mouseX, p.mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  
    setTarget(t: p5.Vector) {
        this.target = t;
    }
    setColor(c: p5.Color) {
        this.color = c;
    }
    setSize(s: number) {
        this.radius = s;
    }

  applyForce (f) {
    this.acc.add(f);
  }

  update () {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show () {
    p.stroke(this.color);
    p.strokeWeight(this.radius);
    p.point(this.pos.x, this.pos.y);
  }


  arrive (target: p5.Vector) {
    var desired = p5v.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < this.arriveDistance) {
      speed = p.map(d, 0, this.arriveDistance, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5v.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee (target: p5.Vector) {
    var desired = p5v.sub(target, this.pos);
    var d = desired.mag();
    if (d < this.fleeRadius) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5v.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return p.createVector(0, 0);
    }
  }
}