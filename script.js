// small interactions: mobile nav toggle, year update
document.addEventListener('DOMContentLoaded', function(){
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', function(){
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if(!expanded){
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '10px';
      nav.style.top = '64px';
      nav.style.background = 'rgba(2,6,23,0.9)';
      nav.style.padding = '0.6rem';
      nav.style.borderRadius = '10px';
    } else {
      nav.style.display = '';
      nav.style.position = '';
      nav.style.background = '';
      nav.style.padding = '';
      nav.style.borderRadius = '';
    }
  });

  // set current year
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;
});
