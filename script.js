const project = document.querySelector('.project');
const navbar = document.querySelector('.navbar')
const projects = {
    'astar-algorithm': 'A(Star) Algorithm',
    'maze-generator': 'Maze Generator',
    'traveling-salesperson': 'Traveling Salesman',
    'genetic-algorithm': 'Genetic Algorithm',
    'basic-steering': 'Basic steering',
    'evolutionary-steering': 'Evolutionary Steering',
};

Object.entries(projects).forEach(([id, name]) => {

    const button = document.createElement('button');
    button.id = id;
    button.insertAdjacentText('afterbegin', name);
    button.addEventListener('click', () => {
        project.src = `${id}/index.html`;
    })
    navbar.insertAdjacentElement('beforeend', button);
    
});