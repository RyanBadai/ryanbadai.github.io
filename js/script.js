document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section');

  function closeMenu() {
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
  }

  function openMenu() {
    sidebar.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
    menuIconOpen.classList.add('hidden');
    menuIconClose.classList.remove('hidden');
  }

  menuToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('-translate-x-full')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeMenu();
      }
    });
  });

  // Active link on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove('bg-red-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });
      button.classList.add('bg-red-500', 'text-white');
      button.classList.remove('bg-gray-200', 'text-gray-700');

      const filter = button.getAttribute('data-filter');

      projectCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  var typed = new Typed('#typing-animation', {
    strings: ['Ryan Badai A.', 'a Data Scientist', 'a Data Analyst', 'a Data Engineer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
});

// --- Project Modal Logic ---
const projectModal = document.getElementById('project-modal');
const projectModalCard = document.getElementById('project-modal-card');
const projectModalClose = document.getElementById('project-modal-close');
const projectModalBackdrop = document.getElementById('project-modal-backdrop');
const projectModalImg = document.getElementById('project-modal-img');
const projectModalMeta = document.getElementById('project-modal-meta');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalDesc = document.getElementById('project-modal-desc');
const projectModalLink = document.getElementById('project-modal-link');

function openProjectModal(card) {
  // Populate modal content from data attributes
  projectModalImg.src = card.dataset.img || '';
  projectModalImg.alt = card.dataset.title || '';
  projectModalMeta.textContent = card.dataset.meta || '';
  projectModalTitle.textContent = card.dataset.title || '';
  projectModalDesc.textContent = card.dataset.desc || '';
  projectModalLink.href = card.dataset.link || '#';

  // Show modal container (flex)
  projectModal.classList.remove('hidden');
  projectModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Trigger zoom+float entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      projectModalCard.style.opacity = '1';
      projectModalCard.style.transform = 'scale(1) translateY(0)';
    });
  });
}

function closeProjectModal() {
  // Reverse the animation
  projectModalCard.style.opacity = '0';
  projectModalCard.style.transform = 'scale(0.9) translateY(1rem)';
  setTimeout(() => {
    projectModal.style.display = 'none';
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

// Attach click listeners to all project cards
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => openProjectModal(card));
});

// Close on button, backdrop, or Escape key
projectModalClose.addEventListener('click', closeProjectModal);
projectModalBackdrop.addEventListener('click', closeProjectModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.style.display === 'flex') {
    closeProjectModal();
  }
});

// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentGallery = [];
let currentIndex = 0;

// Function to open lightbox
function openLightbox(imgElement, gallery) {
  currentGallery = Array.from(gallery);
  currentIndex = currentGallery.indexOf(imgElement);
  updateLightbox();
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to update image
function updateLightbox() {
  const targetImg = currentGallery[currentIndex];
  lightboxImg.src = targetImg.src;
  document.getElementById('lightbox-caption').textContent = targetImg.alt || `Photo ${currentIndex + 1}`;
}

// Event Listeners for Images in Experience Section
document.querySelectorAll('#experience .equal-img').forEach((img) => {
  img.addEventListener('click', (e) => {
    // Only navigate through images in the same card/grid
    const parentGrid = e.target.closest('.grid');
    const siblingImages = parentGrid.querySelectorAll('.equal-img');
    openLightbox(e.target, siblingImages);
  });
});

// Navigation logic
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateLightbox();
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateLightbox();
});

// Close logic
const closeLightbox = () => {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
};

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('hidden')) return;
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'Escape') closeLightbox();
});
