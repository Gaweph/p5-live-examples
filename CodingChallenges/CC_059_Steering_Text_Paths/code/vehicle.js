class Vehicle {
    constructor(radius, target, position, acceleration, velocity) {
        this.radius = 5;
        this.maxspeed = 10;
        this.maxforce = 2;
        this.arriveDistance = 100;
        this.fleeRadius = 100;
        this.pos = position;
        this.target = target;
        this.vel = velocity;
        this.acc = acceleration;
        this.radius = radius;
    }
    copy() {
        return new Vehicle(this.radius, this.target.copy(), this.pos.copy(), this.acc.copy(), this.vel.copy());
    }
    behaviors() {
        var arrive = this.arrive(this.target);
        var mouse = p.createVector(p.mouseX, p.mouseY);
        var flee = this.flee(mouse);
        arrive.mult(1);
        flee.mult(5);
        this.applyForce(arrive);
        this.applyForce(flee);
    }
    setTarget(t) {
        this.target = t;
    }
    setColor(c) {
        this.color = c;
    }
    setSize(s) {
        this.radius = s;
    }
    applyForce(f) {
        this.acc.add(f);
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
    show() {
        p.stroke(this.color);
        p.strokeWeight(this.radius);
        p.point(this.pos.x, this.pos.y);
    }
    arrive(target) {
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
    flee(target) {
        var desired = p5v.sub(target, this.pos);
        var d = desired.mag();
        if (d < this.fleeRadius) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            var steer = p5v.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        }
        else {
            return p.createVector(0, 0);
        }
    }
}
//# sourceMappingURL=vehicle.js.map