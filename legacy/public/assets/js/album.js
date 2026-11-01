let allSongs = [];
let selectedSong = null;
let albumPage = 1;
let albumSearch = '';
let albumSort = '';
let albumRequestVersion = 0;
let suggestionVersion = 0;
let albumPagination;

// ---------- Extract album ID from URL ----------
function getAlbumId() {
    return new URLSearchParams(window.location.search).get("id");
}

// ---------- Load at most 20 matching suggestions for the add-song field ----------
function loadAllSongs(query = '') {
    const version = ++suggestionVersion;
    return fetch(`get_songs.php?limit=20&q=${encodeURIComponent(query)}`)
        .then(res => {
            if (!res.ok) throw new Error('Unable to load song suggestions.');
            return res.json();
        })
        .then(data => {
            if (version !== suggestionVersion) return;
            allSongs = data;
            const datalist = document.getElementById("song-list-data");
            datalist.innerHTML = "";

            data.forEach(song => {
                const option = document.createElement("option");
                option.value = song.name;
                option.dataset.songId = song.song_id; 
                datalist.appendChild(option);
            });
            const name = document.getElementById("song-name-input").value.trim();
            const match = allSongs.find(song => song.name === name);
            document.getElementById("selected-song-id").value = match ? match.song_id : '';
        })
        .catch(err => console.error("Error loading all songs:", err));
}

// ---------- Assign song ID when user types the name ----------
function setupSongInputListener() {
    const input = document.getElementById("song-name-input");
    let timer;
    input.addEventListener("input", () => {
        const name = input.value.trim();
        const match = allSongs.find(song => song.name === name);
        document.getElementById("selected-song-id").value = match ? match.song_id : "";
        ++suggestionVersion;
        clearTimeout(timer);
        timer = setTimeout(() => loadAllSongs(name), 250);
    });
}

// ---------- Set up "Add" button to add song to album ----------
function setupAddButton() {
    const addBtn = document.getElementById("add-album-btn");
    addBtn.addEventListener("click", e => {
        e.preventDefault();

        const albumId = getAlbumId();
        const songName = document.getElementById("song-name-input").value.trim();
        const songId = document.getElementById("selected-song-id").value;

        if (!albumId || !songName || !songId) {
            alert("Please select a valid song from the list.");
            return;
        }

        fetch("album_add_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ album_id: albumId, song_name: songName })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Song added to album!");
                document.getElementById("song-name-input").value = "";
                document.getElementById("selected-song-id").value = "";
                loadAlbumSongs();
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(err => console.error("Error adding song:", err));
    });
}

// ---------- Extract YouTube video ID ----------
function getYouTubeVideoID(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\s]{11})/);
    return match ? match[1] : null;
}

// ---------- Display video on the right panel ----------
function loadAlbumVideo(url) {
    const wrapper = document.getElementById("karaoke-video-wrapper");
    const videoID = getYouTubeVideoID(url);

    if (videoID) {
        wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowfullscreen style="width: 100%; height: 100%; border-radius: 8px; border: none;"></iframe>`;
    } else {
        wrapper.innerHTML = `<video src="${url}" controls style="width: 100%; border-radius: 8px;"></video>`;
    }
}

// ---------- Load the list of songs in the album ----------
function loadAlbumSongs(sort = albumSort, page = albumPage) {
    const albumId = getAlbumId();
    if (!albumId) return;

    albumSort = sort;
    const version = ++albumRequestVersion;
    const params = new URLSearchParams({ id: albumId, sort, page, q: albumSearch });
    albumPagination.loading();
    return fetch(`album_get_song.php?${params}`)
        .then(res => {
            if (!res.ok) throw new Error('Unable to load album songs.');
            return res.json();
        })
        .then(data => {
            if (version !== albumRequestVersion) return;
            if (!data.success) {
                throw new Error(data.message || 'Unable to load album songs.');
            }

            albumPage = data.pagination.page;
            albumPagination.update(data.pagination);

            const songs = data.songs;
            const container = document.getElementById("album-songs");
            container.innerHTML = ""; 
            container.closest('.song-list-wrapper').scrollTop = 0;

            if (songs.length === 0) {
                container.innerHTML = albumSearch ? '<li>No matching songs in this album.</li>' : '<li>No songs in this album yet.</li>';
            } else {
                songs.forEach(song => {
                    const li = document.createElement("li");
                    li.className = "album-song-item";
                    li.dataset.songId = song.id;
                    li.dataset.songTitle = song.title;
                    if (selectedSong && String(selectedSong.id) === String(song.id)) li.classList.add('active');

                    const title = document.createElement('span');
                    title.textContent = song.title;
                    title.style.cssText = 'cursor:pointer; font-size:17px; color:#fff;';
                    li.appendChild(title);

                    li.addEventListener("click", () => {
                        document.querySelectorAll(".album-song-item").forEach(el => el.classList.remove("active"));
                        li.classList.add("active");

                        selectedSong = {
                            id: song.id,
                            title: song.title
                        };
                        
                        loadAlbumVideo(song.video);
                    });

                    container.appendChild(li);
                });
            }
        })
        .catch(err => {
            if (version !== albumRequestVersion) return;
            console.error("Error fetching album songs:", err);
            albumPagination.error();
        });
}

// ---------- Set up "Delete" button to remove song from album ----------
function setupDeleteButton() {
    const deleteBtn = document.getElementById("delete-selected-btn");
    deleteBtn.addEventListener("click", () => {
        if (!selectedSong) {
            alert("Please select a song to delete.");
            return;
        }

        // Use backtick (`) for template literals
        if (!confirm(`Are you sure you want to remove "${selectedSong.title}" from the album?`)) return;

        fetch("delete_album_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                album_id: getAlbumId(),
                song_id: selectedSong.id
            })
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === "success") {
                alert("Song removed from album.");
                selectedSong = null;
                document.getElementById("karaoke-video-wrapper").innerHTML = ''; // Remove video
                loadAlbumSongs(); // Reload list
            } else {
                alert("Error: " + result.message);
            }
        })
        .catch(err => {
            alert("Connection error: " + err);
        });
    });
}

// ---------- Initialize when DOM is ready ----------
document.addEventListener("DOMContentLoaded", () => {
    albumPagination = new SongPagination(document.getElementById('album-song-pagination'), page => loadAlbumSongs(albumSort, page));
    loadAllSongs();
    setupSongInputListener();
    setupAddButton();
    loadAlbumSongs();
    setupDeleteButton();

    const sortDropdown = document.getElementById("sort-dropdown");
    if (sortDropdown) {
        sortDropdown.addEventListener("change", e => {
            loadAlbumSongs(e.target.value, 1);
        });
    }

    const search = () => {
        albumSearch = document.getElementById('song-search').value.trim();
        loadAlbumSongs(albumSort, 1);
    };
    document.getElementById('search-icon-btn').addEventListener('click', search);
    document.getElementById('song-search').addEventListener('keypress', e => {
        if (e.key === 'Enter') search();
    });
});
