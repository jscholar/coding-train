function newChar() {
    let c = floor(random(63, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;

    return String.fromCharCode(c);
}

class DNA {
    constructor(genomeSize) {
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < genomeSize; i++) {
            this.genes.push(newChar());
        }
    }

    /**
     * 
     * @param {string} target Compares similarities between genes and target and returns fitness score.
     */
    calcFitness(target) {
        for (let i = 0; i < target.length; i++) {
            if (this.genes[i] == target[i]) this.fitness++;
        }
        return this.fitness;
    }

    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (random() < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }

    crossover(partner) {
        let child = new DNA(this.genes.length);

        let midpoint = floor(random(this.genes.length)); // Part of genome from parent A. Other part of genome from parent B

        for (let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) child.genes[i] = partner.genes[i];
            else child.genes[i] = this.genes[i];
        }
        
        return child;
    }

    asPhrase() {
        return this.genes.join("");
    }
}
