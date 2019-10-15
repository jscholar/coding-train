function Vehicle(x, y,dna) {

    this.dna;

    this.health = 200;
    this.alive = true;

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
        
        // energy expenditure
        this.health -= 0.5 + pow(this.acceleration.mag(), 1.5); 
        
        // Reset acceleration;
        this.lastAcc = this.acceleration.copy();
        this.acceleration.mult(0);
        if (this.health <= 0) this.alive = false;
        constrain(this.health, 0, 100);
    }

    this.behaviors = function(good, bad) {
        let steerG = this.eat(good, 10);
        let steerB = this.eat(bad, -50);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    // This actually functions as gravity as is.
    this.seek = function(target) {

        let desiredV = p5.Vector.sub(target, this.position);
        let distance = desiredV.mag();
        desiredV.setMag(this.maxSpeed);


        let steer = p5.Vector.sub(desiredV, this.velocity);
        steer.mult(1/distance);
        steer.limit(this.maxForce);
        return steer;
    }

    this.applyForce = function(f) {
        this.acceleration.add(f);
    }

    this.eat = function(list, effect) {
        let record = Infinity;
        let closest = -1;
        for (let i = 0; i < list.length; i++) {
            let d = this.position.dist(list[i]);
            if (d < record) {
                record = d;
                closest = i;
            }
        }

        // Something eaten
        if (record < 5) {
            list.splice(closest, 1);
            this.health += effect;
        } else if (closest > -1) {
            return this.seek(list[closest]);
        }

        return createVector(0,0);

    }

    this.display = function() {
        // health spectrum
        let gr = color(0, 255, 0);
        let rd = color(255, 0, 0);
        let col = lerpColor(rd, gr, this.health / 100.0);
        fill(col);
    
        push();
        noStroke();
        translate(this.position.x, this.position.y);
        let vehicleAngle = atan2(this.velocity.y, this.velocity.x);
        rotate(vehicleAngle);
        triangle(0, 0, -20, 7, -20, -7);
        //this.displayLines();
        pop();
    }

    this.displayLines = function() {

        stroke(0,0,255);
        strokeWeight(4);
        line(0,0, this.velocity.mag() * 50, 0);

        push();
        stroke(255,0,0);
        strokeWeight(5);
        let forceAngle = atan2(this.lastAcc.y, this.lastAcc.x);
        rotate(forceAngle);
        line(0, 0, this.lastAcc.mag() * 1000, 0);
        pop();
    }
}
