
var popSize = 100;
var radius = 300;

var population;
var env;
var stats;
var prevStats;

function setup() {

    createCanvas(1000, 1000);

    population = new Population(popSize, radius);
    env = new Environment(radius);
    
    env.replenish();
    
    stats = createP();
    stats.position(width + 100, height / 4);
    prevStats = createP();
    prevStats.position(width + 100, 3 * height / 4);
}

function draw() {
    background(50);
    env.replenish();
    env.draw();
    population.updatePop(env.food, env.poison);

    if (!population.isAlive()) {
        prevStats.html(stats.html());
        population.nextPop();
    }

    displayData();

}

function displayData() {
    population.evaluatePop();
    let data = population.getData();
    statsText = "";
    for (let point of Object.keys(data)) {
        statsText += `${point} : ${data[point]} <br>`
    }
    stats.html(statsText);

}
