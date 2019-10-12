/**
 * Stores a population array to produce new generations.
 */

class Population {

    /**
     * 
     * @param {string} target reference to evaluate fitness score
     * @param {number} size size of the population
     * @param {number} mutationRate chance of random mutation
     */
    constructor(target, size, mutationRate) {
        this.ascended = false;
        this.generations = 1;
        this.population = [];
        this.totalFitness;
        this.target = target;
        this.mutationRate = mutationRate;

        for (let i = 0; i < size; i++) {
            this.population.push(new DNA(target.length));
        }

        this.best = this.population[0];
        this.averageFitness = 0;
    }

    /**
     * Generates gene pool for selecting parents in next generation.
     */
    evaluateFitness() {
        this.totalFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(this.target);
            if (this.population[i].fitness >= this.best.fitness) this.best = this.population[i];
            if (this.population[i].fitness == 1) this.ascended = true;
            this.totalFitness += this.population[i].fitness;
        }
        this.averageFitness = this.totalFitness / this.population.length;
    }

    /**
     * Creates next generation from gene pool.
     */
    selection() {
        let nextPopulation = []
        for (let i = 0; i < this.population.length; i++) {
            let parentA = this.acceptReject();
            let parentB = this.acceptReject();
            let child = parentA.crossover(parentB);
            child.mutate(this.mutationRate, this.target);
            nextPopulation.push(child);
        }
        this.population = nextPopulation;
        this.generations++;
    }

    acceptReject() {
        let r = random(this.totalFitness);
        let index = 0;
        while (r > 0) {
            r -= this.population[index].fitness;
            index++;
        }
        index--;
        console.log(index);
        return this.population[index];
    }

    allPhrases() {
        let phrases = "";
        let displayLimit = min(this.population.length, 50);
        for (let i = 0; i < displayLimit; i++) {
            phrases += this.population[i].asPhrase() + "<br>";
        }
        return phrases;
    }

    getGenerations() {
        return this.generations;
    }

    getBest() {
        return this.best.asPhrase();
    }

    getAverage() {
        return this.averageFitness;
    }
}
