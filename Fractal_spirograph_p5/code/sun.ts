class Sun {

  private path: p5.Vector[] = [];

  private sun: Orbit;
  private first: Orbit = null;
  private end: Orbit;
  private firstChildSingleRotationAngle: number;

  private hasCompletedOrbit: boolean = false;
  private startedDrawing: boolean = false;

    constructor (private radius: number, private planets: number, private k:number, private angle: number, private color: p5.Color, private rotationToDraw: number) {        
        
        this.firstChildSingleRotationAngle = this.rotationToDraw + (this.angle);
        this.sun = new Orbit(p.width/2, p.height/2, this.radius, 0, this.k, this.angle, null);
        let next = this.sun;
        for (var i = 0; i < this.planets; i++) {
            next = next.addChild();
            if(this.first == null) {
                this.first = next;
            }
        }
        this.end = next;
    }

    update () {
        for (var i = 0; i < resolution; i++) {
            var next = this.sun;
            while (next != null) {
                next.update();
                next = next.child;
            }

            if(!this.hasCompletedOrbit) {
                this.path.push(p.createVector(this.end.x, this.end.y));
            }
            
            if(this.first.angle > this.firstChildSingleRotationAngle) {
                this.hasCompletedOrbit = true;
            }
            else {
                //could wipe array and start again?
            }
        }
  }

  show () {
      p.strokeWeight(controls.circleWeight.value()/10);
      var next = this.sun;
        while (next != null) {
            next.show();
            next = next.child;
        }
        
        p.beginShape();
        //p.stroke(255, 0, 255);
        p.strokeWeight(controls.graphWeight.value()/10);
        p.stroke(this.color);
        p.noFill();
        for (var pos of this.path) {
            p.vertex(pos.x, pos.y);
        }
        p.endShape();
    }
}