var cols, rows;
const w = 40;

var grid = [];

function setup() {
    createCanvas(400, 400);
    cols = floor(width/w);
    rows = floor(height/w);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
}

function draw() {
    background(51);
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

window.grid = grid;