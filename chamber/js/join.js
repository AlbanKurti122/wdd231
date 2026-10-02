console.log("join.js u ngarkua me sukses!");
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");
const timestamp = document.querySelector("#timestamp");

function setupNavigation() {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

function setTimestamp() {
  timestamp.value = new Date().toISOString();
}

function setupModals() {
  document.querySelectorAll(".modal-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById(link.dataset.modal);
      modal.showModal();
    });
  });

  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog").close();
    });
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
}

function setFooter() {
  document.querySelector("#current-year").textContent = new Date().getFullYear();
  document.querySelector("#last-modified").textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  setTimestamp();
  setupNavigation();
  setupModals();
  setFooter();
});
