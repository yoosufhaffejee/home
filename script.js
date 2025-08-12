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

// Contact form (demo only)
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for reaching out! (Form demo only)");
  this.reset();
});
