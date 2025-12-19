/* ===============================
   Golden Galaxy — script.js (CLEAN)
================================ */

/* ---------- CANVAS BACKGROUND ---------- */
const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5,
    a: Math.random(),
  });
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s => {
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();



/* ---------- REVEAL ON SCROLL ---------- */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("active"));
});
reveals.forEach(r => observer.observe(r));

/* ---------- GOALS TAB SWITCH ---------- */
const goalTabs = document.querySelectorAll(".goal-tab");
const goalPanels = document.querySelectorAll(".goal-panel");

goalTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    goalTabs.forEach(t => t.classList.remove("active"));
    goalPanels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.goal).classList.add("active");
  });
});

/* ---------- SKILL HOVER SOUND (SAFE) ---------- */
let skillSound;

try {
  skillSound = new Audio("assets/sounds/hover.mp3");
  skillSound.volume = 0.25;

  document.querySelectorAll(".skill").forEach(skill => {
    skill.addEventListener("mouseenter", () => {
      skillSound.currentTime = 0;
      skillSound.play().catch(() => {});
    });
  });
} catch (e) {
  console.warn("Hover sound not loaded");
}


/* ---------- LIGHTBOX (SINGLE SOURCE OF TRUTH) ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

/* ---------- LIGHTBOX (SAFE) ---------- */
if (lightbox && lightboxImg) {

  document.querySelectorAll("a.lightbox-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      lightboxImg.src = link.href;
      lightbox.classList.remove("hidden");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
    });
  }

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
    }
  });
}

/* ---------- SANSKRIT TRANSLATION TOGGLE ---------- */
const translateBtn = document.getElementById("translateBtn");
const translation = document.getElementById("translation");

if (translateBtn && translation) {
  translateBtn.addEventListener("click", () => {
    translation.classList.toggle("hidden");
    translateBtn.textContent =
      translation.classList.contains("hidden")
        ? "Show Translation"
        : "Hide Translation";
  });
}

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form && status) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚫 NO PAGE RELOAD

    status.classList.add("hidden");
    status.textContent = "";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        status.textContent =
          "✨ Your message was sent successfully. I’ll reach out to you soon.";
        status.classList.remove("hidden");
        form.reset();
      } else {
        status.textContent =
          "⚠️ Something went wrong. Please try again.";
        status.classList.remove("hidden");
      }
    } catch (error) {
      status.textContent =
        "⚠️ Network error. Please try later.";
      status.classList.remove("hidden");
    }
  });
}


/* ---------- ROLE ROTATION (FORCED + SAFE) ---------- */

document.addEventListener("DOMContentLoaded", () => {

  const roles = [
    "Aspiring Game Developer",
    "Digital Artist",
    "3D Character Designer",
    "Creative Technologist",
    "Hackathon Enthusiast"
  ];

  const roleText = document.getElementById("role-text");

  if (!roleText) {
    console.error("❌ role-text element NOT found");
    return;
  }

  let roleIndex = 0;

  setInterval(() => {
    roleText.style.opacity = "0";

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.textContent = roles[roleIndex];
      roleText.style.opacity = "1";
    }, 400);

  }, 2400);

});

/* ---------- GOLDEN STAR CURSOR ---------- */

document.addEventListener("mousemove", e => {
  const star = document.createElement("div");
  star.className = "cursor-star";
  star.style.left = e.clientX + "px";
  star.style.top = e.clientY + "px";

  document.body.appendChild(star);

  setTimeout(() => star.remove(), 600);
});

