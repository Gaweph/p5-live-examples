class Agent {

    private startingPosition: p5.Vector;
    constructor(
        public position: p5.Vector, 
        public speed: p5.Vector, 
        public direction: p5.Vector,
        public size: number,
        public color: p5.Color
    ) {
        this.startingPosition = position.copy();
    }

    public move(outOfBounds: number) {
        if(this.position.x > outOfBounds) {
            this.direction.x *= -1;
        }
        else if(this.position.x < -outOfBounds) {
            this.direction.x *= -1;
        }
        if(this.position.y > outOfBounds) {
            this.direction.y *= -1;
        }
        else if(this.position.y < -outOfBounds) {
            this.direction.y *= -1;
        }

        this.position.x += this.speed.x * this.direction.x;
        this.position.y += this.speed.y * this.direction.y;
        
        console.log('move', outOfBounds, this.direction.x, this.direction.y);
    }

    public draw() {
        
        push();
            noStroke();
            ambientLight(200);
            ambientMaterial(this.color);
            translate(this.position.x, 0, this.position.y);
            box(this.size,this.size,this.size);            
        pop();
    }
}