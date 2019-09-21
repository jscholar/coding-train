const size = 800;
var squares = 10;
var w;
var grid = [];
var current;
var rows, cols;

var stack;
var generated;

function setup() {
    w = size/squares;
    stack = [];
    generated = false;
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
    frameRate(200);
}

function draw() {
    if (!generated) {
        background(51);
        for (let i = 0; i < grid.length; i++) {
            grid[i].show();
        }
        current.visited = true;
        current.highlight();
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else {
            if (!stack.length) generated = true;
            current = stack.pop();
        }
    } else {
        /* Solve the maze with A* */
    }
}

function removeWalls(a,b) {
    var x = a.i - b.i;
    var y = a.j - b.j;
    if (x == 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (x == -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    } else if (y == 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else {
        a.walls[1] = false;
        b.walls[3] = false;
    }
}

function reset () {
    grid = [];
    setup();
}

