(() => {
  function getCachedInclude(url) {
    try {
      return window.sessionStorage.getItem(`include:${url}`);
    } catch {
      return null;
    }
  }

  function setCachedInclude(url, html) {
    try {
      window.sessionStorage.setItem(`include:${url}`, html);
    } catch {
      // Ignore quota/security errors; this is only a best-effort optimization.
    }
  }

  async function inject(selector, url) {
    const host = document.querySelector(selector);
    if (!host) return;

    const cached = getCachedInclude(url);
    if (cached) {
      host.innerHTML = cached;
      return;
    }

    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Failed to load include: ${url}`);
    }

    const html = await response.text();
    host.innerHTML = html;
    setCachedInclude(url, html);
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
    await Promise.allSettled([
      inject('[data-include="header"]', "/assets/common/header.html"),
      inject('[data-include="footer"]', "/assets/common/footer.html"),
    ]);
    activateNav();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
