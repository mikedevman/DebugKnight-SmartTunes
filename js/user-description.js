document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const welcomeBtn = document.querySelector('.user-welcome-btn');
    const modalOverlay = document.querySelector('.user-modal-overlay');
    const modal = document.querySelector('.user-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Open modal
    if(welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            // Refresh data every time modal opens
            fetchUserData().then(() => {
                modalOverlay.classList.add('active');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // Close modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalOverlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') {
            closeModal();
        }
    });

    // Function to fetch and update user data
    async function fetchUserData() {
        try {
            // Fetch playlists
            const playlistsResponse = await fetch('get_user_playlists.php');
            const playlists = await playlistsResponse.json();
            
            // Update playlists section
            const playlistsContainer = document.querySelector('.modal-section:first-child .items-container');
            updateItemsList(playlistsContainer, playlists, 'playlist.php');
            
            // Fetch songs
            const songsResponse = await fetch('get_user_songs.php');
            const songs = await songsResponse.json();
            
            // Update songs section
            const songsContainer = document.querySelector('.modal-section:last-child .items-container');
            updateItemsList(songsContainer, songs, 'karaoke.php');
            
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // Helper function to update items list
    function updateItemsList(container, items, linkPrefix) {
        if (items.length > 0) {
            const itemsList = document.createElement('ul');
            itemsList.className = 'items-list';
            
        items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');

            if (item.song_id) {
                a.href = `${linkPrefix}?id=${item.song_id}`;
            } else {
                a.href = `${linkPrefix}?id=${item.id}`;
            }

            a.textContent = item.name;
            li.appendChild(a);
            itemsList.appendChild(li);
        });

            
            container.innerHTML = '';
            container.appendChild(itemsList);
        } else {
            container.innerHTML = '<p class="no-items">No items found</p>';
        }
    }
});