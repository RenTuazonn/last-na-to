// Dummy event data simulating `get_personalized_events(username)`
const events = [
    "Tech Conference 2025 - May 10th",
    "Music Festival 2025 - May 15th",
    "Art Exhibition - May 20th",
    "AI Workshop - May 22nd",
    "Robotics Fair 2025 - May 30th"
];

// Notifications
const notifications = [
    "New event added: 'Robotics Fair 2025'",
    "Reminder: AI Workshop on May 22nd",
    "Update: Venue change for Music Festival"
];

// Load recommended events
document.addEventListener("DOMContentLoaded", () => {
    displayEvents(events);
    displayNotifications(notifications);
});

// Filter and display matching events
function searchEvents() {
    const input = document.getElementById("search-input").value.toLowerCase().trim();
    const filtered = events.filter(e => e.toLowerCase().includes(input));
    displayEvents(filtered);
    showSection('events');
}

// Display event list
function displayEvents(eventList) {
    const container = document.getElementById("event-list");
    container.innerHTML = "";

    if (eventList.length === 0) {
        container.innerHTML = "<li>No events found.</li>";
    } else {
        eventList.forEach(event => {
            const li = document.createElement("li");
            li.textContent = `• ${event}`;
            container.appendChild(li);
        });
    }
}

// Display notifications
function displayNotifications(notifList) {
    const container = document.getElementById("notif-list");
    container.innerHTML = "";

    notifList.forEach(note => {
        const li = document.createElement("li");
        li.textContent = `• ${note}`;
        container.appendChild(li);
    });
}

// Toggle visible section
function showSection(sectionId) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.classList.remove("active"));

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add("active");
    }
}

// Simulate logout
function logout() {
    alert("You have been logged out.");
    location.href = "index.html"; // Replace with your login page
}

 
