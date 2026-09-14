// Portfolio interactions — navigation, scroll animations, contact form, project toggles
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Active nav link highlighting
const sections = document.querySelectorAll('section[id], header[id]');

const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.querySelectorAll('a').forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent-light)'
            : '';
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
);

sections.forEach((section) => activeLinkObserver.observe(section));

// Contact form — opens mail client with pre-filled message
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:kuchanavarsha1969@gmail.com?subject=${subject}&body=${body}`;
});

// Project cards — wrap extra content behind a More/Less toggle
document.querySelectorAll('.project-card').forEach((card, index) => {
  const desc = card.querySelector('.project-card__desc');
  if (!desc) return;

  const details = document.createElement('div');
  details.className = 'project-card__details';
  details.id = `project-details-${index}`;
  details.hidden = true;

  // Collapse highlights + metrics; keep links, embeds, and previews visible
  const collapsible = ['.project-card__highlights', '.project-card__metrics'];
  collapsible.forEach((selector) => {
    const el = card.querySelector(selector);
    if (el) details.appendChild(el);
  });

  if (!details.children.length) return;

  desc.insertAdjacentElement('afterend', details);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'project-card__toggle btn btn--outline btn--sm';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', details.id);
  toggle.textContent = 'More';
  details.insertAdjacentElement('afterend', toggle);

  toggle.addEventListener('click', () => {
    const willExpand = toggle.getAttribute('aria-expanded') !== 'true';

    toggle.setAttribute('aria-expanded', willExpand);
    details.hidden = !willExpand;
    toggle.textContent = willExpand ? 'Less' : 'More';
    card.classList.toggle('project-card--expanded', willExpand);
  });
});
