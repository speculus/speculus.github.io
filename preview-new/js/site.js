// PrakashGosavi.com: shared page behaviour (all pages)

// First visit on this device: show the welcome note once (18+ and responsible play)
const welcome = document.querySelector('.welcome');
if (welcome && !location.pathname.includes('/play-responsibly/')) {
  let seen = false;
  try { seen = localStorage.getItem('pg-welcome-ok') === '1'; } catch (e) {}
  const remember = () => { try { localStorage.setItem('pg-welcome-ok', '1'); } catch (e) {} };
  if (!seen) {
    welcome.showModal();
    welcome.querySelector('.welcome-ok').addEventListener('click', () => { remember(); welcome.close(); });
    welcome.querySelector('.welcome-more').addEventListener('click', remember);
    welcome.addEventListener('cancel', e => e.preventDefault());  // the button is the only way out
  }
}

// Today's date in the top bar
document.querySelectorAll('.today').forEach(el => {
  el.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
});

// Only one clip or race video plays at a time; starting one stops the others
document.addEventListener('play', e => {
  document.querySelectorAll('audio, video').forEach(m => { if (m !== e.target) m.pause(); });
}, true);

// "Watch the race": show the RWITC video under the clip (loads only when asked)
document.querySelectorAll('.cbtn.watch').forEach(btn => {
  btn.addEventListener('click', () => {
    const box = btn.closest('.clip').querySelector('.clip-video');
    const vid = box.querySelector('video');
    const open = box.hidden;
    box.hidden = !open;
    btn.setAttribute('aria-expanded', open);
    btn.innerHTML = open ? '&#10005; Hide the race' : '&#9654; Watch the race';
    if (open) { if (!vid.src) vid.src = btn.dataset.video; vid.play().catch(() => {}); }
    else vid.pause();
  });
});

// "Full result": IndiaRace result in a pop-up on this page
const dlg = document.querySelector('.result-dialog');
if (dlg) {
  const frame = dlg.querySelector('iframe');
  document.querySelectorAll('.cbtn.result').forEach(btn => btn.addEventListener('click', () => {
    frame.src = btn.dataset.src;
    dlg.querySelector('.rd-title').textContent = btn.dataset.title;
    dlg.showModal();
  }));
  dlg.querySelector('.rd-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { frame.src = 'about:blank'; });
}

// Menu bar: show the small name + picture once the big masthead has scrolled away
const navBar = document.querySelector('nav.main');
const masthead = document.querySelector('.masthead');
if (navBar && masthead) {
  new IntersectionObserver(([en]) => navBar.classList.toggle('stuck', !en.isIntersecting)).observe(masthead);
}

// Menu: highlight the section on screen (home page) or the current page
const links = [...document.querySelectorAll('nav.main ul a')];
const here = links.filter(a => a.pathname === location.pathname && a.hash);
if (here.length) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.toggle('on', a.pathname === location.pathname && a.hash === '#' + en.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  here.forEach(a => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });
}

// Contact forms -> Web3Forms (free); messages go to info@PrakashGosavi.com
document.querySelectorAll('.contact-form').forEach(form => {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.botcheck && form.botcheck.checked) return;
    status.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
      .then(r => r.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Error');
        form.reset();
        status.textContent = 'Thanks for your interest! Our representative will soon contact you.';
      })
      .catch(() => {
        status.innerHTML = 'Sorry, something went wrong. Please email us at <a href="mailto:info@PrakashGosavi.com">info@PrakashGosavi.com</a>.';
      });
  });
});
