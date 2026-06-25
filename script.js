const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const bookCards = document.querySelectorAll(".book-card");
const bookSearch = document.querySelector("#bookSearch");
const galleryItems = document.querySelectorAll(".gallery-item");
const dialog = document.querySelector(".image-dialog");

function updateBookCards() {
  const activeFilter = document.querySelector(".filter-button.active")?.dataset.filter || "all";
  const searchTerm = bookSearch.value.trim().toLowerCase();

  bookCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const text = `${card.dataset.title} ${card.textContent}`.toLowerCase();
    const matchesSearch = !searchTerm || text.includes(searchTerm);
    card.hidden = !(matchesFilter && matchesSearch);
  });
}

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateBookCards();
  });
});

bookSearch.addEventListener("input", updateBookCards);

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    const dialogImage = dialog.querySelector("img");
    const caption = dialog.querySelector("p");

    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    caption.textContent = item.dataset.caption;
    dialog.showModal();
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
