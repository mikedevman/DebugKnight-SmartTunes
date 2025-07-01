const video = document.getElementById("karaoke-video");
const songSearchInput = document.getElementById("song-search");
const searchIconBtn = document.getElementById("search-icon-btn"); 
const songList = document.getElementById("song-list");
const fullscreenBtn = document.getElementById("fullscreen-btn");

let allSongs = [];

if (window.location.search.includes("upload=success")) {
    setTimeout(() => {
        location.href = "karaoke.html";
    }, 200);
}

fetch("display_songs.php")
    .then(res => res.json())
    .then(songs => {
        console.log("Fetched songs:", songs);
        allSongs = songs;
        renderSongList(allSongs);
        if (allSongs.length > 0) {
            loadSong(allSongs[0]);
        }
    })
    .catch(error => {
        console.error("Error loading songs:", error);
    });

function renderSongList(songsToRender) {
    songList.innerHTML = "";
    songsToRender.forEach((song) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist}`;
        listItem.classList.add("song-item");

        listItem.addEventListener("click", () => {
            loadSong(song);
            document.querySelectorAll('.song-item').forEach(item => item.classList.remove('active'));
            listItem.classList.add('active');
        });

        songList.appendChild(listItem);
    });
}

function performSearch() {
    const searchTerm = songSearchInput.value.toLowerCase();
    const filteredSongs = allSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) || 
        (song.artist && song.artist.toLowerCase().includes(searchTerm))
    );
    renderSongList(filteredSongs);
}

songSearchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});

searchIconBtn.addEventListener("click", performSearch);

function loadSong(song) {
    console.log("Loading song:", song);
    video.src = song.video;
    video.currentTime = 0;
    video.play();
}

fullscreenBtn.addEventListener("click", () => {
    const container = document.getElementById("karaoke-container");
    if (!document.fullscreenElement) {
        container.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
