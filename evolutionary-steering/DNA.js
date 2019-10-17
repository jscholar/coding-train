
function DNA() {

    this.maxHealth = 200;

    this.traits = {
        "good": 1.0,
        "bad": 1.0
    };


    /**
     * Modifies a steering force according to behavior
     * and returns it
     */
    this.behave = function(steer, target) {
        steer.mult(this.traits[target])
        return steer;
    }

    /**
     * Returns slightly mutated DNA
     */
    this.mutate = function() {
        let child = new DNA();
        for (let gene of DNA.prototype.genome) {
            child.traits[gene] = this.traits[gene] + randomGaussian(0, 0.2);
        }
        return child;
    }
}

DNA.prototype.genome = [
    "good",
    "bad"
]
