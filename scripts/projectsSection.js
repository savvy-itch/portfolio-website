import { projects } from "./projects.js";

const projectsGrid = document.getElementById('projects-grid');

document.addEventListener('DOMContentLoaded', populateGrid);

function populateGrid() {
  for (let i = 0; i < projects.length; i++) {
    if (projectsGrid) {
      const card = createProjectCard(projects[i]);
      populateStack(card, i);
      projectsGrid.appendChild(card);
    }
  }
  applyEvents();
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.classList.add('project-card');
  card.setAttribute('name', project.name);
  card.innerHTML = `
    <div class="project-thumbnail">
      <div style="background-image: url(${project.img})" class="thumbnail-wrapper"></div>
      <div class="project-title">
        <a href=${project.demoUrl} target="_blank" rel="noopener noreferrer">
          ${project.name}
        </a>
      </div>
    </div>
    <button class="expand-btn">
      <i class="fa-solid fa-chevron-down"></i>
    </button>
    <div class="project-details">
      <div class="details-header">
        <p class="project-stack">Stack</p>
        <a class="project-code-link" href=${project.codeUrl} target="_blank" rel="noopener noreferrer">
          View Code
        </a>
      </div>
      <p class="project-role">${project.role}</p>
      <p>${project.desc}</p>
    </div>
  `;
  return card;
}

function applyEvents() {
  const projectCards = [...projectsGrid.querySelectorAll('.project-card')];

  for(let i = 0; i < projectCards.length; i++) {
    const expandBtn = projectCards[i].querySelector('.expand-btn');
    const cardDetails = projectCards[i].querySelector('.project-details');
    expandBtn.addEventListener('click', () => handleDetailsDisplay(cardDetails, expandBtn, projectCards, projectCards[i].getAttribute('name')));
    if (i !== 0 && i % 2 !== 0) {
      projectCards[i].addEventListener('mouseover', () => collapsePrevSibling(i, projectCards));
      projectCards[i].addEventListener('mouseout', () => resetPrevSibling(i, projectCards));
    }
  }
}

function collapsePrevSibling(i, projectCards) {
  if (window.innerWidth >= 768) {
    console.log('>768')
    projectCards[i - 1].style.width = '10%';
  }
}

function resetPrevSibling(i, projectCards) {
  if (window.innerWidth >= 768) {
    projectCards[i - 1].style.width = '';
  }
}

function handleDetailsDisplay(cardDetails, expandBtn, projectCards, name) {
  cardDetails.classList.toggle('active');
  if (cardDetails.style.maxHeight) {
    cardDetails.style.maxHeight = null;
    expandBtn.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
  } else {
    collapseOtherCards(projectCards, name);
    cardDetails.style.maxHeight = cardDetails.scrollHeight + 'px';
    expandBtn.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
  }
}

function collapseOtherCards(projectCards, name) {
  for (let i = 0; i < projectCards.length; i++) {
    const projectDetails = projectCards[i].querySelector('.project-details');
    const projectTitle = projectCards[i].getAttribute('name');
    if (projectDetails.classList.contains('active') 
      && projectTitle !== name) {
        projectDetails.classList.toggle('active');
        const expandBtn = projectCards[i].querySelector('.expand-btn');
        projectDetails.style.maxHeight = null;
        expandBtn.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    }
  }
}

function populateStack(card, idx) {
  const stackElem = card.querySelector('.project-stack');
  let stackList = '';
  for (let i = 0; i < projects[idx].stack.length; i++) {
    if (i === 0) {
      stackList += projects[idx].stack[i];
    } else {
      stackList += `, ${projects[idx].stack[i]}`;
    }
  }
  stackElem.innerText = stackList;
}
