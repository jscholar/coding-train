function Vehicle(x, y) {
    this.lastAcc = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y)

    this.maxSpeed = 8;
    this.maxForce = 0.2;

    this.update = function() {
        // Accelerate Vehicle
        this.velocity.add(this.acceleration); 
        
        // Limit Speed
        this.velocity.limit(this.maxSpeed);

        // Update Position
        this.position.add(this.velocity);

        // Reset acceleration;
        this.lastAcc = this.acceleration.copy();
        this.acceleration.mult(0);
    }


    // This actually functions as gravity as is.
    this.seek = function(target) {

        let desiredV = p5.Vector.sub(target, this.position);
        desiredV.setMag(this.maxSpeed);

        let steer = p5.Vector.sub(desiredV, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    this.applyForce = function(f) {
        this.acceleration.add(f);
    }

    this.display = function() {
        translate(this.position.x, this.position.y);

        push();
        let vehicleAngle = atan2(this.velocity.y, this.velocity.x);
        rotate(vehicleAngle);
        triangle(0, 0, -30, 10, -30, -10);
        stroke(0,0,255);
        strokeWeight(4);
        line(0,0, this.velocity.mag() * 50, 0);
        pop();

        push();
        stroke(255,0,0);
        strokeWeight(5);
        let forceAngle = atan2(this.lastAcc.y, this.lastAcc.x);
        rotate(forceAngle);
        line(0, 0, this.lastAcc.mag() * 1000, 0);
        pop();
    }
}
