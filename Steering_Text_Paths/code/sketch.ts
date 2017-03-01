var p = new p5();
//definition file doesnt seem to have sub method defined corectly or in usable way
var p5v: { sub(a: p5.Vector, b: p5.Vector): p5.Vector} = <any>p5.Vector; 

class Sketch {
    
    private vehicles: Vehicle[] = new Array<Vehicle>();
    public text:string;
    public font:string = './assets/Hi.otf'

    public dotSize: number = 10;
    public sampleFactor: number = 0.1;
    //public sampleFactor: number = 0.25;

    preload () {        
    }

    setup () {    
    }

    draw() {
        p.background(51);

        for (let v of this.vehicles) {
            v.behaviors();
            v.update();
            v.show();
        }        
    }

    //forceRedraw: redraw even if str has not changed since last word
    setupBoidsForWord(str:string, forceRedraw: boolean = false) {
        if(str != "" && (str != this.text || forceRedraw)) {
            this.text = str;
            (<any>p).loadFont(this.font,  (f) => {  
                let padding = 20;
                
                let fontSize = this.getFontSizeTextInBounds(f, str, p.width - padding, p.height - padding);
                var bbox = (<any>f).textBounds(str, 0, 0, fontSize);
                let x = 0;
                let y = (p.height / 2) + (bbox.h/2);
                let points = f.textToPoints(str, x, y, fontSize, {sampleFactor: this.sampleFactor});
                this.migrateToNewPoints(points);
            });
        }
    }

    private getFontSizeTextInBounds(font: p5.Font, text: string, boundsWidth: number, boundsHeight: number) {
        let fontSize = 1;
        let bbox:any = { w: 0, h: 0};
        //WORK OUT FONT SIZE FOR BEST FIT ON CANVAS
        let padding = 10;
        while(bbox.w < boundsWidth && bbox.h < boundsHeight){
            fontSize +=2;
            bbox = (<any>font).textBounds(text, 0, 0, fontSize);
        }
        return fontSize;
    }

    private migrateToNewPoints(points: p5.Vector[]) {

        if(this.vehicles.length == 0) {
            //FIRST TIME CREATION
            for (let point of points) {
                let target = p.createVector(point.x, point.y);
                let position = p.createVector(p.random(0,p.width), p.random(0,p.height));
                let acceleration = p.createVector();
                let velocity = p5.Vector.random2D();
                let v = new Vehicle(this.dotSize, target, position, acceleration,velocity);
                this.vehicles.push(v);
            }
        }
        else {
            //MODIFY EXISTING VEHICLES
            var currentCount = this.vehicles.length;
            var difference = points.length - currentCount;

            if(difference > 0) {
                //MORE POINTS NEEDED
                for(var i = 0; i < difference; i++) {
                    //add copy of vehicle into array
                    let randomIndex = Math.floor((Math.random() * this.vehicles.length) );
                    //Object.assign({}, this.vehicles[randomIndex]); -- loses functions
                    let v = this.vehicles[randomIndex].copy();
                    this.vehicles.splice(randomIndex,0,v);
                }
                
            }
            else if(difference < 0) {
                //LESS POINTS NEEDED
                for(var i = 0; i < difference*-1; i++) {
                    //add copy of vehicle into array
                    let randomIndex = Math.floor((Math.random() * this.vehicles.length) );
                    this.vehicles.splice(randomIndex,1);
                }
            }            

            
        }        
        
        let colours = ColorHelper.getColorsArray(this.vehicles.length);
        
        //set target and color
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            var v = this.vehicles[i];
            v.setTarget(new p5.Vector(point.x, point.y));
            v.setColor(colours[i]);
            v.setSize(this.dotSize);
        }
    }


    
}


