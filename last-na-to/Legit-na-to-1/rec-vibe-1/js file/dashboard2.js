document.getElementById("event-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const eventData = {
    title: document.getElementById("title").value,
    desc: document.getElementById("desc").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    location: document.getElementById("location").value
  };

  // Push to Firebase
  db.ref("events").push(eventData)
    .then(() => {
      alert("✅ Your event has been saved to the database!");
      // Optionally redirect to admin dashboard
      // window.location.href = "admin.html";
    })
    .catch((err) => {
      console.error("Error saving event:", err);
      alert("❌ Failed to save event.");
    });
});
