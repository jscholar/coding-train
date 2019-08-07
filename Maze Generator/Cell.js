function index(i, j) {
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) return -1;
    return i + j * rows;
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.walls = [true, true, true, true];

    this.checkNeighbors = function() {
        let neighbors = [];

        let top = grid[index(i, j-1)]
        let top = grid[index(i+1, j)]
        let top = grid[index(i, j+1)]
        let top = grid[index(i-1, j)]

    }

    this.show = function() {
        var x = this.j * w;
        var y = this.i * w;
        stroke(255);
        if (this.walls[0]) line(x, y, x + w, y);
        if (this.walls[0]) line(x + w, y, x + w, y + w);
        if (this.walls[0]) line(x + w, y + w, x, y + w);
        if (this.walls[0]) line(x, y + w, x, y);
        if (this.visited) {
            fill(255,0,255,100);
            rect(x,y,w,w);
        }
    };
}
