const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

const billaPhotos = [
  "assets/billa-47-gallery/changes-final.jpeg",
  "assets/billa-47-gallery/img_0026.jpg",
  "assets/billa-47-gallery/img_0258.jpg",
  "assets/billa-47-gallery/img_0261.jpg",
  "assets/billa-47-gallery/img_0262.jpg",
  "assets/billa-47-gallery/img_0265.jpg",
  "assets/billa-47-gallery/img_0278.jpg",
  "assets/billa-47-gallery/img_0307.jpg",
  "assets/billa-47-gallery/img_0308.jpg",
  "assets/billa-47-gallery/img_0494.jpg",
  "assets/billa-47-gallery/img_0748.jpg",
  "assets/billa-47-gallery/img_2591.jpg",
  "assets/billa-47-gallery/img_2595.jpg",
  "assets/billa-47-gallery/img_2746.jpg",
  "assets/billa-47-gallery/img_4094.jpg",
  "assets/billa-47-gallery/img_4096.jpg",
  "assets/billa-47-gallery/img_4098.jpg",
  "assets/billa-47-gallery/img_4104.jpg",
  "assets/billa-47-gallery/img_4634.jpg",
  "assets/billa-47-gallery/img_4880.jpg",
  "assets/billa-47-gallery/img_4929.jpg",
  "assets/billa-47-gallery/img_5595.jpg",
  "assets/billa-47-gallery/img_5596.jpg",
  "assets/billa-47-gallery/img_5833.jpg",
  "assets/billa-47-gallery/img_5965.jpg",
  "assets/billa-47-gallery/img_6271.jpg",
  "assets/billa-47-gallery/img_6462.jpg",
  "assets/billa-47-gallery/img_6481.jpg",
  "assets/billa-47-gallery/img_6845.jpg",
  "assets/billa-47-gallery/img_6955.jpg",
  "assets/billa-47-gallery/img_7069.jpg",
  "assets/billa-47-gallery/img_7388.jpg",
  "assets/billa-47-gallery/img_8372.jpg",
  "assets/billa-47-gallery/img_8376.jpg",
  "assets/billa-47-gallery/img_8454.jpg",
  "assets/billa-47-gallery/img_9057.jpg",
  "assets/billa-47-gallery/img_9138.jpg",
  "assets/billa-47-gallery/img_9139.jpg",
  "assets/billa-47-gallery/img_9140.jpg",
  "assets/billa-47-gallery/img_9173.jpg",
  "assets/billa-47-gallery/img_9949.jpg",
  "assets/billa-47-gallery/main-photo.jpg",
];

const shufflePhotos = (photos) => {
  const shuffled = [...photos];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const sliderOrbit = document.querySelector("[data-slider-orbit]");
const sliderCount = document.querySelector("[data-slider-count]");

if (sliderOrbit) {
  const sliderPhotos = shufflePhotos(billaPhotos);
  const slides = sliderPhotos.map((src, index) => {
    const slide = document.createElement("figure");
    slide.className = "slider-photo";
    slide.dataset.index = String(index + 1).padStart(2, "0");

    const img = document.createElement("img");
    img.src = src;
    img.alt = `BG cinematics archive photo ${index + 1}`;
    img.loading = index < 6 ? "eager" : "lazy";

    slide.appendChild(img);
    sliderOrbit.appendChild(slide);
    return slide;
  });

  let active = 0;
  const classes = ["is-active", "is-next", "is-prev", "is-far-next", "is-far-prev"];

  const renderSlider = () => {
    slides.forEach((slide, index) => {
      slide.classList.remove(...classes);
      const forward = (index - active + slides.length) % slides.length;
      const backward = (active - index + slides.length) % slides.length;

      if (index === active) slide.classList.add("is-active");
      else if (forward === 1) slide.classList.add("is-next");
      else if (backward === 1) slide.classList.add("is-prev");
      else if (forward === 2) slide.classList.add("is-far-next");
      else if (backward === 2) slide.classList.add("is-far-prev");
    });

    if (sliderCount) {
      sliderCount.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }
  };

  renderSlider();
  setInterval(() => {
    active = (active + 1) % slides.length;
    renderSlider();
  }, 1800);
}

const cinematicGallery = document.querySelector("[data-cinematic-gallery]");

if (cinematicGallery) {
  const tileStyles = ["feature", "tall", "wide", "compact", "tall", "compact", "wide", "compact"];

  billaPhotos.forEach((src, index) => {
    const item = document.createElement("figure");
    item.className = `cinematic-tile ${tileStyles[index % tileStyles.length]}`;

    const img = document.createElement("img");
    img.src = src;
    img.alt = `BG cinematic archive ${index + 1}`;
    img.loading = index < 8 ? "eager" : "lazy";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>Archive Frame</strong>`;

    item.append(img, caption);
    cinematicGallery.appendChild(item);
  });
}

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (!button) return;
    const original = button.textContent;
    button.textContent = "Message Ready";
    setTimeout(() => {
      button.textContent = original;
    }, 1800);
  });
});

const mediaInput = document.querySelector(".media-input");
const mediaGrid = document.querySelector(".media-grid");
const clearMedia = document.querySelector(".clear-media");

if (mediaInput && mediaGrid) {
  const defaultMediaMarkup = mediaGrid.innerHTML;

  mediaInput.addEventListener("change", () => {
    const files = Array.from(mediaInput.files || []);
    if (!files.length) return;

    mediaGrid.innerHTML = "";
    files.forEach((file, index) => {
      const item = document.createElement("article");
      item.className = "media-item";

      const count = document.createElement("span");
      count.textContent = String(index + 1).padStart(2, "0");

      const preview = file.type.startsWith("video/")
        ? document.createElement("video")
        : document.createElement("img");

      preview.src = URL.createObjectURL(file);
      preview.alt = file.name;
      if (preview instanceof HTMLVideoElement) {
        preview.controls = true;
      }

      const title = document.createElement("h3");
      title.textContent = file.name;

      const meta = document.createElement("p");
      meta.textContent = `${file.type || "Media file"} | ${(file.size / 1024 / 1024).toFixed(2)} MB`;

      item.append(count, preview, title, meta);
      mediaGrid.appendChild(item);
    });
  });

  if (clearMedia) {
    clearMedia.addEventListener("click", () => {
      mediaInput.value = "";
      mediaGrid.innerHTML = defaultMediaMarkup;
    });
  }
}
