var project = document.querySelector(".project");

document.getElementById("input--selector-aStar")
.addEventListener("click", (e) => {
    project.src = "astar-algorithm/index.html";
})
document.getElementById("input--selector-mazeGenerator")
.addEventListener("click", (e) => {
    project.src = "maze-generator/index.html";
})
document.getElementById("input--selector-travelingSalesperson")
.addEventListener("click", (e) => {
    project.src = "traveling-salesperson/index.html";
})
document.getElementById("input--selector-geneticAlgorithm")
.addEventListener("click", (e) => {
    project.src = "genetic-algorithm/index.html"
})
