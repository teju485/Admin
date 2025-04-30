const SUPABASE_URL = 'https://ykfdmsdexluorzosswqo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZmRtc2RleGx1b3J6b3Nzd3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzU4OTAsImV4cCI6MjA2MDY1MTg5MH0.KAjkJlfZ_S0pju3Qbs54M8p3E7oFGWBeRUHX9vVwxLk'; // API key
const table = 'event';

function isValidDate(dateString) {
    // Check if dateString is a valid date in ISO format (YYYY-MM-DD)
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

async function getEvents() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        const data = await res.json();
        console.log('📚 Loaded Events:', data);

        const list = document.getElementById('eventlist');
        // Clear the event list container before adding updated events
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        if (data.length === 0) {
            showNoEventsMessage(true);
            showRefreshButton(true);
            list.classList.add('hidden');
        } else {
            showNoEventsMessage(false);
            showRefreshButton(false);
            list.classList.remove('hidden');

            data.forEach((event, index) => {
                const div = document.createElement('div');
                div.style.border = "1px solid transparent";
                div.style.margin = "10px";
                div.style.padding = "10px";
                div.classList.add('animate-slide-up', 'bg-white', 'min-h-[20rem]', 'rounded-xl', 'shadow-lg', 'p-6', 'mb-6', 'md:mb-8', 'hover:shadow-2xl', 'transition-shadow', 'duration-300', 'cursor-pointer', 'overflow-hidden',
                    'w-full',
                );
                div.style.animationDelay = `${index * 0.2}s`;
                div.innerHTML = `
    <div class="flex md:flex-row flex-col items-center justify-center mb-4 md:mb-0 gap-4 p-3 event-item">
        <img src="${event.image}" alt="Event Image" class="max-h-60 rounded-md object-contain max-w-60" />
        <div>
            <div class="flex flex-col justify-center align-center md:w-full gap-1">
                <span><strong class="text-lg font-semibold mb-1 event-title">Title: </strong>${event.title}</span>
                <span><strong class="text-lg font-semibold mb-1">Description:</strong> ${event.description}</span>
                <span><strong class="text-lg font-semibold mb-1 event-organizer">Organizer:</strong> ${event.author}</span>
                <span><strong class="text-lg font-semibold mb-1 event-date">Date:</strong> ${event.date}</span>
                <span><strong class="text-lg font-semibold mb-1 event-location">Location:</strong> ${event.location}</span>
            </div>
            <div class="flex flex-row w-1/3 gap-2 mt-4 items-center">
                <button onclick="updateEvent('${event.id}')" class="bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300">Update</button>
                <button onclick="deleteEvent('${event.id}')" class="bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300">Delete</button>
            </div>
        </div>
    </div>
      `;

                list.appendChild(div);
            });
        }
    } catch (error) {
        console.error('❌ Error fetching events:', error);
        alert('Failed to load events!');
        showNoEventsMessage(true);
        showRefreshButton(true);
    }
}

function showNoEventsMessage(show) {
    const noEventsDiv = document.querySelector('.flex.flex-col.items-center');
    if (noEventsDiv) {
        noEventsDiv.style.display = show ? 'flex' : 'none';
    }
}

function showRefreshButton(show) {
    let refreshBtn = document.getElementById('refreshButton');
    if (!refreshBtn) {
        refreshBtn = document.createElement('button');
        refreshBtn.id = 'refreshButton';
        refreshBtn.textContent = 'Refresh Page';
        refreshBtn.className = 'bg-blue-800 p-2 rounded-xl text-white mt-2 cursor-pointer';
        refreshBtn.onclick = () => location.reload();
        const container = document.querySelector('.flex.flex-col.items-center');
        if (container) {
            container.appendChild(refreshBtn);
        }
    }
    refreshBtn.style.display = show ? 'inline-block' : 'none';
}

window.onload = () => {
    getEvents();
};

async function deleteEvent(id) {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        console.log('✅ Deleted event with status:', res.status);
        alert('Event deleted!');
        getEvents();
    } catch (error) {
        console.error('❌ Error deleting event:', error);
        alert('Failed to delete event!');
    }
}

async function updateEvent(id) {
    // Prompt user for multiple fields to update
    const newTitle = prompt("Enter new title:");
    if (newTitle === null) return;
    const newDescription = prompt("Enter new description:");
    if (newDescription === null) return;
    const newAuthor = prompt("Enter new organizer:");
    if (newAuthor === null) return;
    const newDate = prompt("Enter new date:");
    if (newDate === null) return;

    // Validate date format
    if (!isValidDate(newDate)) {
        alert('Invalid date format. Please enter a valid date in YYYY-MM-DD format.');
        return;
    }

    const newLocation = prompt("Enter new location:");
    if (newLocation === null) return;
    const newImage = prompt("Enter new image URL:");
    if (newImage === null) return;

    const updatedData = {
        title: newTitle,
        description: newDescription,
        author: newAuthor,
        date: newDate,
        location: newLocation,
        image: newImage
    };

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(updatedData)
        });

        const data = await res.json();
        console.log('✅ Updated Event:', data);
        alert('Event updated!');
        getEvents();
    } catch (error) {
        console.error('❌ Error updating event:', error);
        alert('Failed to update event!');
    }
}
