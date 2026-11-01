document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.querySelector('.user-modal-overlay');
    const modal = document.querySelector('.user-modal');
    const closeBtn = modal?.querySelector('.close-modal');
    if (!modalOverlay || !modal || !closeBtn) return;

    let opener = null;
    let previousOverflow = '';
    modal.id = 'smarttunes-profile';
    document.querySelectorAll('.user-welcome-btn').forEach(button => {
        button.setAttribute('aria-controls', modal.id);
    });

    // The mobile menu contains a cloned welcome button. Both open the same profile.
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.user-welcome-btn');
        if (!button) return;
        opener = button;
        if (!modal.classList.contains('active')) previousOverflow = document.body.style.overflow;
        modalOverlay.classList.add('active');
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.querySelectorAll('.user-welcome-btn').forEach(trigger => trigger.setAttribute('aria-expanded', 'true'));
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            if (modal.classList.contains('active')) closeBtn.focus({ preventScroll: true });
        });
        fetchUserData();
    });

    function closeModal() {
        if (!modal.classList.contains('active')) return;
        modalOverlay.classList.remove('active');
        modal.classList.remove('active');
        document.querySelectorAll('.user-welcome-btn').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
        document.body.style.overflow = previousOverflow;
        opener?.focus({ preventScroll: true });
        modal.setAttribute('aria-hidden', 'true');
    }

    modalOverlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(event) {
        if (!modal.classList.contains('active')) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
        } else if (event.key === 'Tab') {
            const controls = [...modal.querySelectorAll('button, a[href]')].filter(el => el.getClientRects().length);
            const first = controls[0], last = controls[controls.length - 1];
            if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
                event.preventDefault();
                first?.focus();
            }
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