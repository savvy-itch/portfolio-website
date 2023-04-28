const heading = document.getElementById('name-heading');
const subHeading = document.getElementById('occupation-heading');
const skillsGrid = document.querySelector('.skills-grid');
const icons = document.querySelectorAll('.icon');
const navLinks = document.querySelectorAll('.nav-links a');
const headerTxt = "Hello, I'm Mykhailo";
const subheaderTxt = "Front-End Developer";
let typeSpeed = 90;
let cursorSpeed = 500;
let showCursor = true;
let i = 0;
let y = 0;

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
  console.log(e);
  if (e.target.classList.contains('icon')) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = e.target.dataset.tech;
    e.target.parentElement.appendChild(tooltip);
    tooltip.style.top = e.clientY - 20 + 'px';
    tooltip.style.left = e.clientX + 10 + 'px';
  }
}
function hideTooltip(e) {
  const tooltip = e.target.parentElement.querySelector('.tooltip');
  e.target.parentElement.removeChild(tooltip)
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = document.querySelector(link.hash);
      section.scrollIntoView({
        behavior: 'smooth'
      });
  })
})