function Cell(i, j) {
    this.i = i;
    this.j = j;

    this.show = function() {
        var x = this.j*w;
        var y = this.i*w;
        stroke(255);
        noFill();
        rect(x, y, w, w);
    }
    
}

