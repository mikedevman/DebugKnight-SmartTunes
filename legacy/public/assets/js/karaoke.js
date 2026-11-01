document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  const songList = $("song-list");
  const deleteBtn = $("delete-selected-btn");

  let allSongs = [];
  let selectedSong = null;
  let currentPage = 1;
  let searchTerm = '';
  let requestVersion = 0;
  const pagination = new SongPagination($("song-pagination"), page => {
    fetchSortedSongs($("sort-dropdown").value, page);
  });

  // === FETCH & RENDER ===
  function fetchSortedSongs(sortType = $("sort-dropdown").value, page = currentPage) {
    const version = ++requestVersion;
    const params = new URLSearchParams({ sort: sortType, page, q: searchTerm });
    const linkedId = new URLSearchParams(window.location.search).get('id');
    if (!selectedSong && linkedId) params.set('selected_id', linkedId);
    pagination.loading();
    return fetch(`display_songs.php?${params}`, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('Unable to load songs.');
        return res.json();
      })
      .then(data => {
        if (version !== requestVersion) return null;
        if (!data.success || !Array.isArray(data.songs) || !data.pagination) throw new Error('Unable to load songs.');
        currentPage = data.pagination.page;
        allSongs = data.songs;
        songList.style.counterReset = `track ${(currentPage - 1) * data.pagination.per_page}`;
        renderSongList(allSongs);
        songList.parentElement.scrollTop = 0;
        pagination.update(data.pagination);
        return data;
      })
      .catch(error => {
        if (version === requestVersion) {
          pagination.error();
          if (!songList.querySelector('.song-item')) {
            songList.replaceChildren();
            const message = document.createElement('li');
            message.className = 'song-list-empty';
            message.textContent = 'Songs could not be loaded. Use Retry below.';
            songList.appendChild(message);
          }
          console.error(error);
        }
        return null;
      });
  }

  function renderSongList(songs) {
    songList.innerHTML = "";
    if (!songs.length) {
      const empty = document.createElement('li');
      empty.className = 'song-list-empty';
      empty.textContent = searchTerm ? 'No matching songs.' : 'No songs available yet.';
      songList.appendChild(empty);
    }
    songs.forEach(song => {
      const li = document.createElement("li");
      li.className = "song-item";
      li.dataset.songId = song.id;
      if (selectedSong && String(selectedSong.id) === String(song.id)) li.classList.add('active');

      const title = document.createElement("button");
      title.type = "button";
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
    return StudioPlayer.youtubeId(url);
  }

function loadSong(song) {
  if (window.StudioRecorder?.busy()) return;
  selectedSong = song;

  // Check if current URL already has the song id parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("id") !== String(song.id)) {
    // Reload page with song ID in URL only if different
    const params = new URLSearchParams({ id: song.id, page: currentPage, sort: $("sort-dropdown").value, q: searchTerm });
    window.location.href = `${window.location.pathname}?${params}`;
    return; // Stop further execution to avoid duplicate loading
  }

  const videoID = getYouTubeVideoID(song.video);
  StudioPlayer.mount(song);
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

  function openViewEditModal(song) {
    SongDialogs.edit(song);
  }
  document.addEventListener('song-details-saved', () => fetchSortedSongs());

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
          const wrapper = $("karaoke-video-wrapper");
          if (wrapper) {
            StudioPlayer.clear();
          }

          document.querySelectorAll(".song-item").forEach(item => item.classList.remove("active"));
          selectedSong = null;
          fetchSortedSongs();
        } else {
          alert("Delete failed: " + result.message);
        }
      });
  };

  // === SEARCH ===
  const performSearch = () => {
    searchTerm = $("song-search").value.trim();
    fetchSortedSongs($("sort-dropdown").value, 1);
  };

  $("song-search").addEventListener("keypress", e => e.key === "Enter" && performSearch());
  $("search-icon-btn").onclick = performSearch;

  // === SORT ===
  $("sort-dropdown").onchange = e => fetchSortedSongs(e.target.value, 1);

// Restore the list filters and load a deep-linked song independently of its page.
function loadFromLocation() {
  const params = new URLSearchParams(window.location.search);
  $("song-search").value = params.get('q') || '';
  searchTerm = $("song-search").value.trim();
  $("sort-dropdown").value = params.get('sort') || '';
  selectedSong = null;
  return fetchSortedSongs($("sort-dropdown").value, params.get('page') || 1).then(data => {
    if (!data) return;
    const song = data.selected_song || allSongs.find(s => String(s.id) === params.get('id'));
    if (song) {
      loadSong(song);
      renderSongList(allSongs);
    } else {
      const wrapper = $("karaoke-video-wrapper");
      if (wrapper && !wrapper.querySelector('.stage-empty')) StudioPlayer.clear();
    }
  });
}
loadFromLocation();
window.addEventListener('popstate', loadFromLocation);

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
