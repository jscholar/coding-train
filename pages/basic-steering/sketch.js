var car;
var target;
var looping;

function setup() {
    createCanvas(1000,1000);
    background(0);
    looping = true;
    car = new Vehicle(width/2, height/2);
    document.querySelector(".p5Canvas").addEventListener("click", (e) => {
        if (looping) noLoop();
        else loop();
        looping = !looping;
    })

}

function draw() {
    background(0);
    car.seek(createVector(mouseX, mouseY));
    car.update();
    car.display();
}

