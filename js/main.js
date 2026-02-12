const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinksItems.forEach((link, index) => {
  link.addEventListener('click', () => {
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentSectionIndex = index;
    updateActiveNav();
    navLinks.classList.remove('active'); // close mobile menu
  });
});

function updateActiveNav() {
  const navLinksItems = document.querySelectorAll('.nav-links a');

  navLinksItems.forEach((link, idx) => {
    link.classList.toggle('active', idx === currentSectionIndex && idx < sections.length - 1);
  });
}

const sections = [
  ...document.querySelectorAll('section'),
  document.querySelector('footer')
];

let currentSectionIndex = 0;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentSectionIndex = sections.indexOf(entry.target);
      updateActiveNav();
    }
  });
}, {
  root: null,           // viewport
  threshold: 0.5        // 50% of section must be visible to be "active"
});

sections.forEach(section => observer.observe(section));
let isScrolling = false;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  if (isScrolling) return;

  isScrolling = true;
  sections[index].scrollIntoView({ behavior: 'smooth' });
  currentSectionIndex = index;
  updateActiveNav();

  setTimeout(() => { isScrolling = false; }, 700);
}

window.addEventListener('wheel', (e) => {
  if (window.innerWidth <= 768) return; // keep normal scroll on mobile

  e.preventDefault(); // stop default smooth/fast scrolling

  if (e.deltaY > 0) {
    scrollToSection(currentSectionIndex + 1);
  } else {
    scrollToSection(currentSectionIndex - 1);
  }
}, { passive: false });

window.addEventListener('keydown', e => {
  if (window.innerWidth <= 768) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault(); // stop default page scroll
    scrollToSection(currentSectionIndex + 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault(); // stop default page scroll
    scrollToSection(currentSectionIndex - 1);
  }
}, { passive: false });

const leftArrow = document.querySelector(".cert-arrow.left");
const rightArrow = document.querySelector(".cert-arrow.right");
const cardsContainer = document.querySelector(".certificates-cards");

let currentIndex = 0;
const cards = cardsContainer.querySelectorAll(".certificate-card");
const totalCards = cards.length;

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) currentIndex--;
  cardsContainer.scrollTo({
    left: cards[currentIndex].offsetLeft,
    behavior: "smooth"
  });
});

rightArrow.addEventListener("click", () => {
  if (currentIndex < totalCards - 1) currentIndex++;
  cardsContainer.scrollTo({
    left: cards[currentIndex].offsetLeft,
    behavior: "smooth"
  });
});