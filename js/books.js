// Career Language Studio — Recommended Books + Study Tools.
// Renders from data/books.json, sourced from real, verified Shopee PH
// listings (see research/ in the repo for the sourcing trail). Edition
// (Official/Reprint) is taken directly from the research and never altered
// here — a reprint is never presented as an official edition.

function bookCoverInitials(title) {
  return title.split(/\s+/).slice(0, 2).join(" ");
}

function priceLabel(price) {
  if (!price) return "";
  if (price.includes("-")) {
    const [lo, hi] = price.split("-");
    return `₱${lo} – ₱${hi}`;
  }
  return `₱${price}`;
}

function bookCoverHtml(book) {
  if (book.image) {
    return `<img class="book-cover-image" src="${book.image}" alt="${book.title} cover" loading="lazy" onerror="this.outerHTML='<div class=&quot;book-cover&quot;>${bookCoverInitials(book.title)}</div>'">`;
  }
  return `<div class="book-cover">${bookCoverInitials(book.title)}</div>`;
}

function bookCardHtml(book) {
  return `
    <article class="card book-card" id="${book.id}">
      ${bookCoverHtml(book)}
      <h3>${book.title}</h3>
      <div class="resource-meta"><span class="pill">${book.language}</span><span class="pill">${book.level}</span></div>
      ${book.author ? `<p class="muted">By ${book.author}.</p>` : ""}
      <p><strong>Price:</strong> ${priceLabel(book.price)}</p>
      <a class="btn secondary" href="${book.affiliateUrl || book.originalUrl}" target="_blank" rel="noopener noreferrer sponsored">View on Shopee →</a>
    </article>
  `;
}

function toolCardHtml(tool) {
  return `
    <article class="card resource-card" id="${tool.id}">
      <div class="resource-top"><span class="tag">Study Tool</span></div>
      <h3>${tool.name}</h3>
      <p class="muted">${tool.freeOrPaid}</p>
      <a class="btn secondary" href="${tool.url}" target="_blank" rel="noopener noreferrer">Visit →</a>
    </article>
  `;
}

function renderBookGroup(containerId, books) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = books.map(bookCardHtml).join("");
}

async function initBooks() {
  let data;
  try {
    const res = await fetch("data/books.json");
    data = await res.json();
  } catch (e) {
    return;
  }

  const updatedEl = document.getElementById("booksUpdatedAt");
  if (updatedEl && data.updatedAt) {
    updatedEl.textContent = `Book listings last checked: ${data.updatedAt}`;
  }

  const byGroup = {
    "japanese-official-books": [],
    "japanese-reprint-books": [],
    "korean-official-books": [],
    "korean-reprint-books": [],
  };
  data.books.forEach(book => {
    const key = `${book.language.toLowerCase()}-${book.edition.toLowerCase()}-books`;
    if (byGroup[key]) byGroup[key].push(book);
  });
  Object.entries(byGroup).forEach(([id, books]) => renderBookGroup(id, books));

  const toolsEl = document.getElementById("studyToolsGrid");
  if (toolsEl) {
    toolsEl.innerHTML = data.studyTools.map(toolCardHtml).join("");
  }
}

initBooks();
