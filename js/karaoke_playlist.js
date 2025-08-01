// Wait for the DOM to load before executing any code
document.addEventListener("DOMContentLoaded", () => {
  // Get references to key DOM elements
  const songSearchInput = document.getElementById("song-search");
  const searchIconBtn = document.getElementById("search-icon-btn");
  const songList = document.getElementById("song-list");
  const deleteBtn = document.getElementById("delete-selected-btn");
  const uploadContainer = document.getElementById("uploadContainer");
  const showUploadBtn = document.getElementById("show-upload-btn");
  const closeUploadBtn = document.getElementById("closeUploadBtn");
  const viewEditContainer = document.getElementById("viewEditContainer");
  const closeViewEditBtn = document.getElementById("closeViewEditBtn");
  const viewEditForm = document.getElementById("viewEditForm");

  let allSongs = [];
  let selectedSong = null;

  // Fetch and display songs from user's playlist
  fetch("display_songs_in_playlist.php")
    .then(res => res.json())
    .then(songs => {
      allSongs = songs;
      renderSongList(allSongs);
    });

  // Render the song list dynamically into the UI
  function renderSongList(songs) {
    songList.innerHTML = "";

    songs.forEach(song => {
      const listItem = document.createElement("li");
      listItem.classList.add("song-item");

      const titleSpan = document.createElement("span");
      titleSpan.textContent = song.title;
      titleSpan.classList.add("song-title");
      titleSpan.style.cursor = "pointer";

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "Details";
      viewBtn.classList.add("view-btn");
      viewBtn.onclick = () => openViewEditModal(song);

      titleSpan.addEventListener("click", () => {
        loadSong(song);
        selectedSong = song;
        document.querySelectorAll(".song-item").forEach(item => item.classList.remove("active"));
        listItem.classList.add("active");
      });

      listItem.appendChild(titleSpan);
      listItem.appendChild(viewBtn);
      songList.appendChild(listItem);
    });
  }

  // Open the edit modal and fill the form with selected song data
  function openViewEditModal(song) {
    selectedSong = song;
    document.getElementById("edit_id").value = song.id;
    document.getElementById("edit_title").value = song.title;
    document.getElementById("edit_content").value = song.video;
    document.getElementById("edit_tempo").value = song.tempo || "";
    document.getElementById("edit_songkey").value = song.songkey || "";
    document.getElementById("edit_genre").value = song.genre || "";
    document.getElementById("edit_year").value = song.year || "";
    document.getElementById("edit_album").value = song.album || "";

    viewEditContainer.style.display = "block";
    document.querySelector(".main-karaoke-content").classList.add("blur-background");
  }

  // Close the edit modal
  closeViewEditBtn.addEventListener("click", () => {
    viewEditContainer.style.display = "none";
    document.querySelector(".main-karaoke-content").classList.remove("blur-background");
  });

  // Save changes made to a song in the edit form
  function saveEditedSong(event) {
    event.preventDefault();

    const formData = new FormData(viewEditForm);

    fetch("update_song_details.php", {
      method: "POST",
      body: formData,
    })
      .then(res => res.text())
      .then(result => {
        if (result.trim() === "success") {
          alert("Successfully!");
          viewEditContainer.style.display = "none";
          document.querySelector(".main-karaoke-content").classList.remove("blur-background");

          return fetch("display_songs_in_playlist.php").then(r => r.json());
        } else {
          throw new Error(result);
        }
      })
      .then(songs => {
        allSongs = songs;
        renderSongList(allSongs);
      })
      .catch(err => alert("Error: " + err.message));

    return false;
  }

  // Attach form submission handler
  viewEditForm.addEventListener("submit", saveEditedSong);

  // Delete a song from playlist by ID
  function deleteSong(songId) {
    fetch("delete_song_from_playlist.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "id=" + encodeURIComponent(songId),
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
          allSongs = allSongs.filter(s => s.id !== songId);
          renderSongList(allSongs);
          document.getElementById("karaoke-container").innerHTML = "";
          selectedSong = null;
          deleteBtn.style.display = "none";
        } else {
          alert("Delete failed: " + result.message);
        }
      });
  }

  // Handle click on delete button
  deleteBtn.addEventListener("click", () => {
    if (selectedSong && confirm(`You want to delete "${selectedSong.title}"?`)) {
      deleteSong(selectedSong.id);
    } else {
      alert("No song selected for deletion!");
    }
  });

  // Search functionality to filter songs by title
  function performSearch() {
    const searchTerm = songSearchInput.value.toLowerCase();
    const filteredSongs = allSongs.filter(song => song.title.toLowerCase().includes(searchTerm));
    renderSongList(filteredSongs);
  }

  // Handle Enter key press in search input
  songSearchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") performSearch();
  });

  // Handle click on search icon
  searchIconBtn.addEventListener("click", performSearch);

  // Extract YouTube video ID from a URL
  function getYouTubeVideoID(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\n\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  // Load a song's video (YouTube or local) into the player
  function loadSong(song) {
    selectedSong = song;
    deleteBtn.style.display = "inline-block";
    const videoID = song && song.video ? getYouTubeVideoID(song.video) : null;
    let videoWrapper = document.getElementById("karaoke-video-wrapper");
    if (!videoWrapper) {
      const container = document.getElementById("karaoke-container");
      videoWrapper = document.createElement("div");
      videoWrapper.id = "karaoke-video-wrapper";
      container.insertBefore(videoWrapper, document.getElementById("recording-panel"));
    }

    if (videoID) {
      videoWrapper.innerHTML = `
        <iframe
          id="karaoke-video"
          src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowfullscreen
          style="width: 100%; height: 100%; border-radius: 8px; border: none;"
        ></iframe>
      `;
    } else if (song && song.video) {
      videoWrapper.innerHTML = `<video id="karaoke-video" src="${song.video}" controls style="width: 100%; border-radius: 8px;"></video>`;
    } else {
      videoWrapper.innerHTML = `<video id="karaoke-video" controls style="width: 100%; border-radius: 8px;"></video>`;
    }
  }

  // Show upload form modal
  showUploadBtn.addEventListener("click", () => {
    uploadContainer.style.display = "block";
    document.querySelector(".main-karaoke-content").classList.add("blur-background");
  });

  // Close upload form modal
  closeUploadBtn.addEventListener("click", () => {
    closeUploadForm();
  });

  // Close modals on Escape key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeUploadForm();
      viewEditContainer.style.display = "none";
      document.querySelector(".main-karaoke-content").classList.remove("blur-background");
    }
  });

  // Hide upload form modal and remove background blur
  function closeUploadForm() {
    uploadContainer.style.display = "none";
    document.querySelector(".main-karaoke-content").classList.remove("blur-background");
  }
});
