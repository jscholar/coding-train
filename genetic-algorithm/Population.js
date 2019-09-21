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
        this.genePool = [];
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
        let totalScore = 0;
        for (let i = 0; i < this.population.length; i++) {
            let fitness = this.population[i].calcFitness(this.target);
            if (fitness >= this.best.fitness) this.best = this.population[i];
            if (fitness === this.target.length) this.ascended = true;
            totalScore += fitness;
        }
        this.averageFitness = totalScore / this.population.length;
    }

    selection() {
        this.genePool = [];
        for (let i = 0; i < this.population.length; i++) {
            let fitness = map(this.population[i].fitness, 0, this.best.fitness, 0, 1);
            let n = floor(fitness * 100);
            for (let j = 0; j < n; j++) {
                this.genePool.push(this.population[i]);
            }
        }
    }

    /**
     * Creates next generation from gene pool.
     */
    nextPop() {
        for (let i = 0; i < this.population.length; i++) {
            let a = floor(random(this.genePool.length));
            let b = floor(random(this.genePool.length));
            let parentA = this.genePool[a];
            let parentB = this.genePool[b];
            let child = parentA.crossover(parentB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
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
        return this.averageFitness / this.target.length;
    }
}
