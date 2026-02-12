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

document.addEventListener("click", (e) => {
  const isClickInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);

  if (!isClickInsideNav && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});

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
  threshold: 0,         // trigger as soon as any part enters
  rootMargin: "-30% 0px -30% 0px" // optional: adjust activation slightly before/after fully visible
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

  const scrollableParent = e.target.closest('.right-column');
  
  if (scrollableParent) {
    // Let scrolling happen inside the right column
    return; 
  }

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


// Select the elements
const projectsSection = document.querySelector("#projects");
const progressBar = projectsSection.querySelector(".progress-bar");
const projectsMessage = projectsSection.querySelector(".projects-message");

let animationPlayed = false; // flag to run animation only once

// Intersection Observer to trigger animation when in view
const projectsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationPlayed) {
      animationPlayed = true;

      // Animate the progress bar
      progressBar.style.animation = "loadProgress 2s forwards";

      // Animate message after progress bar
      setTimeout(() => {
        projectsMessage.style.animation = "fadeIn 0.5s forwards";
      }, 2000); // same as progress bar duration
    }
  });
}, {
  root: null,       // viewport
  threshold: 0.5    // 50% of projects section visible
});

// Start observing the projects section
projectsObserver.observe(projectsSection);

document.addEventListener("DOMContentLoaded", () => {
  const certificatesContainer = document.querySelector(".certificates-cards");

  if (!certificatesContainer) return; // safety check
  const certificateFiles = [
    "CS50 Introduction to Programmin with Python.jpg",
    "CS50x.pdf",
    "Data Visualization.jpeg",
    "IBM Generative AI Engineering.pdf",
    "Mathematics for Machine Learning.pdf",
    "Pandas.jpeg",
    "Python.jpeg"
  ];

  // Array of card colors (same as before)
  const cardColors = [
    "#e63946", "#f1faee", "#a8dadc", "#457b9d",
    "#ffb703", "#6a4c93", "#ff6f61", "#2a9d8f"
  ];

  function getContrastColor(hexColor) {
    const c = hexColor.charAt(0) === '#' ? hexColor.substring(1) : hexColor;
    const r = parseInt(c.substring(0,2),16);
    const g = parseInt(c.substring(2,4),16);
    const b = parseInt(c.substring(4,6),16);
    const luminance = (0.299*r + 0.587*g + 0.114*b)/255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }

  function createCertificateCard(filename) {
    const card = document.createElement("div");
    card.classList.add("certificate-card");

    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
    card.style.backgroundColor = randomColor;
    card.style.color = getContrastColor(randomColor);

    const displayName = filename.split(".")[0].replace(/[-_]/g, " ");
    card.textContent = displayName;

    card.addEventListener("click", () => {
      window.open(`assets/certificates/${filename}`, "_blank");
    });

    return card;
  }

  certificateFiles.forEach(file => {
    certificatesContainer.appendChild(createCertificateCard(file));
  });

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
  
});
