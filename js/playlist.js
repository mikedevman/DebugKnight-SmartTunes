let allSongs = [];

// Load tất cả bài hát từ database để người dùng chọn
function loadAllSongs() {
    fetch("get_songs.php")
        .then(res => res.json())
        .then(data => {
            allSongs = data;
            const datalist = document.getElementById("song-list-data");
            datalist.innerHTML = "";

            data.forEach(song => {
                const option = document.createElement("option");
                option.value = song.name;
                datalist.appendChild(option);
            });
        });
}

// Khi người dùng gõ tên bài hát, tự động lấy song_id tương ứng
function setupSongInputListener() {
    const input = document.getElementById("song-name-input");
    input.addEventListener("input", () => {
        const name = input.value.trim();
        const matchedSong = allSongs.find(s => s.name === name);
        document.getElementById("selected-song-id").value = matchedSong ? matchedSong.song_id : "";
    });
}

// Xử lý thêm bài hát vào playlist hiện tại
function setupAddButton() {
    const addBtn = document.getElementById("add-playlist-btn");
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const playlistId = new URLSearchParams(window.location.search).get("id");
        const songId = document.getElementById("selected-song-id").value;

        if (!playlistId || !songId) {
            alert("Vui lòng chọn bài hát hợp lệ.");
            return;
        }

        fetch("playlist_add_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playlist_id: playlistId, song_id: songId })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Đã thêm bài hát!");
                document.getElementById("song-name-input").value = "";
                document.getElementById("selected-song-id").value = "";
                loadPlaylistSongs(); // Reload lại danh sách
            } else {
                alert("Lỗi: " + data.message);
            }
        });
    });
}

// Hiển thị video ở panel phải
function loadPlaylistVideo(contentUrl) {
    const wrapper = document.getElementById("karaoke-video-wrapper");
    const videoID = getYouTubeVideoID(contentUrl);

    wrapper.innerHTML = videoID
        ? `
        <iframe
            id="karaoke-video"
            src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="width: 100%; height: 100%; border-radius: 8px; border: none;">
        </iframe>`
        : `<video id="karaoke-video" src="${contentUrl}" controls style="width: 100%; border-radius: 8px;"></video>`;
}

// Regex để trích xuất video ID YouTube
function getYouTubeVideoID(url) {
    const regExp = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

// Load danh sách bài hát trong playlist (và hiển thị vào left panel)
function loadPlaylistSongs() {
    const playlistId = new URLSearchParams(window.location.search).get("id");
    if (!playlistId) return;

    fetch(`get_playlist_songs.php?id=${playlistId}`)
        .then(res => res.json())
        .then(songs => {
            const container = document.getElementById("playlist-songs");
            container.innerHTML = ""; // Clear list

            songs.forEach(song => {
                const div = document.createElement("div");
                div.className = "playlist-song-item"; // <-- dùng class giống trang karaoke.php

                div.innerHTML = `<span style="cursor:pointer; font-size: 17px; color: #fff;  ">${song.Name}</span>`;
                div.addEventListener("click", () => {
                    loadPlaylistVideo(song.Content);
                });

                container.appendChild(div);
            });
        });
}

// Khởi chạy khi trang load
document.addEventListener("DOMContentLoaded", () => {
    loadAllSongs();
    setupSongInputListener();
    setupAddButton();
    loadPlaylistSongs();
});