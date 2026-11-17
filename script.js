// NEXORA 2027 - JAVASCRIPT

// 1. EVENT DATA
const events = [
    {
        id: 1,
        name: "CodeStorm",
        category: "hackathon",
        status: "upcoming",
        date: "15 January 2027",
        time: "09:00 AM - 06:00 PM",
        venue: "Innovation Hub",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900",
        description: "An intense coding challenge where creative minds collaborate to build innovative solutions."
    },
    {
        id: 2,
        name: "RoboRift",
        category: "robotics",
        status: "upcoming",
        date: "15 January 2027",
        time: "10:00 AM - 04:00 PM",
        venue: "Robotics Arena",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900",
        description: "Explore robotics, automation and engineering through exciting challenges."
    },
    {
        id: 3,
        name: "VisionX Summit",
        category: "conference",
        status: "upcoming",
        date: "16 January 2027",
        time: "11:00 AM - 02:00 PM",
        venue: "Main Auditorium",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900",
        description: "An engaging conference featuring discussions on technology, innovation and the future."
    },
    {
        id: 4,
        name: "PixelPitch",
        category: "poster",
        status: "upcoming",
        date: "16 January 2027",
        time: "10:00 AM - 01:00 PM",
        venue: "Exhibition Hall",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900",
        description: "Present your creative ideas and communicate them through impactful visual designs."
    },
    {
        id: 5,
        name: "BuildLab",
        category: "workshop",
        status: "ongoing",
        date: "17 January 2027",
        time: "10:00 AM - 03:00 PM",
        venue: "Technology Block",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900",
        description: "A practical workshop focused on experimenting, building and learning new skills."
    },
    {
        id: 6,
        name: "Echoes",
        category: "cultural",
        status: "upcoming",
        date: "17 January 2027",
        time: "04:00 PM - 08:00 PM",
        venue: "Open Air Stage",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900",
        description: "Celebrate music, dance and artistic expression in a vibrant cultural showcase."
    },
    {
        id: 7,
        name: "ArenaX",
        category: "sports",
        status: "upcoming",
        date: "15 January 2027",
        time: "08:00 AM - 12:00 PM",
        venue: "Sports Ground",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900",
        description: "Experience the excitement of sports, competition and teamwork."
    },
    {
        id: 8,
        name: "InnovateX",
        category: "exhibition",
        status: "upcoming",
        date: "16 January 2027",
        time: "02:00 PM - 05:00 PM",
        venue: "Exhibition Centre",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
        description: "Discover innovative student projects, prototypes and creative ideas."
    }
];


// 2. ELEMENTS
const eventGrid = document.getElementById("eventGrid");
const featuredGrid = document.getElementById("featuredGrid");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const noResults = document.getElementById("noResults");

let activeCategory = "all";


// 3. CREATE EVENT CARD
function createCard(event, featured = false) {

    return `
        <article class="${featured ? 'featured-card' : 'event-card'}">

            <div class="card-image">
                <img src="${event.image}" alt="${event.name}"
                     loading="lazy">

                <span class="card-status ${event.status}">
                    ${event.status}
                </span>
            </div>

            <div class="card-content">

                <p class="card-category">
                    ${event.category.toUpperCase()}
                </p>

                <h3>${event.name}</h3>

                <p class="card-date">${event.date}</p>

                <p class="card-description">
                    ${event.description}
                </p>

                <button class="card-link" data-id="${event.id}">
                    EXPLORE EVENT ↗
                </button>

            </div>

        </article>
    `;
}


// 4. DISPLAY ALL EVENTS
function displayEvents() {

    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredEvents = events.filter(event => {

        const categoryMatch =
            activeCategory === "all" ||
            event.category === activeCategory;

        const searchMatch =
            event.name.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText);

        const statusMatch =
            selectedStatus === "all" ||
            event.status === selectedStatus;

        return categoryMatch && searchMatch && statusMatch;

    });

    eventGrid.innerHTML = filteredEvents
        .map(event => createCard(event))
        .join("");

    noResults.style.display =
        filteredEvents.length === 0 ? "block" : "none";
}


// 5. FEATURED EVENTS
function displayFeatured() {

    const featuredEvents = events.slice(0, 3);

    featuredGrid.innerHTML = featuredEvents
        .map(event => createCard(event, true))
        .join("");
}


// 6. CATEGORY FILTER
document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        activeCategory = button.dataset.category;

        displayEvents();

    });

});


// 7. SEARCH AND STATUS FILTER
searchInput.addEventListener("input", displayEvents);
statusFilter.addEventListener("change", displayEvents);


// 8. EVENT DETAILS MODAL
const modal = document.getElementById("eventModal");

function openEvent(id) {

    const event = events.find(item => item.id === Number(id));

    if (!event) return;

    document.getElementById("modalCategory").textContent =
        event.category.toUpperCase();

    document.getElementById("modalTitle").textContent =
        event.name;

    document.getElementById("modalDescription").textContent =
        event.description;

    document.getElementById("modalDate").textContent =
        event.date;

    document.getElementById("modalTime").textContent =
        event.time;

    document.getElementById("modalVenue").textContent =
        event.venue;

    document.getElementById("modalStatus").textContent =
        event.status.toUpperCase();

    document.getElementById("eventChoice").value = event.name;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

}

function closeModal() {

    modal.classList.remove("show");
    document.body.style.overflow = "";

}

document.addEventListener("click", function(e) {

    const button = e.target.closest(".card-link");

    if (button) {
        openEvent(button.dataset.id);
    }

});

document.getElementById("modalClose")
    .addEventListener("click", closeModal);

modal.addEventListener("click", function(e) {

    if (e.target === modal) closeModal();

});

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") closeModal();

});

document.getElementById("modalRegister")
    .addEventListener("click", closeModal);


// 9. EVENT DROPDOWN
const eventChoice = document.getElementById("eventChoice");

events.forEach(event => {

    const option = document.createElement("option");

    option.value = event.name;
    option.textContent = event.name;

    eventChoice.appendChild(option);

});


// 10. SCHEDULE DATA
const schedule = {

    1: [
        ["09:00 AM", "Opening Ceremony", "Main Auditorium"],
        ["10:00 AM", "CodeStorm", "Innovation Hub"],
        ["11:00 AM", "RoboRift", "Robotics Arena"],
        ["02:00 PM", "Creative Challenges", "Activity Zone"],
        ["04:00 PM", "Day One Highlights", "Main Stage"]
    ],

    2: [
        ["09:30 AM", "VisionX Summit", "Main Auditorium"],
        ["10:00 AM", "PixelPitch", "Exhibition Hall"],
        ["12:00 PM", "Expert Interaction", "Conference Room"],
        ["02:00 PM", "InnovateX", "Exhibition Centre"],
        ["05:00 PM", "Day Two Highlights", "Main Stage"]
    ],

    3: [
        ["09:00 AM", "Sports Activities", "Sports Ground"],
        ["10:00 AM", "BuildLab", "Technology Block"],
        ["02:00 PM", "Creative Showcase", "Open Air Stage"],
        ["04:00 PM", "Echoes", "Open Air Stage"],
        ["07:00 PM", "Closing Ceremony", "Main Auditorium"]
    ]

};


// 11. DISPLAY SCHEDULE
const timeline = document.getElementById("timeline");

function displaySchedule(day) {

    timeline.innerHTML = schedule[day].map(item => `

        <div class="timeline-item">

            <div class="timeline-time">${item[0]}</div>

            <div class="timeline-dot"></div>

            <div class="timeline-info">
                <h3>${item[1]}</h3>
                <p>${item[2]}</p>
            </div>

        </div>

    `).join("");

}

displaySchedule(1);


// 12. SCHEDULE TABS
document.querySelectorAll(".schedule-tab").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".schedule-tab")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        displaySchedule(button.dataset.day);

    });

});


// 13. COUNTDOWN
// Sample event date: 15 January 2027
const eventDate = new Date("January 15, 2027 09:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {

        document.querySelector(".countdown").innerHTML =
            "<h3>THE EXPERIENCE HAS BEGUN!</h3>";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();
setInterval(updateCountdown, 1000);


// 14. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    menuToggle.textContent =
        navLinks.classList.contains("open") ? "✕" : "☰";

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";

    });

});


// 15. REGISTRATION FORM
const registrationForm =
    document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const college = document.getElementById("college").value;
    const selectedEvent = eventChoice.value;

    const message = document.getElementById("formMessage");

    if (!name || !email || !phone || !college || !selectedEvent) {

        message.textContent = "Please fill in all fields.";
        message.className = "form-message error";

        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {

        message.textContent = "Enter a valid 10-digit phone number.";
        message.className = "form-message error";

        return;
    }

    const registration = {
        name: name,
        email: email,
        phone: phone,
        college: college,
        event: selectedEvent
    };

    const saved = JSON.parse(
        localStorage.getItem("nexoraRegistrations") || "[]"
    );

    saved.push(registration);

    localStorage.setItem(
        "nexoraRegistrations",
        JSON.stringify(saved)
    );

    message.textContent =
        "Registration saved successfully on this device!";

    message.className = "form-message success";

    registrationForm.reset();

});


// 16. INITIALISE WEBSITE
displayEvents();
displayFeatured();

console.log("NEXORA 2027 website loaded successfully!");