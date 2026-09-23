// Career Language Studio — Career Hub job board.
// Renders job cards from data/jobs.json, a file the daily Job Radar routine
// (a scheduled cloud agent, not n8n) updates with verified, dated listings.
// Demo entries (demo:true) are illustrative placeholders and are never
// touched by the routine.

const LOGO_INITIALS = { Korean: "KO", Japanese: "JP" };

function fieldOrNotSpecified(value) {
  return value && value.trim() ? value : "Not specified";
}

function jobCardHtml(job) {
  const logo = LOGO_INITIALS[job.language] || job.language.slice(0, 2).toUpperCase();
  const badge = job.demo
    ? `<span class="tag demo">DEMO LISTING</span>`
    : `<span class="tag verified">VERIFIED LISTING</span>`;

  const infoLines = [
    `📍 ${job.location || "Location not specified"}`,
    `💼 ${job.setup || "Not specified"}`,
    `🎓 Language level: ${fieldOrNotSpecified(job.requiredLevel)}`,
    job.salary ? `💰 ${job.salary}` : null,
    `🔗 Source: ${job.source || "Unknown"}`,
    job.datePosted ? `📅 Posted: ${job.datePosted}` : null
  ].filter(Boolean).join("<br>");

  return `
    <article class="card job"
      data-title="${job.title}"
      data-company="${job.company}"
      data-language="${job.language}"
      data-category="${job.category}"
      data-setup="${job.setup}"
      data-location="${job.location}"
      data-source="${job.source}"
      data-original-url="${job.originalUrl || "#"}">
      <div class="job-top"><div class="logo">${logo}</div>${badge}</div>
      <div class="meta"><span class="pill">${job.language}</span><span class="pill">${job.category}</span><span class="pill">${job.setup}</span></div>
      <h3>${job.title}</h3>
      <p class="muted"><strong>${job.company}</strong></p>
      <p>${infoLines}</p>
      ${job.demo ? `<p class="muted">Placeholder only. Replace with a verified current listing before public launch.</p>` : ""}
      <div class="job-actions">
        <a class="btn primary job-link" href="#">View Original Job →</a>
      </div>
    </article>
  `;
}

function configureJobLinks() {
  document.querySelectorAll(".job").forEach(card => {
    const link = card.querySelector(".job-link");
    const url = card.dataset.originalUrl || "#";
    link.href = url;
    if (url === "#") {
      link.addEventListener("click", e => {
        e.preventDefault();
        alert("Demo listing only. Not a real job posting.");
      });
    } else {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function filterJobs() {
  const q = document.getElementById("keyword").value.trim().toLowerCase();
  const language = document.getElementById("language").value.toLowerCase();
  const category = document.getElementById("category").value.toLowerCase();
  const setup = document.getElementById("setup").value.toLowerCase();

  let visible = 0;

  document.querySelectorAll(".job").forEach(card => {
    const hay = [
      card.dataset.title, card.dataset.company, card.dataset.language,
      card.dataset.category, card.dataset.setup, card.dataset.location, card.dataset.source
    ].join(" ").toLowerCase();

    const okQ = !q || hay.includes(q);
    const okL = !language || card.dataset.language.toLowerCase() === language;
    const okC = !category || card.dataset.category.toLowerCase() === category;
    const okS = !setup || card.dataset.setup.toLowerCase() === setup;
    const show = okQ && okL && okC && okS;

    card.style.display = show ? "block" : "none";
    if (show) visible++;
  });

  document.getElementById("emptyState").style.display = visible ? "none" : "block";
}

function quickFilter(language, category, setup) {
  document.getElementById("language").value = language || "";
  document.getElementById("category").value = category || "";
  document.getElementById("setup").value = setup || "";
  document.getElementById("keyword").value = "";
  filterJobs();
  document.getElementById("jobs").scrollIntoView({ behavior: "smooth" });
}

async function initJobBoard() {
  const grid = document.getElementById("jobGrid");
  let data;
  try {
    const res = await fetch("data/jobs.json");
    data = await res.json();
  } catch (e) {
    grid.innerHTML = `<p class="muted">Job listings couldn't be loaded right now. Please refresh the page.</p>`;
    return;
  }

  grid.innerHTML = data.jobs.map(jobCardHtml).join("");

  const updatedEl = document.getElementById("jobsUpdatedAt");
  if (updatedEl && data.updatedAt) {
    updatedEl.textContent = `Job board last checked: ${data.updatedAt}`;
  }

  configureJobLinks();

  document.getElementById("keyword").addEventListener("input", filterJobs);
  document.getElementById("language").addEventListener("change", filterJobs);
  document.getElementById("category").addEventListener("change", filterJobs);
  document.getElementById("setup").addEventListener("change", filterJobs);
  document.getElementById("searchBtn").addEventListener("click", filterJobs);
  document.querySelectorAll(".quick button").forEach(btn => {
    btn.addEventListener("click", () => quickFilter(btn.dataset.language, btn.dataset.category, btn.dataset.setup));
  });

  filterJobs();
}

initJobBoard();
