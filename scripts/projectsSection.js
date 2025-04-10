import { projects } from "./projects.js";
import { stackIcons } from "./stackIcons.js";

const projectsGrid = document.getElementById('projects-grid');

document.addEventListener('DOMContentLoaded', populateGrid);

function populateGrid() {
  projectsGrid.innerHTML = ``;
  for (let i = 0; i < projects.length; i++) {
    if (projectsGrid) {
      const card = createProjectCard(projects[i]);
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
      <div style="background-image: url(${project.img})" class="thumbnail-wrapper">
        <img src=${project.img} alt="" width="0" height="0" style="display: none !important;" />
      </div>
      <div class="project-title">
        <a href=${project.demoUrl ? project.demoUrl : project.codeUrl} target="_blank" rel="noopener noreferrer">
          ${project.name}
        </a>
      </div>
    </div>
    <button class="expand-btn" title="expand button">
      <img src="./images/icons/chevron-down-solid.svg" alt="expand icon" />
    </button>
    <div class="project-details">
      <div class="details-header">
        <div class="project-stack"></div>
        <div class="project-links">
          <a class="project-code-link" href=${project.codeUrl} target="_blank" rel="noopener noreferrer">
            View Code <img src="./images/icons/link-icon.svg" alt="link icon" />
          </a>
          ${project.demoUrl && (
            `<a class="project-code-link" href=${project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live Demo <img src="./images/icons/link-icon.svg" alt="link icon" />
            </a>`
          )}
        </div>
      </div>
      <p class="project-role">${project.role.join(', ')}</p>
      <p class="project-desc">${project.desc}</p>
    </div>
  `;
  return card;
}

function applyEvents() {
  const projectCards = [...projectsGrid.querySelectorAll('.project-card')];

  for(let i = 0; i < projectCards.length; i++) {
    populateStack(projectCards[i], i);
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
    projectCards[i - 1].style.width = '10%';
    const projectTitle = projectCards[i-1].querySelector('.project-title');
    projectTitle.style.fontSize = '1rem';
  }
}

function resetPrevSibling(i, projectCards) {
  if (window.innerWidth >= 768) {
    projectCards[i-1].style.width = '';
    const projectTitle = projectCards[i-1].querySelector('.project-title');
    projectTitle.style.fontSize = '';
  }
}

function handleDetailsDisplay(cardDetails, expandBtn, projectCards, name) {
  cardDetails.classList.toggle('active');
  if (cardDetails.style.maxHeight) {
    cardDetails.style.maxHeight = null;
    expandBtn.innerHTML = `<img src="./images/icons/chevron-down-solid.svg" alt="expand icon" />`;
  } else {
    collapseOtherCards(projectCards, name);
    cardDetails.style.maxHeight = cardDetails.scrollHeight + 'px';
    expandBtn.innerHTML = `<img src="./images/icons/chevron-up.svg" alt="collapse icon" />`;
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
        expandBtn.innerHTML = `<img src="./images/icons/chevron-down-solid.svg" alt="expand icon" />`;
    }
  }
}

function populateStack(card, idx) {
  const stackElem = card.querySelector('.project-stack');
  for (let i = 0; i < projects[idx].stack.length; i++) {
    const iconUrl = stackIcons.find(el => el.name === projects[idx].stack[i]).icon;
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('icon-wrapper');
    iconWrapper.innerHTML = `
      <img src=${iconUrl} alt=${projects[idx].stack[i]} data-tech=${projects[idx].stack[i]} />
    `;
    iconWrapper.addEventListener('mouseenter', (e) => displayTooltip(e));
    iconWrapper.addEventListener('mouseleave', (e) => hideTooltip(e));
    stackElem.appendChild(iconWrapper);
  }
}

function displayTooltip(e) {
  if (e.currentTarget.classList.contains('icon-wrapper')) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = e.currentTarget.querySelector('img').dataset.tech;
    e.currentTarget.appendChild(tooltip);
  }
}

function hideTooltip(e) {
  const iconWrapper = e.target;
  const tooltip = iconWrapper.querySelector('.tooltip');
  iconWrapper.removeChild(tooltip);
}
