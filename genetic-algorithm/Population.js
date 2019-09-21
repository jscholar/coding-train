class Population {

    Population()
    {
        this.population = [];
    }

    newPop(size) {
        for (let i = 0; i < size; i++) {
            this.population.push(new DNA());
        }
    }
}
