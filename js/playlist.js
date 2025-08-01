let allSongs = [];
let selectedSong = null;

// Load all songs
function loadAllSongs() {
    fetch("get_songs.php")
        .then(res => res.json())
        .then(data => {
            allSongs = data;
            const datalist = document.getElementById("song-list-data");
            datalist.innerHTML = "";

            data.forEach(song => {
                const option = document.createElement("option");
                option.value = song.name;
                datalist.appendChild(option);
            });
        });
}

// Auto-select song ID when user types
function setupSongInputListener() {
    const input = document.getElementById("song-name-input");
    input.addEventListener("input", () => {
        const name = input.value.trim();
        const match = allSongs.find(song => song.name === name);
        document.getElementById("selected-song-id").value = match ? match.song_id : "";
    });
}

// Add song to playlist
function setupAddButton() {
    const addBtn = document.getElementById("add-playlist-btn");
    addBtn.addEventListener("click", e => {
        e.preventDefault();

        const playlistId = getPlaylistId();
        const songId = document.getElementById("selected-song-id").value;

        if (!playlistId || !songId) {
            alert("Please select a valid song.");
            return;
        }

        fetch("playlist_add_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playlist_id: playlistId, song_id: songId })
        })
        .then(res => res.text())
        .then(text => {
            console.log("Raw response:", text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                alert("Server returned invalid JSON:\n" + text);
                return;
            }

            if (data.success) {
                alert("Song added!");
                window.location.reload();
            } else {
                alert("Error: " + (data.message || "Unknown error"));
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("An error occurred: " + err.message);
        });
    });
}

// Extract YouTube video ID
function getYouTubeVideoID(url) {
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\s]{11})/);
    return match ? match[1] : null;
}

// Load video preview
function loadPlaylistVideo(url) {
    const wrapper = document.getElementById("karaoke-video-wrapper");
    const videoID = getYouTubeVideoID(url);

    wrapper.innerHTML = videoID
        ? `<iframe src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowfullscreen style="width: 100%; height: 100%; border-radius: 8px; border: none;"></iframe>`
        : `<video src="${url}" controls style="width: 100%; border-radius: 8px;"></video>`;
}

// Load all songs in the selected playlist
function loadPlaylistSongs() {
    const playlistId = getPlaylistId();
    if (!playlistId) return;

    fetch(`get_playlist_songs.php?id=${playlistId}`)
        .then(res => res.json())
        .then(songs => {
            const container = document.getElementById("playlist-songs");
            container.innerHTML = "";

            songs.forEach(song => {
                const div = document.createElement("div");
                div.className = "playlist-song-item";
                div.dataset.songId = song.song_id;
                div.dataset.songTitle = song.name;

                div.innerHTML = `<span style="cursor:pointer; font-size: 17px; color: #fff;">${song.name}</span>`;

                div.addEventListener("click", () => {
                    document.querySelectorAll(".playlist-song-item").forEach(el => el.classList.remove("active"));
                    div.classList.add("active");

                    selectedSong = {
                        id: div.dataset.songId,
                        title: div.dataset.songTitle
                    };

                    loadPlaylistVideo(song.content);
                });

                container.appendChild(div);
            });
        });
}

// Delete selected song from playlist
function setupDeleteButton() {
    const deleteBtn = document.getElementById("delete-selected-btn");
    deleteBtn.addEventListener("click", () => {
        if (!selectedSong) {
            alert("Please select a song to delete.");
            return;
        }

        if (!confirm(`Are you sure you want to remove "${selectedSong.title}" from the playlist?`)) return;

        fetch("delete_playlist_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                playlist_id: getPlaylistId(),
                song_id: selectedSong.id
            })
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === "success") {
                alert("Song removed.");
                selectedSong = null;
                loadPlaylistSongs();
            } else {
                alert("Error: " + result.message);
            }
        })
        .catch(err => {
            alert("Connection error: " + err);
        });
    });
}

// Get playlist ID from URL
function getPlaylistId() {
    return new URLSearchParams(window.location.search).get("id");
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    loadAllSongs();
    setupSongInputListener();
    setupAddButton();
    setupDeleteButton();
    loadPlaylistSongs();
});
