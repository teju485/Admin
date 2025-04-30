const SUPABASE_URL = 'https://ykfdmsdexluorzosswqo.supabase.co';//api url
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZmRtc2RleGx1b3J6b3Nzd3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzU4OTAsImV4cCI6MjA2MDY1MTg5MH0.KAjkJlfZ_S0pju3Qbs54M8p3E7oFGWBeRUHX9vVwxLk'; //api key 
const table = 'poems';

async function addPoem() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const author = document.getElementById('author').value;
  const image = document.getElementById('image').value;


  if (!title || !description || !author || !image) {
    alert('All fields are required and must not be empty');
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ title, description, author, image })
    });

    const data = await res.json();
    console.log('✅ Added Poem:', data);
    alert('Poem added!');
    
  } catch (error) {
    console.error('❌ Error adding poem:', error);
    alert('Failed to add poem!');
  }
}