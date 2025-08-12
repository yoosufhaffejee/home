const apps = [
  {
    title: "Half A Minute",
    desc: "A fast-paced word guessing party game for friends and family.",
    link: "https://yoosufhaffejee.github.io/HalfAMinute/",
    img: "https://placehold.co/96x96/00bcd4/fff?text=🕑",
    icon: "🕑"
  },
  {
    title: "Open FPL Insights",
    desc: "Fantasy Premier League analytics and insights platform.",
    link: "https://yoosufhaffejee.github.io/Open-FPL-Insights/",
    img: "https://placehold.co/96x96/43e97b/fff?text=📊",
    icon: "📊"
  },
  {
    title: "Lunar Vision",
    desc: "A moon phase and astronomy visualization web app.",
    link: "https://yoosufhaffejee.github.io/lunar-vision/",
    img: "https://placehold.co/96x96/6a82fb/fff?text=🌙",
    icon: "🌙"
  },
  {
    title: "Memorial Map",
    desc: "Interactive map for memorializing loved ones.",
    link: "https://yoosufhaffejee.github.io/memorial-map/",
    img: "https://placehold.co/96x96/a259f7/fff?text=🗺️",
    icon: "🗺️"
  },
  {
    title: "Snake Game",
    desc: "Classic snake game reimagined for the browser.",
    link: "https://yoosufhaffejee.github.io/snake/",
    img: "https://placehold.co/96x96/e040fb/fff?text=🐍",
    icon: "🐍"
  },
  {
    title: "Sports Tracker",
    desc: "A lightweight app for managing players, friendly matches, and community tournaments and more.",
    link: "https://yoosufhaffejee.github.io/SportsTracker/",
    img: "https://placehold.co/96x96/ff9800/fff?text=🏟️",
    icon: "🏟️"
  }
];

function createAppCard({ title, desc, link, img, icon }) {
  return `
    <div class="card">
      <img class="card-img" src="${img}" alt="${title} logo" />
      <div class="card-title"><span class="card-icon">${icon}</span>${title}</div>
      <div class="card-desc">${desc}</div>
      <a class="card-link" href="${link}" target="_blank">View</a>
    </div>
  `;
}

document.getElementById("apps-list").innerHTML = apps.map(createAppCard).join("");

// Add reveal classes to cards after injection
document.querySelectorAll('#apps-list .card').forEach(c => c.classList.add('reveal'));

// IntersectionObserver for progress bars & reveals
const ioOptions = { threshold: 0.35, rootMargin: '0px 0px -40px 0px' };
const observer = ('IntersectionObserver' in window) ? new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('bar')) {
        entry.target.classList.add('animate');
      } else if (entry.target.classList.contains('reveal')) {
        requestAnimationFrame(() => entry.target.classList.add('in'));
      }
      obs.unobserve(entry.target);
    }
  });
}, ioOptions) : null;

if (observer) {
  document.querySelectorAll('.bar').forEach(b => observer.observe(b));
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  // Expertise cards reveal
  document.querySelectorAll('.expertise-card').forEach(card => {
    card.classList.add('reveal');
    observer.observe(card);
  });
}

// Interactive hero glow tracking
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const updateGlow = (x, y) => {
    const rect = heroTitle.getBoundingClientRect();
    const gx = ((x - rect.left) / rect.width) * 100;
    const gy = ((y - rect.top) / rect.height) * 100;
    heroTitle.style.setProperty('--glow-x', gx + '%');
    heroTitle.style.setProperty('--glow-y', gy + '%');
  };
  heroTitle.addEventListener('pointermove', e => updateGlow(e.clientX, e.clientY));
  heroTitle.addEventListener('pointerleave', () => {
    heroTitle.style.setProperty('--glow-x', '50%');
    heroTitle.style.setProperty('--glow-y', '50%');
  });
}

// Ambient audio toggle
const audioEl = document.getElementById('bg-audio');
const audioBtn = document.getElementById('audio-toggle');
if (audioEl && audioBtn) {
  let userPref = localStorage.getItem('bg-audio');
  const setState = (playing) => {
    audioBtn.textContent = playing ? 'Pause Music' : 'Play Music';
    audioBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  };
  if (userPref === 'on') {
    // Try autoplay muted then unmute after gesture
    audioEl.volume = 0.55;
    audioEl.play().then(() => setState(true)).catch(()=> setState(false));
  }
  audioBtn.addEventListener('click', () => {
    if (audioEl.paused) {
      audioEl.play().then(()=> {
        localStorage.setItem('bg-audio','on');
        setState(true);
      });
    } else {
      audioEl.pause();
      localStorage.setItem('bg-audio','off');
      setState(false);
    }
  });
}

// Contact form (Formspree)
const contactForm = document.getElementById("contact-form");
const statusEl = document.getElementById("contact-status");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    // Allow native submission if fetch unsupported
    if (!window.fetch) return;
    e.preventDefault();
    statusEl.textContent = "Sending...";
    statusEl.className = "form-status sending";
    const formData = new FormData(contactForm);
    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        statusEl.textContent = "Message sent! I'll get back to you soon.";
        statusEl.className = "form-status success";
      } else {
        const data = await res.json().catch(() => ({}));
        statusEl.textContent = data.errors ? data.errors.map(e=>e.message).join(", ") : "Something went wrong. Please email me directly.";
        statusEl.className = "form-status error";
      }
    } catch (err) {
      statusEl.textContent = "Network error. Please try again later.";
      statusEl.className = "form-status error";
    }
  });
}
