let cities: p5.Vector[] = [];
let population: Population;
let recordDistance = Infinity;
let bestEver: PopulationItem;
let currentBest: PopulationItem;
let totalCities = 12;
let popSize = 500;
let mutationRate = 0.01;

function setup() {
  createCanvas(800, 800);
  let order: number[] = [];
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities.push(v);
    order.push(i);
  }
  population = new Population(popSize, order);
}

function draw() {
  background(0);

  // GA
  population.calculateFitness();
  population.normalizeFitness();
  population.nextGeneration();

  //new best?
  if (bestEver == null || population.bestItem.distance < bestEver.distance) {
    bestEver = population.bestItem;
  }

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();

  if (bestEver) {
    drawPopulationItemCityOrder(bestEver);
  }

  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  
  drawPopulationItemCityOrder(population.bestItem);
  
  endShape();
}

function drawPopulationItemCityOrder(item: PopulationItem) {
  for (let city of item.cityOrder) {
      let n = city;
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
}

function calcDistance (points: p5.Vector[], order: number[]) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    const cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}