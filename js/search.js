function searchPlaylists(query) {
  fetch(`search_playlists.php?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("playlist-grid");
      grid.innerHTML = "";

      if (data.length === 0) {
        grid.innerHTML = "<p>No playlists found.</p>";
        return;
      }

      data.forEach(pl => {
        const card = document.createElement("div");
        card.className = "playlist-card";

        card.innerHTML = `
          <button class="delete-btn" onclick="deletePlaylist(${pl.id})">×</button>
          <img src="img/playlist-img.png" alt="Thumbnail" onclick="openPlaylist(${pl.id})" style="cursor:pointer;"/>
          <p class="playlist-name" onclick="openPlaylist(${pl.id})">${pl.playlist_name}</p>
          <p style="font-size:12px;">Views: ${pl.total_view} | Played: ${pl.total_time_played}</p>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => console.error("Search error:", err));
}

// Hook search form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("playlistSearchForm").addEventListener("submit", e => {
    e.preventDefault();
    const query = document.getElementById("playlistSearchInput").value;
    searchPlaylists(query);
  });

  // load all on page load
  searchPlaylists("");
});

function searchAlbums(query) {
  fetch(`search_albums.php?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const grid = document.querySelector(".album-grid");
      grid.innerHTML = "";

      if (data.length === 0) {
        grid.innerHTML = "<p>No albums found.</p>";
        return;
      }

      data.forEach(album => {
        const card = document.createElement("div");
        card.className = "album-card";

        card.innerHTML = `
          <a href="album.php?id=${album.id}">
            <img src="img/album-img.jpg" alt="Album Thumbnail">
          </a>
          <h3>
            <a href="album.php?id=${album.id}" style="text-decoration: none; color: black;">
              ${album.album_name}
            </a>
          </h3>
          <p style="font-size:12px;">Authors: ${album.authors || 'Unknown'}</p>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => console.error("Album search error:", err));
}

// Hook form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("albumSearchForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const query = document.getElementById("albumSearchInput").value;
      searchAlbums(query);
    });

    // Load all albums initially
    searchAlbums("");
  }
});

