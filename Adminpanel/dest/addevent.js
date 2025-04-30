const SUPABASE_URL = 'https://ykfdmsdexluorzosswqo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZmRtc2RleGx1b3J6b3Nzd3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzU4OTAsImV4cCI6MjA2MDY1MTg5MH0.KAjkJlfZ_S0pju3Qbs54M8p3E7oFGWBeRUHX9vVwxLk'; // API key
const table = 'event';

async function addEvent() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const author = document.getElementById('organizer').value.trim();
  const image = document.getElementById('image').value.trim();
  const date = document.getElementById('date').value.trim();
  const location = document.getElementById('location').value.trim();

  // Validate required fields
  if (!title || !description || !author || !image || !date || !location) {
    alert('All fields are required and must not be empty.');
    return;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ title, description, author, image, date, location }),
    });

    // Check if the response is successful
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('✅ Added Event:', data);
    alert('Event added successfully!');
  } catch (error) {
    console.error('❌ Error adding Event:', error);
    alert('Failed to add Event. Please try again.');
  }
}
