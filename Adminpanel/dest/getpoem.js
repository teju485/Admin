const SUPABASE_URL = 'https://ykfdmsdexluorzosswqo.supabase.co';//api url
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZmRtc2RleGx1b3J6b3Nzd3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzU4OTAsImV4cCI6MjA2MDY1MTg5MH0.KAjkJlfZ_S0pju3Qbs54M8p3E7oFGWBeRUHX9vVwxLk'; //api key 
const table = 'poems';

async function getPoems() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        const data = await res.json();
        console.log('📚 Loaded Poems:', data);

        const list = document.getElementById('poemList');
        list.innerHTML = '';

        if (data.length === 0) {
            showNoPoemsMessage(true);
            showRefreshButton(true);
            document.getElementById('poemList').classList.add('hidden');
        } else {
            showNoPoemsMessage(false);
            showRefreshButton(false);
            const list = document.getElementById('poemList');
            list.innerHTML = '';
            list.classList.remove('hidden');


            data.forEach((poem, index) => {
                const div = document.createElement('div');
                div.style.border = "1px solid transparent";
                div.style.margin = "10px";
                div.style.padding = "10px";
                div.classList.add('animate-slide-up', 'bg-white', 'min-h-[20rem]', 'rounded-xl', 'shadow-lg', 'p-6', 'mb-6', 'md:mb-8', 'hover:shadow-2xl', 'transition-shadow', 'duration-300', 'cursor-pointer', 'overflow-hidden',
                    'w-full',
                );
                div.style.animationDelay = `${index * 0.2}s`;
                div.innerHTML = `
                
     
    <div class="flex md:flex-row  flex-col items-center justify-center mb-4  md:mb-0 gap-4 p-3 poem-item">
  
    <img src="${poem.image}" alt="Poem Image" class="max-h-60 rounded-md object-contain max-w-60" />
    <div>
    <div class="flex flex-col justify-center  align-center md:w-full gap-1" >
      <span><strong class="text-lg font-semibold mb-1 poem-title">Title: </strong>${poem.title}</span> 
     <span> <strong class="text-lg font-semibold mb-1">Description:</strong> ${poem.description}</span>  
     <span> <strong class="text-lg font-semibold mb-1 poem-author">Author:</strong> ${poem.author} </span> 
   </div>
    <div class="flex flex-row  w-1/3 gap-2 mt-4 items-center">
      <button onclick="updatePoem('${poem.id}')" class="bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300">Update</button>
      <button onclick="deletePoem('${poem.id}')" class="bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300">Delete</button>
    </div>
    </div>
    </div>
      `;

                list.appendChild(div);
            });
        }
    } catch (error) {
        console.log(error);

        console.error('❌ Error fetching poems:', error);
        alert('Failed to load poems!');
        showNoPoemsMessage(true);
        showRefreshButton(true);
    }
}

function showNoPoemsMessage(show) {
    const noPoemsDiv = document.querySelector('.flex.flex-col.items-center');
    if (noPoemsDiv) {
        noPoemsDiv.style.display = show ? 'flex' : 'none';
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
    getPoems();
};


async function deletePoem(id) {
    const confirmDelete = confirm("Are you sure you want to delete this poem?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        console.log('✅ Deleted poem with status:', res.status);
        alert('Poem deleted!');
        getPoems();
    } catch (error) {
        console.error('❌ Error deleting poem:', error);
        alert('Failed to delete poem!');
    }
}
async function updatePoem(id) {
    // Prompt user for multiple fields to update
    const newTitle = prompt("Enter new title:");
    if (newTitle === null) return;
    const newDescription = prompt("Enter new description:");
    if (newDescription === null) return;
    const newAuthor = prompt("Enter new author:");
    if (newAuthor === null) return;

    const newImage = prompt("Enter new image URL:");
    if (newImage === null) return;

    const updatedData = {
        title: newTitle,
        description: newDescription,
        author: newAuthor,

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
        console.log('✅ Updated Poem:', data);
        alert('Poem updated!');
        getPoems();
    } catch (error) {
        console.error('❌ Error updating poem:', error);
        alert('Failed to update poem!');
    }
}
