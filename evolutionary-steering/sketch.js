var food = [];
var poison = [];
var popSize = 100;
var radius = 300;

var population;

var stats;
var prevStats;

function setup() {

    createCanvas(1500, 1500);
    population = new Population(popSize, radius);
    window.population = population;

    for (let i = 0; i < 50; i++) {
        food.push(randomInCircle(radius));
        if (i < 20) poison.push(randomInCircle(radius));
    }
    
    stats = createP();
    stats.position(width + 100, height / 4);
    prevStats = createP();
    prevStats.position(width + 100, 3 * height / 4);
}

function draw() {
    background(50);

    population.updatePop(food, poison);

    // Replenish Food
    while (food.length < 30) {
        food.push(randomInCircle(radius));
    }

    // Replenish Poison
    while (poison.length < 100) {
        poison.push(randomInCircle(radius));
    }
    
    // Draw Food
    for (let i = 0; i < food.length; i++) {
        fill(240,180,50);
        ellipse(food[i].x, food[i].y, 8, 8);
    }

    // Draw Poison
    for (let i = 0; i < poison.length; i++) {
        fill(150, 0, 255);
        ellipse(poison[i].x, poison[i].y, 8, 8);
    }


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

/**
 * @returns {p5.Vector} 
 * @param {Number} R Distance from center
 */
function randomPerimeter(R) {
    let theta = random() * 2 * PI;
    let x = (width / 2) + (R * cos(theta));
    let y = (height / 2) + (R * sin(theta));
    return createVector(x, y);
}

/**
 * Generates random point within radius R
 * @param {Number} R Maximium distance from center
 */
function randomInCircle(R) {
    let r = R * sqrt(random());
    return randomPerimeter(r);
}
