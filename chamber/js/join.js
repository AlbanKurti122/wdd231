// Test për tu siguruar që skedari po ngarkohet
console.log("join.js u ngarkua me sukses!");

const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");
const timestamp = document.querySelector("#timestamp");

function setupNavigation() {
  if (!menuButton || !mainNav) return;
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

function setTimestamp() {
  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }
}

function setupModals() {
  document.querySelectorAll(".modal-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById(link.dataset.modal);
      if (modal) modal.showModal();
    });
  });

  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (dialog) dialog.close();
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
  const currentYearEl = document.querySelector("#current-year");
  const lastModifiedEl = document.querySelector("#last-modified");
  
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  setTimestamp();
  setupNavigation();
  setupModals();
  setFooter();
});

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });


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
