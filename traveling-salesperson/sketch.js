var cities = [];
var totalCities = 7;
var shortest;
var bestPath = [];
var order = [];

function setup() {
    createCanvas(400, 800);
    for(let i = 0; i < totalCities; i++) {
        var v = createVector(random(width), random(height-200));
        cities[i] = v;
    }
    for (let i = 0; i < cities.length; i++) {
        order.push(i);
    }
    bestPath = order.slice();
    var d = calcDistance(order);
    shortest = d;
}

function draw() {
    background(0);
    noStroke();
    fill(255);
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 10, 10);
    }

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < order.length; i++) {
        vertex(cities[order[i]].x, cities[order[i]].y);
    }
    endShape();

    beginShape();
    strokeWeight(2);
    stroke(0,255,0);
    for (let i = 0; i < order.length; i++) {
        vertex(cities[bestPath[i]].x, cities[bestPath[i]].y);
    }
    endShape();

    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    nextOrder();
    var d = calcDistance(order);
    if (d < shortest) {
        bestPath = order.slice();
        shortest = d;
    }
}

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function nextOrder() {
    // Find largest x such that P(x) < P(x+1)
    let largestI = -1;
    for (let i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i + 1]) {
            largestI = i;
        }
    }
    if (largestI == -1) {
        noLoop();
        console.log("finished");
        return;
    }

    // Find largest y such that P(x) < P(y)
    let largestJ = -1;
    for (let j = 0; j < order.length; j++) {
        if (order[largestI] < order[j]) {
            largestJ = j;
        }
    }

    // Swap P(x) and P(y)
    swap(order, largestI, largestJ);

    // reverse the end and insert
    let endArray = order.splice(largestI + 1);
    endArray.reverse();
    order = order.concat(endArray);
}

function calcDistance(order) {
    let sum = 0;
    for (let i = 1; i < cities.length; i++) {
        let d = dist(cities[order[i]].x, cities[order[i]].y, cities[order[i-1]].x, cities[order[i-1]].y);
        sum += d;
    }
    return sum;
}

window.order = order;
