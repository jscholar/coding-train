var vehicles = [];
var food = [];
var poison = [];

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 10; i++) {
        vehicles[i] = new Vehicle(random(width), random(height));
    }
    for (let i = 0; i < 50; i++) {
        let x = random(width);
        let y = random(height);
        food.push(createVector(x, y));
    }

    for (let i = 0; i < 20; i++) {
        let x = random(width);
        let y = random(height);
        poison.push(createVector(x, y));
    }

    window.vehicles = vehicles;
}

function draw() {
    background(50);
    for (let i = vehicles.length - 1; i >= 0; i--) {
        fill(255);
        vehicles[i].behaviors(food, poison);
        vehicles[i].update();
        vehicles[i].display();

        if (!vehicles[i].alive) vehicles.splice(i,1);
    }

    stroke(255);
    for (let i = 0; i < food.length; i++) {
        fill(240,180,50);
        ellipse(food[i].x, food[i].y, 8, 8);
    }

    for (let i = 0; i < poison.length; i++) {
        fill(150, 0, 255);
        ellipse(poison[i].x, poison[i].y, 8, 8);
    }

    while (food.length < 100) {
        let x = random(width);
        let y = random(height);
        food.push(createVector(x, y));
    }

}
