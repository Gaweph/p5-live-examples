var sketch = (p: p5) => {

    let x = 0.01;
    let y = 0;
    let z = 0;

    let a = 10;
    let b = 28;
    let c = 8.0 / 3.0;

    let points = new Array();

    p.setup = () => {
        p.createCanvas(800, 600, p.WEBGL);
        p.colorMode(p.HSB);
    }
    
    p.draw = () => {
        p.background(0);
    
        let dt = 0.01;
        let dx = (a * (y - x)) * dt;
        let dy = (x * (b - z) - y) * dt;
        let dz = (x * y - c * z) * dt;
        x = x + dx;
        y = y + dy;
        z = z + dz;
    
        points.push(new p5.Vector(x, y, z));
    
        (<any>p).translate(0, 0, -80);
        let camX = p.map(p.mouseX, 0, p.width, -200, 200);
        let camY = p.map(p.mouseY, 0,p.height, -200,200); 
        (<any>p).camera(camX, camY, (p.height/2.0) / p.tan(p.PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);
        (<any>p).scale(5);
        p.stroke(255);
        p.noFill();
    
        let hu = 0;
        (<any>p).beginShape();
    
        for (let v of points) {
            p.stroke(hu, 255, 255);
            (<any>p).vertex(v.x, v.y, v.z);
            hu += 1;
            if (hu > 255) {
                hu = 0;
            }
        }
        (<any>p).endShape();
    }
}

var lorenz = new p5(sketch);