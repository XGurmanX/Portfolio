(() => {
  const host = document.querySelector("[data-photo-gallery]");
  if (!host) return;

  const candidatePhotos = Array.from({ length: 40 }, (_, index) => ({
    src: `/assets/images/photography/photo${index + 1}.jpg`,
    alt: `Photography image ${index + 1}`
  }));
  let photos = [];

  let currentIndex = 0;
  let autoRotateTimer = null;
  let isAnimating = false;

  function createCarouselMarkup() {
    host.innerHTML = `
      <div class="photo-carousel">
        <div class="photo-main">
          <div class="photo-image-link">
            <img class="photo-image" alt="Photography image" />
          </div>
          <p class="photo-caption"></p>
        </div>
        <div class="photo-controls">
          <button type="button" class="photo-nav" data-dir="-1">Prev</button>
          <span class="photo-indicator"></span>
          <button type="button" class="photo-nav" data-dir="1">Next</button>
        </div>
        <div class="photo-thumbs"></div>
      </div>
    `;
  }

  function renderThumbs() {
    const thumbsRoot = host.querySelector(".photo-thumbs");
    thumbsRoot.innerHTML = "";

    photos.forEach((photo, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "photo-thumb";
      if (index === currentIndex) button.classList.add("active");
      button.setAttribute("aria-label", `View photo ${index + 1}`);
      button.innerHTML = `<img src="${photo.src}" alt="Thumbnail ${index + 1}" loading="lazy" />`;
      button.addEventListener("click", () => {
        if (index === currentIndex) return;
        const direction = index < currentIndex ? -1 : 1;
        currentIndex = index;
        renderCurrent(true, direction);
        restartAutoRotate();
      });
      thumbsRoot.appendChild(button);
    });
  }

  function renderCurrent(animate = false, direction = 1) {
    if (!photos.length) return;

    const current = photos[currentIndex];
    const image = host.querySelector(".photo-image");
    const frame = host.querySelector(".photo-image-link");
    const caption = host.querySelector(".photo-caption");
    const indicator = host.querySelector(".photo-indicator");
    const thumbs = host.querySelectorAll(".photo-thumb");

    const applyCurrentImage = () => {
      image.src = current.src;
      image.alt = current.alt;
      frame.classList.toggle("is-portrait", current.orientation === "portrait");
      frame.classList.toggle("is-landscape", current.orientation !== "portrait");
    };

    if (animate && image.getAttribute("src")) {
      if (isAnimating) return;
      isAnimating = true;

      image.classList.remove("is-entering", "is-entering-reverse", "is-exiting", "is-exiting-reverse");
      image.classList.add(direction < 0 ? "is-exiting-reverse" : "is-exiting");

      window.setTimeout(() => {
        applyCurrentImage();
        image.classList.remove("is-exiting", "is-exiting-reverse");
        image.classList.add(direction < 0 ? "is-entering-reverse" : "is-entering");

        window.setTimeout(() => {
          image.classList.remove("is-entering", "is-entering-reverse");
          isAnimating = false;
        }, 250);
      }, 170);
    } else {
      applyCurrentImage();
    }

    caption.textContent = `Photo ${currentIndex + 1} of ${photos.length}`;
    indicator.textContent = `${currentIndex + 1} / ${photos.length}`;

    thumbs.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentIndex);
    });
  }

  function step(delta) {
    if (!photos.length) return;
    if (isAnimating) return;
    currentIndex = (currentIndex + delta + photos.length) % photos.length;
    renderCurrent(true, delta);
  }

  function restartAutoRotate() {
    if (autoRotateTimer) window.clearInterval(autoRotateTimer);
    autoRotateTimer = window.setInterval(() => step(1), 5000);
  }

  function bindControls() {
    host.querySelectorAll(".photo-nav").forEach((button) => {
      button.addEventListener("click", () => {
        const delta = Number(button.dataset.dir || "1");
        step(delta);
        restartAutoRotate();
      });
    });
  }

  function resolvePhoto(src, alt) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () =>
        resolve({
          src,
          alt,
          orientation:
            image.naturalHeight > image.naturalWidth ? "portrait" : "landscape"
        });
      image.onerror = () => resolve(null);
      image.src = src;
    });
  }

  async function init() {
    const resolvedPhotos = await Promise.all(
      candidatePhotos.map((photo) => resolvePhoto(photo.src, photo.alt))
    );
    photos = resolvedPhotos.filter(Boolean);

    if (!photos.length) {
      host.innerHTML = `<p class="photo-status">Add photos in /public/assets/images/photography (photo1.jpg, photo2.jpg, and so on).</p>`;
      return;
    }

    createCarouselMarkup();
    renderThumbs();
    bindControls();
    renderCurrent();
    restartAutoRotate();
  }

  init();
})();
