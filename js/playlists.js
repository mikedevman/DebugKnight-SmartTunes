  let playlists = [];

  function toggleCreateForm() {
    const form = document.getElementById("create-form");
    form.style.display = form.style.display === "none" ? "flex" : "none";
  }

  function addPlaylist() {
    const nameInput = document.getElementById("playlistName");
    const name = nameInput.value.trim();

    if (!name) {
      alert("Please enter a playlist name.");
      return;
    }

    const id = Date.now(); 
    const playlist = { id, name };
    playlists.push(playlist);
    savePlaylists();
    renderPlaylists();

    nameInput.value = "";
    toggleCreateForm();
  }

  function deletePlaylist(id) {
    playlists = playlists.filter(p => p.id !== id);
    savePlaylists();
    renderPlaylists();
  }

  function savePlaylists() {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }

  function loadPlaylists() {
    const saved = localStorage.getItem("playlists");
    if (saved) {
      playlists = JSON.parse(saved);
    }
  }

  function renderPlaylists() {
    const container = document.getElementById("playlist-grid");
    container.innerHTML = "";

    playlists.forEach(p => {
      const card = document.createElement("div");
      card.className = "playlist-card";
      card.innerHTML = `
        <a href="playlist.php?id=${p.id}" class="playlist-link">
          <img src="img/playlist-img.png" alt="Playlist Cover" />
          <p>${p.name}</p>
        </a>
        <button class="delete-btn" onclick="deletePlaylist(${p.id})">✖</button>
      `;
      container.appendChild(card);
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    loadPlaylists();
    renderPlaylists();
  });

