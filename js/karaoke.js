document.addEventListener("DOMContentLoaded", () => {
  const songSearchInput = document.getElementById("song-search");
  const searchIconBtn = document.getElementById("search-icon-btn");
  const songList = document.getElementById("song-list");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const deleteBtn = document.getElementById("delete-selected-btn");

  let allSongs = [];
  let selectedSong = null;

  fetch("display_songs.php")
    .then((res) => res.json())
    .then((songs) => {
      allSongs = songs;
      renderSongList(allSongs);
    });

  function renderSongList(songsToRender) {
    songList.innerHTML = "";

    songsToRender.forEach((song) => {
      const listItem = document.createElement("li");
      listItem.classList.add("song-item");

      const titleSpan = document.createElement("span");
      titleSpan.textContent = song.title;
      titleSpan.style.cursor = "pointer";
      titleSpan.addEventListener("click", () => {
        loadSong(song);
        document.querySelectorAll(".song-item").forEach((item) => item.classList.remove("active"));
        listItem.classList.add("active");
      });

      listItem.appendChild(titleSpan);
      songList.appendChild(listItem);
    });
  }

  function deleteSong(songId) {
    fetch("DeleteKaraoke.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "id=" + encodeURIComponent(songId),
    })
      .then((res) => res.text())
      .then((text) => {
        let result;
        try {
          result = JSON.parse(text);
        } catch {
          alert("Lỗi phản hồi không hợp lệ:\n" + text);
          return;
        }
        if (result.status === "success") {
          allSongs = allSongs.filter((s) => s.id !== songId);
          renderSongList(allSongs);
          document.getElementById("karaoke-container").innerHTML = "";
          selectedSong = null;
          deleteBtn.style.display = "none";
        } else {
          alert("Xoá không thành công: " + result.message);
        }
      });
  }

  deleteBtn.addEventListener("click", () => {
    if (selectedSong && confirm(`Bạn muốn xoá bài \"${selectedSong.title}\"?`)) {
      deleteSong(selectedSong.id);
    } else {
      alert("Không có bài hát nào được chọn để xoá.");
    }
  });

  function performSearch() {
    const searchTerm = songSearchInput.value.toLowerCase();
    const filteredSongs = allSongs.filter((song) => song.title.toLowerCase().includes(searchTerm));
    renderSongList(filteredSongs);
  }

  songSearchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") performSearch();
  });
  searchIconBtn.addEventListener("click", performSearch);

  function getYouTubeVideoID(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\n\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

function loadSong(song) {
  selectedSong = song;
  deleteBtn.style.display = "inline-block";
  const videoID = song && song.video ? getYouTubeVideoID(song.video) : null;
  let videoWrapper = document.getElementById("karaoke-video-wrapper");
  if (!videoWrapper) {
    // If missing, recreate it inside #karaoke-container, before the recorder box
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
        style="width: 100%; height: 315px; border-radius: 8px; border: none;"
      ></iframe>
    `;
  } else if (song && song.video) {
    videoWrapper.innerHTML = `<video id="karaoke-video" src="${song.video}" controls style="width: 100%; border-radius: 8px;"></video>`;
  } else {
    videoWrapper.innerHTML = `<video id="karaoke-video" controls style="width: 100%; border-radius: 8px;"></video>`;
  }
}

  const uploadContainer = document.getElementById("uploadContainer");
  const showUploadBtn = document.getElementById("show-upload-btn");
  const closeUploadBtn = document.getElementById("closeUploadBtn");

  showUploadBtn.addEventListener("click", () => {
    uploadContainer.style.display = "block";
    document.querySelector(".main-karaoke-content").classList.add("blur-background");
  });

  closeUploadBtn.addEventListener("click", () => {
    closeUploadForm();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeUploadForm();
    }
  });

  function closeUploadForm() {
    uploadContainer.style.display = "none";
    document.querySelector(".main-karaoke-content").classList.remove("blur-background");
  }
});