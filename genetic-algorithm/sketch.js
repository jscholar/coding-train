const ascension = "To be or not to be.";
const mutation = 0.01;
var maxPop = 500;
var pop;
function setup() {
    bestPhrase = createP("Best phrase:");

    allPhrases = createP("All phrases:");
    allPhrases.position(600, 10);

    stats = createP("Stats");
    pop = new Population(ascension, maxPop, 0.01);
}

function draw() {
    if (!pop.ascended) {
        pop.evaluateFitness();
        pop.selection();
        pop.nextPop();
        let best = pop.best.asPhrase();
        bestPhrase.html("Best phrase:<br>" + best);
        displayInfo();
    }
}

function displayInfo() {
    allPhrases.html("All phrases:<br>" + pop.allPhrases());
    let statstext = "";
    statstext += "total generations:    " + pop.getGenerations() + "<br>";
    statstext += "average fitness:      " + nf(pop.getAverage()) + "<br>";
    statstext += "total population:     " + maxPop + "<br>";
    statstext += "mutation rate:        " + mutation + "<br>";
    stats.html(statstext);
}
