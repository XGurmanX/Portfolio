(() => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll("nav a[data-path]").forEach((link) => {
    const target = link.getAttribute("data-path");
    if (target === path) {
      link.classList.add("active");
      link.setAttribute("href", target);
    } else {
      link.setAttribute("href", target);
    }
  });
})();
