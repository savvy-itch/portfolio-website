import { projects } from "./projects.js";

const projectsGrid = document.getElementById('projects-grid');

document.addEventListener('DOMContentLoaded', populateGrid);

function populateGrid() {
  for (const project of projects) {
    if (projectsGrid) {
      const card = createProjectCard(project);
      card.addEventListener('mouseover', (e) => collapseSibling(e));
      projectsGrid.appendChild(card);
    }
  }
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.classList.add('project-card');
  card.innerHTML = `
    <a href=${project.demoUrl} target="_blank" rel="noopener noreferrer">
      <div class="project-thumbnail">
        <img src=${project.img} alt=${project.imgAlt}>
      </div>
      <div class="project-title">${project.name}</div>
    </a>
  `;
  return card;
}

function collapseSibling(e) {
  console.log(e.target);
}
