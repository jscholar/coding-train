var w, h;

const cols = 25;
const rows = 25;
var grid = new Array(rows);
var done = false;
var openSet = new Set();
var closedSet = new Set();
var start;
var end;
let current;
/**
 * Holds the data f(n) = g(n) + h(n) for each node in the matrix gridmap
 */
function Node(_r, _c) {
    this.r = _r;
    this.c = _c;
    this.previous = null;
    this.neighbors = [];
    this.wall = false;
    this.f = Infinity;     // Represents the estimated cost for using node n, to get to the end.

    this.g = Infinity;     // Represents to actual 'cost' from the beginning node to current node.
                            // AKA, the cost so far to get to node n.

    this.h = 0;     // Represents the estimated distance from node n, to the end. Heurstic
    if (random(1) < 0.5) this.wall = true;
    this.addNeighbors = function(grid) {
        if (this.r < rows - 1) this.neighbors.push(grid[this.r + 1][this.c]);
        if (this.r > 0) this.neighbors.push(grid[this.r - 1][this.c]);
        if (this.c < cols - 1) this.neighbors.push(grid[this.r][this.c + 1]);
        if (this.c > 0) this.neighbors.push(grid[this.r][this.c - 1]);
        if (this.r < rows - 1 && this.c < cols - 1) this.neighbors.push(grid[this.r + 1][this.c + 1]);
        if (this.r > 0 && this.c < cols - 1) this.neighbors.push(grid[this.r - 1][this.c + 1]);
        if (this.r < rows - 1 && this.c > 0) this.neighbors.push(grid[this.r + 1][this.c - 1]);
        if (this.r > 0 && this.c > 0) this.neighbors.push(grid[this.r - 1][this.c - 1]);
    }
    this.show = function(color) {
        fill(color);
        if (this.wall) fill(0);
        noStroke();
        rect((this.c + (1 + this.c) / (1 + cols)) * w, (this.r + (1 + this.r) / (1 + rows)) * h, w, h);
    }
    this.drawPath = function() {
        if (!this.previous) return;
        stroke(300 - this.f * 3, 0, this.f * 4);
        strokeWeight(5);
        line((this.c + (1 + this.c) / (1 + cols)) * w + w/2, (this.r + (1 + this.r) / (1 + rows)) * h + h/2,
            (this.previous.c + (1 + this.previous.c) / (1 + cols)) * w + w/2, (this.previous.r + (1 + this.previous.r) / (1 + rows)) * h + h/2
        )
    }

}

    // Should be underestimating the distance, else weird things will happen.
function heuristic(a, b) {
    var d = dist(a.r,a.c, b.r,b.c);
    //var d = abs(a.r - b.r) + abs(a.c - b.c);
    return d;
}

function setup() {
    createCanvas(600, 600);
    frameRate(500);
    w = width / (cols + 1);
    h = height / (rows + 1);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Node(i, j);
        }
    }

    start = grid[0][0];
    end = grid[rows - 1][cols - 1];

    openSet.add(start);
    start.g = 0;
    start.h = heuristic(start, end);
    start.f = start.g + start.h;
    current = start;
    start.wall = false;
    end.wall = false;
}

function draw() {
    background(0);
    if (openSet.size > 0) {
        // Unsolved nodes remain
        // The open node with the shortest estimated distance is the one we should evaluate first
        current = null;
        openSet.forEach((node) => {
            if (current == null || node.f <= current.f) {
                current = node;
            }
        })
        if (current === end) {
            done = true;
            console.log("Done");
        }
        openSet.delete(current);
        current.addNeighbors(grid);
        current.neighbors.forEach(node => {
            if (!node.wall) {
                node.h = heuristic(node, end);
                const d = heuristic(current, node);
                if (current.g + d < node.g) {
                    node.g = current.g + d;
                    node.previous = current;
                }
                if (node.g + d < current.g) {
                    current.g = node.g + d;
                    current.previous = node;
                }
                node.f = node.g + node.h;
                if (!openSet.has(node) && !closedSet.has(node)) openSet.add(node);
            }
        })
        closedSet.add(current);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show(255);
        }
    }
    openSet.forEach(node => node.show(color(255, 0, 0)));
    closedSet.forEach(node => node.show(color(0, 255, 0)));
    grid.forEach(row => {
        row.forEach(node => {
            if (node !== start && !node.wall)
                node.drawPath();
        })
    })
    if (openSet.size == 0) {
        noLoop();

    }
}
