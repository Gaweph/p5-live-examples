class Food 
{
    size = 4;
    constructor(public position: p5.Vector) {

    }

    public draw() {
        push();
            noStroke();
            ambientMaterial(color('orange'));
            translate(this.position.x, -this.size, this.position.y);
            sphere(this.size,this.size,this.size);            
        pop();
    }
}