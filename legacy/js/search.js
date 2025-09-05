// Playlist search (your original one stays the same)
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

// Hook playlist form
document.addEventListener("DOMContentLoaded", () => {
  const playlistForm = document.getElementById("playlistSearchForm");
  if (playlistForm) {
    playlistForm.addEventListener("submit", e => {
      e.preventDefault();
      const query = document.getElementById("playlistSearchInput").value;
      searchPlaylists(query);
    });

    // load all playlists on page load
    searchPlaylists("");
  }
});

// --------- ALBUM SEARCH (filters instead of replacing) ---------
function searchAlbums(query) {
  const cards = document.querySelectorAll(".album-card");
  const lowerQuery = query.trim().toLowerCase();

  let found = false;

  cards.forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    if (title.includes(lowerQuery) || lowerQuery === "") {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show "no results" message if nothing matched
  const grid = document.querySelector(".album-grid");
  let noResultMsg = document.getElementById("no-albums-msg");

  if (!found && lowerQuery !== "") {
    if (!noResultMsg) {
      noResultMsg = document.createElement("p");
      noResultMsg.id = "no-albums-msg";
      noResultMsg.textContent = "No albums found.";
      grid.appendChild(noResultMsg);
    }
  } else if (noResultMsg) {
    noResultMsg.remove();
  }
}

// Hook album search form
document.addEventListener("DOMContentLoaded", () => {
  const albumForm = document.getElementById("albumSearchForm");
  if (albumForm) {
    albumForm.addEventListener("submit", e => {
      e.preventDefault();
      const query = document.getElementById("albumSearchInput").value;
      searchAlbums(query);
    });

    // Show all albums initially
    searchAlbums("");
  }
});
