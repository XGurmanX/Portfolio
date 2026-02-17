(() => {
  const INCLUDE_CACHE_VERSION = "2026-02-17";

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const cacheKey = (url) => `include:${INCLUDE_CACHE_VERSION}:${url}`;

  function getCachedInclude(url) {
    if (isLocalhost) return null;
    try {
      return window.sessionStorage.getItem(cacheKey(url));
    } catch {
      return null;
    }
  }

  function setCachedInclude(url, html) {
    if (isLocalhost) return;
    try {
      window.sessionStorage.setItem(cacheKey(url), html);
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

    const response = await fetch(url, {
      cache: isLocalhost ? "no-store" : "force-cache",
    });
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
