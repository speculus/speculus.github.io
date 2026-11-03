// Mobile menu, ABOUT dropdown, and contact form submission.

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.has-sub > .nav-parent').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Close the mobile menu after jumping to the contact form.
  document.querySelectorAll('.nav a[href$="#contact"]').forEach(function (a) {
    a.addEventListener('click', function () { nav && nav.classList.remove('open'); });
  });

  // Important Warning page: start the audio clips at a comfortable volume.
  document.querySelectorAll('audio.ex-audio').forEach(function (a) { a.volume = 0.45; });

  // Only one clip or race video plays at a time: starting one pauses the rest.
  var players = document.querySelectorAll('.example audio, .example video');
  players.forEach(function (p) {
    p.addEventListener('play', function () {
      players.forEach(function (other) { if (other !== p) other.pause(); });
    });
  });

  // Important Warning page: open an IndiaRace result in a pop-up on this site.
  var dialog = document.querySelector('.result-dialog');
  if (dialog) {
    var frame = dialog.querySelector('.result-dialog-frame');
    document.querySelectorAll('.ex-result-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        frame.src = btn.getAttribute('data-src');
        dialog.querySelector('.result-dialog-title').textContent = btn.getAttribute('data-title') || 'Race result';
        dialog.showModal();
      });
    });
    dialog.querySelector('.result-dialog-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { frame.src = 'about:blank'; });
  }

  // Contact form -> Web3Forms (free). Set the access key in each page's form.
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.botcheck && form.botcheck.checked) return;
    status.textContent = 'Sending…';
    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          form.reset();
          status.textContent = 'Thanks for your interest! Our representative will soon contact you.';
        } else {
          throw new Error(data.message || 'Error');
        }
      })
      .catch(function () {
        status.innerHTML = 'Sorry, something went wrong. Please email us at ' +
          '<a href="mailto:info@PrakashGosavi.com" style="color:#fff">info@PrakashGosavi.com</a>.';
      });
  });
});
