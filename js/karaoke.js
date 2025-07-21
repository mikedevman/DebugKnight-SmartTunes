document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    const video = document.getElementById("karaoke-video");
    const songSearchInput = document.getElementById("song-search");
    const searchIconBtn = document.getElementById("search-icon-btn"); 
    const songList = document.getElementById("song-list");
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    const deleteBtn = document.getElementById("delete-selected-btn");

    let allSongs = [];
    let selectedSong = null;

    fetch("display_songs.php")
        .then(res => res.json())
        .then(songs => {
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
                document.querySelectorAll('.song-item').forEach(item => item.classList.remove('active'));
                listItem.classList.add('active');
            });

            listItem.appendChild(titleSpan);
            songList.appendChild(listItem);
        });
    }

    function deleteSong(songId) {
        console.log("Deleting ID:", songId);
        fetch("DeleteKaraoke.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "id=" + encodeURIComponent(songId)
        })
        .then(res => res.text())
        .then(text => {
            console.log("Server response:", text);
            let result;
            try {
                result = JSON.parse(text);
            } catch {
                alert("Lỗi phản hồi không hợp lệ:\n" + text);
                return;
            }
            if (result.status === "success") {
                allSongs = allSongs.filter(s => s.id !== songId);
                renderSongList(allSongs);
                video.pause();
                video.src = "";
                selectedSong = null;
                deleteBtn.style.display = "none";
            } else {
                alert("Xoá không thành công: " + result.message);
            }
        });
    }

    deleteBtn.addEventListener("click", () => {
        console.log("Delete button clicked");
        if (selectedSong) {
            if (confirm(`Bạn muốn xoá bài "${selectedSong.title}"?`)) {
                deleteSong(selectedSong.id);
            }
        } else {
            alert("Không có bài hát nào được chọn để xoá.");
        }
    });

    function performSearch() {
        const searchTerm = songSearchInput.value.trim();
        if (searchTerm === "") return;

        fetch(`search_songs.php?q=${encodeURIComponent(searchTerm)}`)
            .then(res => res.json())
            .then(filteredSongs => {
                renderSongList(filteredSongs);
            })
            .catch(err => {
                console.error("Search error:", err);
                alert("Không thể tìm kiếm bài hát lúc này.");
            });
    }

    songSearchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    searchIconBtn.addEventListener("click", performSearch);

    function loadSong(song) {
        if (!song || !song.video) return;

        selectedSong = song;
        deleteBtn.style.display = "inline-block";
        video.src = song.video;
        video.load();
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
=======
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
  if (!song || !song.video) {
    document.getElementById("karaoke-container").innerHTML = "";
    return;
  }

  selectedSong = song;
  deleteBtn.style.display = "inline-block";

  const videoID = getYouTubeVideoID(song.video);
  const container = document.getElementById("karaoke-container");

  if (videoID) {
    container.innerHTML = `
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    `;
  } else {
    container.innerHTML = `<p style='color:white;'>Không thể phát video. Link không hợp lệ.</p>`;
  }
}
  document.getElementById("show-upload-btn").addEventListener("click", () => {
    document.querySelector(".upload-container").style.display = "block";
    document.querySelector(".main-karaoke-content").classList.add("blur-background");
  });
>>>>>>> e6b527800edbc214783ce1dedd7863d11126a88c
});
