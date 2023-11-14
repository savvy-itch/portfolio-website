const heading = document.getElementById('name-heading');
const subHeading = document.getElementById('occupation-heading');
const skillsGrid = document.querySelector('.skills-grid');
const icons = document.querySelectorAll('.icon');
const links = document.querySelector('.nav-links');
const liLinks = links.querySelectorAll('li');
const navLinks = links.querySelectorAll('a');
const navToggle = document.querySelector('.nav-toggle');
const showLinks = document.querySelector('.show-links');
const headerTxt = "Hello, I'm Mykhailo";
const subheaderTxt = "Front-end Developer";
let typeSpeed = 95;
let cursorSpeed = 500;
let showCursor = true;
let i = 0;
let y = 0;

// typing animation
document.addEventListener('DOMContentLoaded', typeWords);

function typeWords() {
  if (i < headerTxt.length) {
    heading.innerHTML += headerTxt.charAt(i);
    i++;
  } else {
    heading.style.border = '0';
    if (y < subheaderTxt.length) {
      subHeading.innerHTML += subheaderTxt.charAt(y);
      y++;
    }
  }
  setTimeout(typeWords, typeSpeed)
}

// trigger animation on viewport visibility
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-skills');
      observer.unobserve(entry.target);
    }
  });
});
observer.observe(skillsGrid);

icons.forEach(icon => {
  icon.addEventListener('mouseover', displayTooltip);
  icon.addEventListener('mouseleave', hideTooltip);
});

function displayTooltip(e) {
  if (e.target.classList.contains('icon')) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = e.target.dataset.tech;
    e.target.parentElement.appendChild(tooltip);
  }
}
function hideTooltip(e) {
  const iconWrapper = e.target.parentElement;
  const tooltip = iconWrapper.querySelector('.tooltip');
  iconWrapper.removeChild(tooltip)
}

// smooth scrolling
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = document.querySelector(link.hash);
      section.scrollIntoView({
        behavior: 'smooth'
      });
  })
})



// mobile navbar
window.addEventListener('resize', handleLinksDisplay);

navToggle.addEventListener('click', function() {
  links.classList.toggle('show-links');
  handleLinksDisplay();
});

function handleLinksDisplay() {
  if (window.innerWidth <= 768) {
    navToggle.style.transform = 'rotate(90deg)';
    if (links.classList.contains('show-links')) {
      let linksHeight = 0;
      liLinks.forEach(li => linksHeight += (li.getBoundingClientRect().height + 7));
      links.style.height = linksHeight + 'px';
    } else {
      navToggle.style.transform = 'rotate(0deg)';
      links.style.height = '0';
    }
  } else {
    links.style.height = 'auto';
  }
}