const size = 400;
const w = 40;
const grid = [];
var current;
var rows, cols;
function setup() {
    createCanvas(size, size);
    cols = floor(size/w);
    rows = floor(size/w);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    current = grid[0];
}

function draw() {
    background(51);
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    current.visited = true;
}

window.grid = grid;
