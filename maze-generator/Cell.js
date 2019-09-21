function index(i, j) {
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) return -1;
    return i * rows + j;
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.walls = [true, true, true, true];
    this.checkNeighbors = function() {
        let neighbors = [];

        let top = grid[index(i, j-1)];      // top
        let right = grid[index(i+1, j)];    // right
        let bottom = grid[index(i, j+1)];   // bottom
        let left = grid[index(i-1, j)];     // left

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length) {
            const r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return null;
        }
    }

    this.show = function() {
        var x = this.j * w;
        var y = this.i * w;
        stroke(255);
        if (this.walls[0]) line(x, y, x + w, y);
        if (this.walls[1]) line(x + w, y, x + w, y + w);
        if (this.walls[2]) line(x + w, y + w, x, y + w);
        if (this.walls[3]) line(x, y + w, x, y);
        if (this.visited) {
            noStroke();
            fill(255,0,255,100);
            rect(x,y,w,w);
        }
    };

    this.highlight = function() {
        var x = this.j * w;
        var y = this.i * w;
        noStroke();
        fill(0,255,0,100);
        rect(x,y,w,w);
    }
}
