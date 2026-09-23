// Career Language Studio — progressive placement assessment engine.
// Starts at the lowest level for the chosen language and advances one level at a
// time while the learner keeps passing the threshold, stopping at the point
// comprehension breaks down. Pure client-side — no backend required.

let selectedLanguage = "";
let levels = [];
let levelIndex = 0;
let currentBatch = [];
let batchAnswers = [];
let currentQuestionInBatch = 0;
let history = []; // { category, correct }
let highestPassedLevel = null;

function belowLabel(language) {
  return language === "Japanese" ? "Below N5" : "Below TOPIK 1";
}

function chooseLanguage(card) {
  document.querySelectorAll(".language-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-pressed", "false");
  });
  card.classList.add("selected");
  card.setAttribute("aria-pressed", "true");

  selectedLanguage = card.dataset.language;
  levels = ASSESSMENT_LEVELS[selectedLanguage];
  levelIndex = 0;
  history = [];
  highestPassedLevel = null;

  document.getElementById("selectedLanguageTitle").textContent = selectedLanguage + " Assessment";
  document.getElementById("results").classList.remove("show");
  loadBatchForCurrentLevel();
  document.getElementById("how").scrollIntoView({ behavior: "smooth" });
}

function loadBatchForCurrentLevel() {
  const level = levels[levelIndex];
  currentBatch = ASSESSMENT_QUESTION_BANK[selectedLanguage].filter(q => q.level === level);
  batchAnswers = Array(currentBatch.length).fill(null);
  currentQuestionInBatch = 0;
  renderLevelSteps();
  renderQuestions();
}

function renderLevelSteps() {
  const stepsEl = document.querySelector(".steps");
  if (!stepsEl) return;
  stepsEl.innerHTML = levels.map((lvl, i) => {
    let cls = "step";
    if (i < levelIndex) cls += " passed";
    if (i === levelIndex) cls += " active";
    return `<span class="${cls}">${lvl}</span>`;
  }).join("");
}

function renderQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = "";
  currentBatch.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "question" + (i === currentQuestionInBatch ? " active" : "");
    div.innerHTML = `<h3>${item.q}</h3><div class="options">${item.options.map((op, j) =>
      `<button class="option ${batchAnswers[i] === j ? "selected" : ""}" type="button" data-index="${i}" data-option="${j}">${String.fromCharCode(65 + j)}. ${op}</button>`
    ).join("")}</div>`;
    container.appendChild(div);
  });
  container.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => selectOption(Number(btn.dataset.index), Number(btn.dataset.option)));
  });
  updateQuestionUI();
}

function updateQuestionUI() {
  const item = currentBatch[currentQuestionInBatch];
  document.getElementById("questionSkill").textContent = `${item.level} · ${item.category}`;
  document.getElementById("questionCounter").textContent = `Question ${currentQuestionInBatch + 1} of ${currentBatch.length}`;
  document.getElementById("progressBar").style.width = `${((currentQuestionInBatch + 1) / currentBatch.length) * 100}%`;
  document.getElementById("prevBtn").style.visibility = currentQuestionInBatch === 0 ? "hidden" : "visible";
  const isLastQuestionOverall = currentQuestionInBatch === currentBatch.length - 1;
  document.getElementById("nextBtn").textContent = isLastQuestionOverall ? "Continue →" : "Next →";
}

function selectOption(i, j) {
  batchAnswers[i] = j;
  renderQuestions();
}

function nextQuestion() {
  if (!selectedLanguage) {
    alert("Please choose a language first.");
    document.getElementById("choose").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (batchAnswers[currentQuestionInBatch] === null) {
    alert("Please choose an answer before continuing.");
    return;
  }
  if (currentQuestionInBatch < currentBatch.length - 1) {
    currentQuestionInBatch++;
    renderQuestions();
    return;
  }
  finishBatch();
}

function prevQuestion() {
  if (currentQuestionInBatch > 0) {
    currentQuestionInBatch--;
    renderQuestions();
  }
}

function finishBatch() {
  currentBatch.forEach((item, i) => {
    history.push({ category: item.category, correct: batchAnswers[i] === item.answer });
  });

  const correctCount = currentBatch.filter((item, i) => batchAnswers[i] === item.answer).length;
  const score = correctCount / currentBatch.length;
  const passed = score >= ASSESSMENT_PASS_THRESHOLD;

  if (passed) {
    highestPassedLevel = levels[levelIndex];
  }

  const hasNextLevel = levelIndex < levels.length - 1;
  if (passed && hasNextLevel) {
    levelIndex++;
    loadBatchForCurrentLevel();
  } else {
    showResults();
  }
}

function categoryPercent(category) {
  const items = history.filter(h => h.category === category);
  if (items.length === 0) return null;
  const correct = items.filter(h => h.correct).length;
  return Math.round((correct / items.length) * 100);
}

function showResults() {
  const estimatedLevel = highestPassedLevel || belowLabel(selectedLanguage);
  const rangeLabel = selectedLanguage === "Japanese" ? "Estimated JLPT Range" : "Estimated TOPIK Range";

  document.getElementById("resultLanguage").textContent = selectedLanguage.toUpperCase();
  document.getElementById("resultRangeLabel").textContent = rangeLabel;
  document.getElementById("levelNumber").textContent = estimatedLevel;

  const categories = ["Grammar", "Vocabulary", "Reading", "Workplace Language"];
  const scores = categories.map(cat => ({ cat, pct: categoryPercent(cat) }));

  document.getElementById("grammarScore").textContent = scores[0].pct === null ? "—" : scores[0].pct + "%";
  document.getElementById("vocabularyScore").textContent = scores[1].pct === null ? "—" : scores[1].pct + "%";
  document.getElementById("readingScore").textContent = scores[2].pct === null ? "—" : scores[2].pct + "%";
  document.getElementById("workplaceScore").textContent = scores[3].pct === null ? "—" : scores[3].pct + "%";

  const scored = scores.filter(s => s.pct !== null);
  const sorted = [...scored].sort((a, b) => b.pct - a.pct);

  if (sorted.length > 0) {
    document.getElementById("strengthsText").textContent =
      `Your strongest area is ${sorted[0].cat} (${sorted[0].pct}%). This is where you show the most consistent, reliable comprehension.`;
    document.getElementById("improveText").textContent =
      `Your main area to build up is ${sorted[sorted.length - 1].cat} (${sorted[sorted.length - 1].pct}%). Focus your next study sessions here.`;
  }

  document.getElementById("nextStepText").textContent =
    `Based on this placement estimate, continue with ${estimatedLevel}-appropriate ${selectedLanguage} materials. Reassess after 2–4 weeks of consistent, focused practice.`;

  const resourceList = document.getElementById("recommendedResources");
  const recs = (ASSESSMENT_RESOURCE_MAP[selectedLanguage] && ASSESSMENT_RESOURCE_MAP[selectedLanguage][estimatedLevel]) || [];
  resourceList.innerHTML = recs.map(r => `<li><a href="resources.html#${r.id}">${r.title} →</a></li>`).join("") ||
    `<li><a href="resources.html">Browse all Resources →</a></li>`;

  document.getElementById("results").classList.add("show");
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("prevBtn").addEventListener("click", prevQuestion);

document.querySelectorAll(".language-card").forEach(card => {
  card.addEventListener("click", () => chooseLanguage(card));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      chooseLanguage(card);
    }
  });
});
