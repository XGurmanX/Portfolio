(() => {
  async function inject(selector, url) {
    const host = document.querySelector(selector);
    if (!host) return;
    const html = await fetch(url).then((r) => r.text());
    host.innerHTML = html;
  }

  function activateNav() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    document.querySelectorAll("nav a[data-path]").forEach((link) => {
      const target = link.getAttribute("data-path");
      link.setAttribute("href", target);
      link.classList.toggle("active", target === path);
    });
  }

  async function init() {
    await Promise.all([
      inject('[data-include="header"]', "/assets/common/header.html"),
      inject('[data-include="footer"]', "/assets/common/footer.html"),
    ]);
    activateNav();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
