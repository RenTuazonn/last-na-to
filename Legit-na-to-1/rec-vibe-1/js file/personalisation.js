// Dummy event data
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

// Load events and notifications
document.addEventListener("DOMContentLoaded", () => {
    displayEvents(events);
    displayNotifications(notifications);
    generateColorPalette();
});

// Filter and display events
function searchEvents() {
    const input = document.getElementById("search-input").value.toLowerCase().trim();
    const filtered = events.filter(e => e.toLowerCase().includes(input));
    displayEvents(filtered);
}

// Display event list
function displayEvents(eventList) {
    const container = document.getElementById("event-list");
    container.innerHTML = "";  // Clear existing content
    eventList.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event;
        container.appendChild(li);
    });
}

// Display notifications
function displayNotifications(notifList) {
    const container = document.getElementById("notif-list");
    container.innerHTML = "";
    notifList.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note;
        container.appendChild(li);
    });
}

// Generate color palette for themes (example usage: log to console)
function generateColorPalette() {
    const colors = ["#FF5733", "#FF8D1A", "#FFC300", "#DAF7A6", "#33FFBD", "#33D4FF"];
    console.log("Generated Color Palette:", colors);
    // You can apply these colors to elements as needed
}
