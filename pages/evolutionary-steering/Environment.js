/**
 * Handles food and poison in the environment
 * @param {Number} r Radius of enviroment
 */
function Environment(r) {

    this.radius = r;

    this.food = [];
    this.poison = [];

    this.foodLimit = 50;
    this.poisonLimit = 50;

    this.replenish = function() {

        while (this.food.length < this.foodLimit) {
            this.food.push(randomInCircle(this.radius));
        }

        while (this.poison.length < this.poisonLimit) {
            this.poison.push(randomInCircle(this.radius));
        }
    }

    this.draw = function() {

        for (let i = 0; i < this.food.length; i++) {
            fill(240, 180, 50);
            ellipse(this.food[i].x, this.food[i].y, 8, 8);
        }

        for (let i = 0; i < this.poison.length; i++) {
            fill(150, 0, 255);
            ellipse(this.poison[i].x, this.poison[i].y, 8, 8);
        }
    }

    /**
     * @returns {p5.Vector} 
     * @param {Number} R Distance from center
     */
    function randomPerimeter(R) {
        let theta = random() * 2 * PI;
        let x = (width / 2) + (R * cos(theta));
        let y = (height / 2) + (R * sin(theta));
        return createVector(x, y);
    }

    /**
     * Generates random point within radius R
     * @param {Number} R Maximium distance from center
     */
    function randomInCircle(R) {
        let r = R * sqrt(random());
        return randomPerimeter(r);
    }

}
