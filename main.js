(function(){
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  // Mobile menu toggle
  const btn = $('#hamburger');
  const menu = $('#mobileMenu');
  if(btn && menu){
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Active link highlight based on current page
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.links a, .mobileMenu a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === path) a.classList.add('active');
  });

  // Reveal on scroll
  const revealEls = $$('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el=> io.observe(el));
  } else {
    revealEls.forEach(el=> el.classList.add('show'));
  }

  // Events: simple filter & countdown (if present)
  const filter = $('#eventFilter');
  const rows = $$('#eventsTable tbody tr');
  const countdown = $('#countdown');
  if(filter && rows.length){
    filter.addEventListener('change', () => {
      const v = filter.value;
      rows.forEach(r => {
        const tag = r.getAttribute('data-tag');
        r.style.display = (v === 'all' || v === tag) ? '' : 'none';
      });
    });
  }

  // Countdown: finds the first upcoming event with a data-date in YYYY-MM-DD or ISO
  if(countdown){
    const upcoming = rows
      .map(r => ({ el:r, dt: new Date(r.getAttribute('data-date') || '') }))
      .filter(x => !isNaN(x.dt.getTime()))
      .sort((a,b)=> a.dt - b.dt)
      .find(x => x.dt.getTime() > Date.now());

    if(upcoming){
      const title = upcoming.el.getAttribute('data-title') || 'Next event';
      const tick = () => {
        const ms = upcoming.dt.getTime() - Date.now();
        if(ms <= 0){
          countdown.textContent = `${title} is happening now 🎉`;
          return;
        }
        const d = Math.floor(ms / (1000*60*60*24));
        const h = Math.floor((ms / (1000*60*60)) % 24);
        const m = Math.floor((ms / (1000*60)) % 60);
        countdown.textContent = `Next up: ${title} in ${d}d ${h}h ${m}m`;
        requestAnimationFrame(()=>{});
      };
      tick();
      setInterval(tick, 30000);
    } else {
      countdown.textContent = "No upcoming events added yet — check back soon!";
    }
  }

  // Join form: lightweight validation + mailto fallback
  const joinForm = $('#joinForm');
  if(joinForm){
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = ($('#name')||{}).value?.trim();
      const email = ($('#email')||{}).value?.trim();
      const interest = ($('#interest')||{}).value?.trim();
      const msg = ($('#message')||{}).value?.trim();

      const errors = [];
      if(!name) errors.push('Please enter your name.');
      if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email.');
      if(!interest) errors.push('Please pick an interest area.');

      const box = $('#formStatus');
      if(errors.length){
        if(box){
          box.textContent = errors.join(' ');
          box.style.color = 'rgba(255,255,255,.92)';
        }
        return;
      }

      // If you later connect a backend, replace this with fetch() to your endpoint.
      const subject = encodeURIComponent('UNSA Sheridan — Join Request');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${msg || '(none)'}`
      );

      // TODO: change club email address below when ready
      const clubEmail = joinForm.getAttribute('data-club-email') || 'unsa.sheridan@example.com';
      window.location.href = `mailto:${clubEmail}?subject=${subject}&body=${body}`;

      if(box){
        box.textContent = "Opening your email app to send your request…";
        box.style.color = 'rgba(183,240,255,.85)';
      }
      joinForm.reset();
    });
  }
})();
