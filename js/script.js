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
    rootMargin: '0px',
    threshold: 0.3,
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
    strings: ['Ryan', 'a Data Scientist', 'a Data Analyst', 'a Data Engineer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
});
