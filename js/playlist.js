let allSongs = [];
let selectedSong = null;

// ---------- Tải danh sách tất cả bài hát ----------
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

// ---------- Gán ID bài hát khi người dùng nhập tên ----------
function setupSongInputListener() {
    const input = document.getElementById("song-name-input");
    input.addEventListener("input", () => {
        const name = input.value.trim();
        const match = allSongs.find(song => song.name === name);
        document.getElementById("selected-song-id").value = match ? match.song_id : "";
    });
}

// ---------- Thêm bài hát vào playlist ----------
function setupAddButton() {
    const addBtn = document.getElementById("add-playlist-btn");
    addBtn.addEventListener("click", e => {
        e.preventDefault();

        const playlistId = getPlaylistId();
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
        .then(res => res.text())   // lấy thẳng text để debug
        .then(text => {
            console.log("Raw response:", text); // 🐞 xem server trả gì

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                alert("Server không trả JSON hợp lệ:\n" + text);
                return;
            }

            if (data.success) {
                alert("Đã thêm bài hát!");
                window.location.reload(); // reload ngay
            } else {
                alert("Lỗi: " + (data.message || "Không rõ nguyên nhân"));
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Có lỗi xảy ra: " + err.message);
        });
    });
}


// ---------- Trích xuất ID video YouTube ----------
function getYouTubeVideoID(url) {
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\s]{11})/);
    return match ? match[1] : null;
}

// ---------- Hiển thị video ở panel phải ----------
function loadPlaylistVideo(url) {
    const wrapper = document.getElementById("karaoke-video-wrapper");
    const videoID = getYouTubeVideoID(url);

    wrapper.innerHTML = videoID
        ? `<iframe src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowfullscreen style="width: 100%; height: 100%; border-radius: 8px; border: none;"></iframe>`
        : `<video src="${url}" controls style="width: 100%; border-radius: 8px;"></video>`;
}

// ---------- Tải danh sách bài hát trong playlist ----------
function loadPlaylistSongs() {
    const playlistId = getPlaylistId();
    if (!playlistId) return;

    fetch(`get_playlist_songs.php?id=${playlistId}`)
        .then(res => res.json())
        .then(songs => {
            const container = document.getElementById("playlist-songs");
            container.innerHTML = "";

            songs.forEach(song => {
                const div = document.createElement("div");
                div.className = "playlist-song-item";
                div.dataset.songId = song.song_id;
                div.dataset.songTitle = song.name;

                div.innerHTML = `<span style="cursor:pointer; font-size: 17px; color: #fff;">${song.name}</span>`;

                div.addEventListener("click", () => {
                    document.querySelectorAll(".playlist-song-item").forEach(el => el.classList.remove("active"));
                    div.classList.add("active");

                    selectedSong = {
                        id: div.dataset.songId,
                        title: div.dataset.songTitle
                    };

                    loadPlaylistVideo(song.content);
                });

                container.appendChild(div);
            });
        });
}

// ---------- Xử lý xóa bài hát khỏi playlist ----------
function setupDeleteButton() {
    const deleteBtn = document.getElementById("delete-selected-btn");
    deleteBtn.addEventListener("click", () => {
        if (!selectedSong) {
            alert("Vui lòng chọn bài hát cần xóa.");
            return;
        }

        if (!confirm(`Bạn chắc chắn muốn xóa "${selectedSong.title}" khỏi playlist?`)) return;

        fetch("delete_playlist_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                playlist_id: getPlaylistId(),
                song_id: selectedSong.id
            })
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === "success") {
                alert("Đã xóa khỏi playlist.");
                selectedSong = null;
                loadPlaylistSongs();
            } else {
                alert("Lỗi: " + result.message);
            }
        })
        .catch(err => {
            alert("Lỗi kết nối: " + err);
        });
    });
}

// ---------- Trích xuất ID playlist từ URL ----------
function getPlaylistId() {
    return new URLSearchParams(window.location.search).get("id");
}

// ---------- Khởi chạy khi DOM sẵn sàng ----------
document.addEventListener("DOMContentLoaded", () => {
    loadAllSongs();
    setupSongInputListener();
    setupAddButton();
    setupDeleteButton();
    loadPlaylistSongs();
});