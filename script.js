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
