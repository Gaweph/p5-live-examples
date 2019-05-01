class World {

    size= 10;
    agents: Agent[];

    constructor(private bounds: number, private agentCount: number) {

        var colors = ColorHelper.getColorsArray(5, [color('indigo'), color('violet')]); // 5 shades of purple

        this.agents = [];
        for(var i = 0; i < agentCount; i++) {
            var position = createVector(random(-bounds, bounds),random(-bounds, bounds));
            var speed = createVector(random(1,3),random(1,3));
            var direction = createVector(random([-1,1]),random([-1,1]));
            this.agents[i] = new Agent(
                position,
                speed,
                direction,
                this.size,
                random(colors)
            );
        }    
    }

    public draw() {
        push();
            noStroke();
            rotateX(PI / 2.0, );
            ambientMaterial(color('gray'));
            plane(this.bounds * 2, this.bounds * 2)
        pop();
        this.agents.forEach(a => {              
            a.draw();
        });
    }

    public step() {
        this.agents.forEach(a => {        
            if(!paused) 
            {
                a.move(this.bounds);
            }        
        });
    }
}