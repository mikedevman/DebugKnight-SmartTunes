document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  const songList = $("song-list");
  const deleteBtn = $("delete-selected-btn");
  const viewEditForm = $("viewEditForm");
  const uploadContainer = $("uploadContainer");
  const viewEditContainer = $("viewEditContainer");

  let allSongs = [];
  let selectedSong = null;

  // === FETCH & RENDER ===
  function fetchSortedSongs(sortType = "") {
    return fetch(`display_songs.php?sort=${sortType}`)
      .then(res => res.json())
      .then(songs => {
        allSongs = songs;
        renderSongList(allSongs);
        return songs;
      });
  }

  function renderSongList(songs) {
    songList.innerHTML = "";
    songs.forEach(song => {
      const li = document.createElement("li");
      li.className = "song-item";

      const title = document.createElement("span");
      title.className = "song-title";
      title.textContent = song.title;
      title.style.cursor = "pointer";
      title.onclick = () => {
        loadSong(song);
        selectedSong = song;
        document.querySelectorAll(".song-item").forEach(item => item.classList.remove("active"));
        li.classList.add("active");
      };

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "Details";
      viewBtn.className = "view-btn";
      viewBtn.onclick = () => openViewEditModal(song);

      li.append(title, viewBtn);
      songList.appendChild(li);
    });
  }

  // === LOAD & PLAY ===
  function getYouTubeVideoID(url) {
    const regExp = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\n\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

function loadSong(song) {
  selectedSong = song;

  // Check if current URL already has the song id parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("id") !== String(song.id)) {
    // Reload page with song ID in URL only if different
    window.location.href = `${window.location.pathname}?id=${song.id}`;
    return; // Stop further execution to avoid duplicate loading
  }

  const container = $("karaoke-container");
  let wrapper = $("karaoke-video-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "karaoke-video-wrapper";
    container.insertBefore(wrapper, $("recording-panel"));
  } else {
    wrapper.innerHTML = ""; // reset old content
  }

  const videoID = song?.video ? getYouTubeVideoID(song.video) : null;

  // ✅ Build video player
  let videoHTML;
  if (videoID) {
    videoHTML = `<iframe id="karaoke-video" src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0" 
      allow="autoplay; encrypted-media" allowfullscreen 
      style="width: 100%; height: 100%; border-radius: 8px; border: none;">
    </iframe>`;
  } else {
    videoHTML = `<video id="karaoke-video" src="${song.video || ''}" controls autoplay style="width: 100%; border-radius: 8px;"></video>`;
  }

  wrapper.innerHTML = videoHTML;
  deleteBtn.style.display = "inline-block";

  // ✅ Increment view + time_played on every click (YouTube or local video)
  fetch("update_song_stats.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ song_id: song.id, increment: "view_and_played" }),
  });

  // ✅ For local <video>, detect when finished → increment time_played again
  if (!videoID) {
    const videoElem = document.getElementById("karaoke-video");
    videoElem.addEventListener("ended", () => {
      fetch("update_song_stats.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song_id: song.id, increment: "played_only" }),
      });
    });
  }
}

  // === MODAL ===
  function openViewEditModal(song) {
    selectedSong = song;
    $("edit_id").value = song.id;
    $("edit_title").value = song.title;
    $("edit_content").value = song.video;
    $("edit_tempo").value = song.tempo || "";
    $("edit_songkey").value = song.songkey || "";
    $("edit_genre").value = song.genre || "";
    $("edit_year").value = song.year || "";
    $("edit_album").value = song.album || "";

    viewEditContainer.style.display = "block";
    document.querySelector(".main-karaoke-content").classList.add("blur-background");
  }

  $("closeViewEditBtn").onclick = () => {
    viewEditContainer.style.display = "none";
    document.querySelector(".main-karaoke-content").classList.remove("blur-background");
  };

  // === SAVE EDITED SONG ===
  viewEditForm.onsubmit = e => {
    e.preventDefault();
    const formData = new FormData(viewEditForm);

    fetch("update_song_details.php", { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        if (text.trim() === "success") {
          alert("Successfully!");
          viewEditContainer.style.display = "none";
          document.querySelector(".main-karaoke-content").classList.remove("blur-background");
          return fetch("display_songs.php").then(r => r.json());
        } else throw new Error(text);
      })
      .then(songs => {
        allSongs = songs;
        renderSongList(allSongs);
      })
      .catch(err => alert("Error: " + err.message));
  };

  // === DELETE SONG ===
  deleteBtn.onclick = () => {
    if (!selectedSong) return alert("No song selected for deletion!");
    if (!confirm(`You want to delete "${selectedSong.title}"?`)) return;

    fetch("DeleteKaraoke.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "id=" + encodeURIComponent(selectedSong.id),
    })
      .then(res => res.text())
      .then(text => {
        let result;
        try {
          result = JSON.parse(text);
        } catch {
          alert("Invalid:\n" + text);
          return;
        }

        if (result.status === "success") {
          allSongs = allSongs.filter(s => s.id !== selectedSong.id);
          renderSongList(allSongs);

          const wrapper = $("karaoke-video-wrapper");
          if (wrapper) {
            wrapper.innerHTML = ""; // clear video, keep wrapper
          }

          document.querySelectorAll(".song-item").forEach(item => item.classList.remove("active"));
          selectedSong = null;
        } else {
          alert("Delete failed: " + result.message);
        }
      });
  };

  // === SEARCH ===
  const performSearch = () => {
    const term = $("song-search").value.toLowerCase();
    const results = allSongs.filter(s => s.title.toLowerCase().includes(term));
    renderSongList(results);
  };

  $("song-search").addEventListener("keypress", e => e.key === "Enter" && performSearch());
  $("search-icon-btn").onclick = performSearch;

  // === SORT ===
  $("sort-dropdown").onchange = e => fetchSortedSongs(e.target.value);

  // === UPLOAD MODAL ===
  $("show-upload-btn").onclick = () => {
    uploadContainer.style.display = "block";
    document.querySelector(".main-karaoke-content").classList.add("blur-background");
  };

  $("closeUploadBtn").onclick = () => closeUploadForm();
  function closeUploadForm() {
    uploadContainer.style.display = "none";
    document.querySelector(".main-karaoke-content").classList.remove("blur-background");
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeUploadForm();
      viewEditContainer.style.display = "none";
      document.querySelector(".main-karaoke-content").classList.remove("blur-background");
    }
  });

// === INITIAL LOAD ===
fetchSortedSongs().then(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const songIdFromUrl = urlParams.get("id");
  if (songIdFromUrl) {
    const song = allSongs.find(s => s.id == songIdFromUrl);
    if (song) {
      loadSong(song);
      document.querySelectorAll(".song-item").forEach(item => {
        if (item.textContent.includes(song.title)) {
          item.classList.add("active");
        }
      });
    }
  }
});

// === HANDLE BROWSER BACK/FORWARD ===
window.addEventListener("popstate", e => {
  const songId = e.state?.songId || new URLSearchParams(window.location.search).get("id");
  if (songId) {
    const song = allSongs.find(s => s.id == songId);
    if (song) {
      loadSong(song);
      document.querySelectorAll(".song-item").forEach(item => {
        item.classList.remove("active");
        if (item.textContent.includes(song.title)) {
          item.classList.add("active");
        }
      });
    }
  } else {
    // If no songId in URL, clear the video
    const wrapper = $("karaoke-video-wrapper");
    if (wrapper) wrapper.innerHTML = "";
    document.querySelectorAll(".song-item").forEach(item => item.classList.remove("active"));
    selectedSong = null;
  }
});

  // === WHEN VIDEO ENDS ===
  document.addEventListener("ended", function (e) {
    const video = e.target;
    if (video.id === "karaoke-video" && selectedSong?.id) {
      fetch("update_played.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song_id: selectedSong.id }),
      });
    }
  }, true);
});
