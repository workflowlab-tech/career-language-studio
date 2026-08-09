// Career Language Studio — shared site behavior (mobile nav + active link)

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu");
  const nav = document.querySelector("header nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("header nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
});
