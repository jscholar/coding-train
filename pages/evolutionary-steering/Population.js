function Population(size, radius) {
    this.radius = radius;
    this.size = size;
    this.alive = true;
    this.population = [];
    this.totalFitness;
    this.avgTraits;

    for (let i = 0; i < size; i++) {
        let theta = 2 * PI * i / size;
        let x = (width/2) + (this.radius + 100) * cos(theta);
        let y = (height/2) +(this.radius + 100) * sin(theta);
        this.population.push(new Vehicle(x, y));
    }

    this.updatePop = function(food, poison) {
        this.totalFitness = 0;
        let stillAlive = false;
        for (let pop of this.population) {
            this.totalFitness += pop.fitness;
            if (pop.alive) {
                pop.behaviors(food, poison)
                pop.update();
                pop.display();
                stillAlive = true;
            }
        }
        this.alive = stillAlive;
    }

    this.isAlive = function() {
        return this.alive;
    }
    
    this.nextPop = function() {
        let nextPop = [];
        for (let i = 0; i < size; i++) {

            let survivor = this.selectFitness();
            let nextDNA = survivor.dna.mutate();

            let theta = 2 * PI * i / size;
            let x = (width / 2) + (this.radius + 100) * cos(theta);
            let y = (height / 2) + (this.radius + 100) * sin(theta);
            
            nextPop.push(new Vehicle(x, y, nextDNA));
        }
        this.evaluatePop();
        this.totalFitness = 0;
        this.population = nextPop;
        this.numAlive = size;
    }

    this.selectFitness = function() {
        let rand = random(this.totalFitness);
        let index = 0;
        while (rand > 0) {
            rand -= this.population[index].fitness;
            index++;
        }
        index--;
        return this.population[index];
    }

    this.getData = function() {
        return {
            totalFitness: this.totalFitness,
            ...this.avgTraits
        }
    }

    this.evaluatePop = function() {
        let traits = {};
        for (let trait of DNA.prototype.genome) {
            traits[trait] = 0;
            for (let i = 0; i < size; i++) {
                traits[trait] += this.population[i].dna.traits[trait] / size * 1.0
            }
        }
        this.avgTraits = traits;
    }
    this.evaluatePop();

}
