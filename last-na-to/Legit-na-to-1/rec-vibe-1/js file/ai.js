document.addEventListener('DOMContentLoaded', () => {
    // --- SIMULATED USER DATA ---
    const currentUser = {
        id: 'user123',
        name: 'Alex Morgan',
        location: 'New York, NY',
        interests: ['Tech', 'Live Music', 'AI', 'Jazz'],
        pastInteractions: [
            { eventId: 'event001', type: 'rsvp', category: 'Tech' },
            { eventId: 'event005', type: 'viewed', category: 'Music' }
        ],
        preferredDays: ['Saturday', 'Sunday'],
        preferredPriceRange: '0-50'
    };

    // --- SIMULATED EVENT DATABASE ---
    const allEvents = [
        { id: 'event101', title: 'AI Innovators Summit', date: '2023-12-05', time: '09:00 AM', location: 'Javits Center, NY', category: 'Tech', subCategory: 'AI', price: 75, description: 'Leading AI experts discuss future trends.', tags: ['ai', 'conference', 'innovation'] },
        { id: 'event102', title: 'Indie Rock Fest', date: '2023-11-25', time: '06:00 PM', location: 'Brooklyn Steel, NY', category: 'Music', subCategory: 'Indie Rock', price: 40, description: 'Featuring up-and-coming indie bands.', tags: ['live music', 'indie', 'festival'] },
        { id: 'event103', title: 'Modern Art Exhibition', date: '2023-12-01', time: '10:00 AM - 05:00 PM', location: 'MoMA, NY', category: 'Art', subCategory: 'Modern Art', price: 25, description: 'A stunning collection of modern masterpieces.', tags: ['art gallery', 'exhibition', 'modern'] },
        { id: 'event104', title: 'Food Truck Rally', date: '2023-11-18', time: '12:00 PM', location: 'Prospect Park, NY', category: 'Food', subCategory: 'Street Food', price: 0, description: 'Dozens of food trucks offering diverse cuisines.', tags: ['food', 'festival', 'family friendly'] },
        { id: 'event105', title: 'Jazz Night at Blue Note', date: '2023-11-30', time: '08:00 PM', location: 'Blue Note, NY', category: 'Music', subCategory: 'Jazz', price: 30, description: 'An intimate evening with renowned jazz musicians.', tags: ['jazz', 'live music', 'club'] },
        { id: 'event106', title: 'Marathon NYC', date: '2023-11-05', time: '07:00 AM', location: 'Central Park, NY', category: 'Sports', subCategory: 'Running', price: 100, description: 'The annual New York City Marathon.', tags: ['running', 'marathon', 'fitness'] },
        { id: 'event107', title: 'Web Development Workshop', date: '2023-12-02', time: '10:00 AM', location: 'Online', category: 'Tech', subCategory: 'Web Development', price: 50, description: 'Learn the basics of modern web development.', tags: ['workshop', 'coding', 'webdev'] },
        { id: 'event108', title: 'Comedy Show Extravaganza', date: '2023-11-24', time: '07:30 PM', location: 'Comedy Cellar, NY', category: 'Entertainment', subCategory: 'Comedy', price: 20, description: 'A night of laughs with top comedians.', tags: ['comedy', 'standup', 'show'] }
    ];

    const eventListContainer = document.getElementById('event-list-container');
    const allEventsContainer = document.getElementById('all-events-container');
    const categoryFilter = document.getElementById('category-filter');

    // Start with empty category filter
    categoryFilter.innerHTML = '<option value="all">Loading categories...</option>';

    function displayUserInfo() {
        document.getElementById('user-name-display').textContent = currentUser.name.split(' ')[0];
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-location').textContent = currentUser.location;
        document.getElementById('user-interests').textContent = currentUser.interests.join(', ');

        let activityStr = currentUser.pastInteractions.length > 0
            ? `RSVP'd to ${currentUser.pastInteractions.filter(i => i.type === 'rsvp').length} events, Viewed ${currentUser.pastInteractions.filter(i => i.type === 'viewed').length} events.`
            : 'No recent activity tracked.';
        document.getElementById('user-activity').textContent = activityStr;
    }

    function getPersonalizedRecommendations(user, events) {
        const recommendations = [];
        const scores = {};

        events.forEach(event => {
            scores[event.id] = { score: 0, reasons: [] };

            user.interests.forEach(interest => {
                if (
                    event.category.toLowerCase().includes(interest.toLowerCase()) ||
                    event.subCategory.toLowerCase().includes(interest.toLowerCase()) ||
                    event.title.toLowerCase().includes(interest.toLowerCase()) ||
                    event.description.toLowerCase().includes(interest.toLowerCase()) ||
                    (event.tags && event.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase())))
                ) {
                    scores[event.id].score += 30;
                    if (!scores[event.id].reasons.includes(`you like ${interest}`)) {
                        scores[event.id].reasons.push(`you like ${interest}`);
                    }
                }
            });

            if (event.location.includes(user.location.split(',')[0])) {
                scores[event.id].score += 15;
            } else if (event.location.toLowerCase() === 'online') {
                scores[event.id].score += 10;
            }

            user.pastInteractions.forEach(interaction => {
                if (interaction.category.toLowerCase() === event.category.toLowerCase() && interaction.eventId !== event.id) {
                    scores[event.id].score += 20;
                    if (!scores[event.id].reasons.includes(`you've shown interest in ${interaction.category} events`)) {
                        scores[event.id].reasons.push(`you've shown interest in ${interaction.category} events`);
                    }
                }
            });

            if (user.preferredPriceRange !== 'any') {
                const [minPrice, maxPrice] = user.preferredPriceRange.split('-').map(Number);
                if (event.price >= minPrice && event.price <= maxPrice) {
                    scores[event.id].score += 5;
                } else if (event.price > maxPrice) {
                    scores[event.id].score -= 10;
                }
            }

            const eventDate = new Date(event.date);
            const today = new Date();
            if (eventDate >= today) {
                scores[event.id].score += 5;
            } else {
                scores[event.id].score = -1000;
            }

            if (scores[event.id].score > 0) {
                recommendations.push({
                    ...event,
                    score: scores[event.id].score,
                    reason: scores[event.id].reasons.slice(0, 2).join(', and ') || 'it matches your profile'
                });
            }
        });

        return recommendations.sort((a, b) => b.score - a.score).slice(0, 5);
    }

    function renderEventCard(event, isRecommendation = false) {
        const card = document.createElement('article');
        card.classList.add('event-card');
        card.setAttribute('data-event-id', event.id);

        let reasonHtml = '';
        if (isRecommendation && event.reason) {
            reasonHtml = `<p class="event-reason">✨ Recommended because ${event.reason}.</p>`;
        }

        card.innerHTML = `
            <h3>${event.title}</h3>
            <p class="event-meta">${event.date} | ${event.time} | ${event.location}</p>
            <p><strong>Category:</strong> ${event.category} (${event.subCategory || ''})</p>
            ${reasonHtml}
            <p>${event.description.substring(0, 100)}...</p>
            <p><strong>Price:</strong> ${event.price > 0 ? '$' + event.price : 'Free'}</p>
            <div class="event-actions">
                <button class="details-btn">View Details</button>
                <button class="not-interested-btn">Not Interested</button>
            </div>
        `;

        card.querySelector('.details-btn').addEventListener('click', () => {
            alert(`Showing details for: ${event.title}`);
        });

        card.querySelector('.not-interested-btn').addEventListener('click', (e) => {
            e.target.closest('.event-card').style.display = 'none';
            console.log(`User not interested in: ${event.id} - ${event.title}`);
        });

        return card;
    }

    function displayRecommendations() {
        eventListContainer.innerHTML = '<p class="loading-message">Fetching your personalized recommendations...</p>';
        setTimeout(() => {
            const recommendedEvents = getPersonalizedRecommendations(currentUser, allEvents);
            eventListContainer.innerHTML = '';
            if (recommendedEvents.length === 0) {
                eventListContainer.innerHTML = '<p>No specific recommendations for you right now.</p>';
                return;
            }
            recommendedEvents.forEach(event => {
                eventListContainer.appendChild(renderEventCard(event, true));
            });
        }, 1000);
    }

    function displayAllEvents(filterCategory = 'all') {
        allEventsContainer.innerHTML = '';
        const eventsToDisplay = filterCategory === 'all'
            ? allEvents.filter(event => new Date(event.date) >= new Date())
            : allEvents.filter(event => event.category === filterCategory && new Date(event.date) >= new Date());

        if (eventsToDisplay.length === 0) {
            allEventsContainer.innerHTML = `<p>No events found for category: ${filterCategory}.</p>`;
            return;
        }

        eventsToDisplay.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(event => {
            allEventsContainer.appendChild(renderEventCard(event));
        });
    }

    function populateCategoryFilter() {
        const categories = Array.from(new Set(allEvents.map(e => e.category)));
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }

    categoryFilter.addEventListener('change', (e) => {
        displayAllEvents(e.target.value);
    });

    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        alert("Profile editing is simulated.");
    });

    // --- INITIAL LOAD ---
    displayUserInfo();
    displayRecommendations();
    displayAllEvents();
    populateCategoryFilter();
});
  function toggleProfileMenu() {
    document.getElementById("profileDropdown").classList.toggle("show");
  }

  // Close dropdown when clicking outside
  window.onclick = function(event) {
    if (!event.target.matches('.profile-icon')) {
      const dropdown = document.getElementById("profileDropdown");
      if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  };

  function logout() {
    alert("Logged out!");
    // Add your logout logic here
  }


