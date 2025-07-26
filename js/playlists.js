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

  const data = new URLSearchParams();
  data.append("playlist_name", name);

  fetch("create_playlist.php", {
    method: "POST",
    body: data,
  })
    .then(async (response) => {
      const text = await response.text(); // get raw response
      try {
        const result = JSON.parse(text);
        if (result.success) {
          location.reload();
        } else {
          console.error("Server error:", result.error);
          alert("Error creating playlist: " + result.error);
        }
      } catch (e) {
        console.error("Failed to parse JSON. Raw response:", text);
        alert("Server error (not JSON): " + text);
      }
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      alert("Request failed: " + error.message);
    });
}


    function submitForm(event) {
      event.preventDefault();
      const name = document.getElementById("playlistName").value.trim();
      const description = document.getElementById("description").value.trim();

      fetch("create_playlist.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ playlist_name: name, description: description })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          loadPlaylists();
          document.getElementById("create-form").reset();
          toggleCreateForm();
        } else {
          alert("Error: " + data.error);
        }
      });
    }

    function loadPlaylists() {
      fetch("get_playlists.php")
        .then(res => res.json())
        .then(data => {
          const grid = document.getElementById("playlist-grid");
          grid.innerHTML = "";

          data.forEach(pl => {
            const card = document.createElement("div");
            card.className = "playlist-card";

            card.innerHTML = `
              <button class="delete-btn" onclick="deletePlaylist(${pl.id})">×</button>
              <img src="img/playlist-img.png" alt="Thumbnail" />
              <p class="playlist-name" onclick="openPlaylist(${pl.id})">${pl.playlist_name}</p>
              <p style="font-size:12px;">Views: ${pl.total_view} | Played: ${pl.total_time_played}</p>
            `;

            grid.appendChild(card);
          });
        });
    }

function deletePlaylist(playlistId) {
  const data = new URLSearchParams();
  data.append("playlist_id", playlistId);

  fetch("delete_playlists.php", {
    method: "POST",
    body: data,
  })
    .then(async (response) => {
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (result.success) {
          location.reload();
        } else {
          console.error("Server error:", result.error);
          alert("Error deleting playlist: " + result.error);
        }
      } catch (e) {
        console.error("Failed to parse JSON. Raw response:", text);
        alert("Server error (not JSON): " + text);
      }
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      alert("Request failed: " + error.message);
    });
}


    function openPlaylist(id) {
    fetch(`increment_view.php?id=${id}`)
        .then(() => {
        window.location.href = `playlist.php?id=${id}`;
        });
    }

    // Simulate all songs played:
    function onAllSongsPlayed(playlistId) {
      fetch(`update_played.php?id=${playlistId}`);
    }

    window.onload = loadPlaylists;