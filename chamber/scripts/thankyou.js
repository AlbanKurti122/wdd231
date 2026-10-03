const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

function setupNavigation() {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

function addInformation(list, label, value) {
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = label;
  description.textContent = value || "Not provided";
  list.append(term, description);
}

function displayApplication() {
  const params = new URLSearchParams(window.location.search);
  const list = document.querySelector("#application-information");

  addInformation(list, "First Name", params.get("firstName"));
  addInformation(list, "Last Name", params.get("lastName"));
  addInformation(list, "Email", params.get("email"));
  addInformation(list, "Mobile Phone", params.get("phone"));
  addInformation(list, "Business / Organization", params.get("organization"));
  addInformation(list, "Application Timestamp", params.get("timestamp"));
}

function setFooter() {
  document.querySelector("#current-year").textContent = new Date().getFullYear();
  document.querySelector("#last-modified").textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  displayApplication();
  setFooter();
});
