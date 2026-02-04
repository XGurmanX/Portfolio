(() => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll("nav a[data-path]").forEach((link) => {
    const target = link.getAttribute("data-path");
    link.setAttribute("href", target);
    if (target === path) link.classList.add("active");
  });
})();
