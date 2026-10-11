const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');
function closeNav() {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeNav();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeNav();
});
const desktop = window.matchMedia('(min-width: 761px)');
desktop.addEventListener('change', closeNav);
document.getElementById('year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveals.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => reveals.observe(element));
  reducedMotion.addEventListener('change', event => {
    if (event.matches) document.body.classList.remove('motion-ready');
  });
}

const progress = document.querySelector('.scroll-progress');
let scheduled = false;
function updateScroll() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0})`;
  const position = window.scrollY + 160;
  let active = '';
  document.querySelectorAll('main section[id]').forEach(section => {
    if (section.offsetTop <= position) active = section.id;
  });
  nav.querySelectorAll('a').forEach(link => {
    const current = link.getAttribute('href') === `#${active}`;
    link.classList.toggle('active', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateScroll);
  }
}, { passive: true });
window.addEventListener('resize', updateScroll);
window.addEventListener('load', updateScroll);
updateScroll();
