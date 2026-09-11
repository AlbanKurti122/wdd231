const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const courseContainer = document.querySelector("#course-container");
const creditsElement = document.querySelector("#credits");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach((course) => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const title = document.createElement("h3");

        title.textContent =
            `${course.subject} ${course.number}`;

        const name = document.createElement("p");

        name.textContent = course.title;

        card.appendChild(title);
        card.appendChild(name);

        courseContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditsElement.textContent =
        `The total credits for the courses listed above is ${totalCredits}`;
}


/* =========================
   FILTER BUTTONS
========================= */

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});


document.querySelector("#wdd").addEventListener("click", () => {

    const wddCourses = courses.filter(
        (course) => course.subject === "WDD"
    );

    displayCourses(wddCourses);
});


document.querySelector("#cse").addEventListener("click", () => {

    const cseCourses = courses.filter(
        (course) => course.subject === "CSE"
    );

    displayCourses(cseCourses);
});


/* Display all courses when page loads */

displayCourses(courses);