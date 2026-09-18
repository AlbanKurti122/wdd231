const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

const levelNames = {
    1: "Member",
    2: "Silver Member",
    3: "Gold Member"
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        membersContainer.innerHTML = `
            <p class="error">Sorry, the member directory could not be loaded. Please try again.</p>
        `;
        console.error("Member data error:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "member-card";

        const websiteName = member.website
            .replace(/^https?:\/\//, "")
            .replace(/^www\./, "")
            .replace(/\/$/, "");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="95">
            <h2>${member.name}</h2>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">${websiteName}</a></p>
            <p class="description">${member.description}</p>
            <span class="level">${levelNames[member.membershipLevel] ?? "Member"}</span>
        `;

        membersContainer.appendChild(card);
    });
}

function setView(view) {
    const isGrid = view === "grid";

    membersContainer.classList.toggle("grid-view", isGrid);
    membersContainer.classList.toggle("list-view", !isGrid);

    gridButton.classList.toggle("active", isGrid);
    listButton.classList.toggle("active", !isGrid);

    gridButton.setAttribute("aria-pressed", String(isGrid));
    listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

getMembers();
