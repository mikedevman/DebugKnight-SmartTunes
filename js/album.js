let allSongs = [];
let selectedSong = null;

// ---------- Trích xuất ID album từ URL ----------
function getAlbumId() {
    return new URLSearchParams(window.location.search).get("id");
}

// ---------- Tải danh sách tất cả bài hát cho thanh tìm kiếm ----------
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
                option.dataset.songId = song.song_id; 
                datalist.appendChild(option);
            });
        })
        .catch(err => console.error("Error loading all songs:", err));
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

// ---------- Thiết lập nút "Thêm" bài hát vào album ----------
function setupAddButton() {
    const addBtn = document.getElementById("add-album-btn");
    addBtn.addEventListener("click", e => {
        e.preventDefault();

        const albumId = getAlbumId();
        const songName = document.getElementById("song-name-input").value.trim();
        const songId = document.getElementById("selected-song-id").value;

        if (!albumId || !songName || !songId) {
            alert("Vui lòng chọn một bài hát hợp lệ từ danh sách.");
            return;
        }

        fetch("album_add_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ album_id: albumId, song_name: songName })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Đã thêm bài hát vào album!");
                document.getElementById("song-name-input").value = "";
                document.getElementById("selected-song-id").value = "";
                loadAlbumSongs();
            } else {
                alert("Lỗi: " + data.message);
            }
        })
        .catch(err => console.error("Error adding song:", err));
    });
}

// ---------- Trích xuất ID video YouTube ----------
function getYouTubeVideoID(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\s]{11})/);
    return match ? match[1] : null;
}

// ---------- Hiển thị video ở panel phải ----------
function loadAlbumVideo(url) {
    const wrapper = document.getElementById("karaoke-video-wrapper");
    const videoID = getYouTubeVideoID(url);

    if (videoID) {
        wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&modestbranding=1&showinfo=0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowfullscreen style="width: 100%; height: 100%; border-radius: 8px; border: none;"></iframe>`;
    } else {
        wrapper.innerHTML = `<video src="${url}" controls style="width: 100%; border-radius: 8px;"></video>`;
    }
}

// ---------- Tải danh sách bài hát trong album ----------
function loadAlbumSongs() {
    const albumId = getAlbumId();
    if (!albumId) return;

    // Sửa lỗi cú pháp: dùng backtick (`) cho template literal
    fetch(`album_get_song.php?id=${albumId}`)
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                console.error("Failed to load album songs:", data.message);
                const container = document.getElementById("album-songs");
                container.innerHTML = `<li>Lỗi: ${data.message}</li>`;
                return;
            }

            const songs = data.songs;
            const container = document.getElementById("album-songs");
            container.innerHTML = ""; 

            if (songs.length === 0) {
                container.innerHTML = `<li>Chưa có bài hát nào trong album này.</li>`;
            } else {
                songs.forEach(song => {
                    const li = document.createElement("li");
                    li.className = "album-song-item";
                    li.dataset.songId = song.id;
                    li.dataset.songTitle = song.title;

                    li.innerHTML = `<span style="cursor:pointer; font-size: 17px; color: #fff;">${song.title}</span>`;

                    li.addEventListener("click", () => {
                        document.querySelectorAll(".album-song-item").forEach(el => el.classList.remove("active"));
                        li.classList.add("active");

                        selectedSong = {
                            id: song.id,
                            title: song.title
                        };
                        
                        loadAlbumVideo(song.video);
                    });

                    container.appendChild(li);
                });
            }
        })
        .catch(err => {
            console.error("Error fetching album songs:", err);
            document.getElementById("album-songs").innerHTML = `<li>Lỗi kết nối đến máy chủ.</li>`;
        });
}

// ---------- Thiết lập nút "Xóa" bài hát khỏi album ----------
function setupDeleteButton() {
    const deleteBtn = document.getElementById("delete-selected-btn");
    deleteBtn.addEventListener("click", () => {
        if (!selectedSong) {
            alert("Vui lòng chọn bài hát cần xóa.");
            return;
        }
        
        // Sửa lỗi cú pháp: dùng backtick (`) cho template literal
        if (!confirm(`Bạn chắc chắn muốn xóa "${selectedSong.title}" khỏi album?`)) return;

        fetch("delete_album_song.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                album_id: getAlbumId(),
                song_id: selectedSong.id
            })
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === "success") {
                alert("Đã xóa bài hát khỏi album.");
                selectedSong = null;
                document.getElementById("karaoke-video-wrapper").innerHTML = ''; // Xóa video
                loadAlbumSongs(); // Tải lại danh sách
            } else {
                alert("Lỗi: " + result.message);
            }
        })
        .catch(err => {
            alert("Lỗi kết nối: " + err);
        });
    });
}

// ---------- Khởi chạy khi DOM sẵn sàng ----------
document.addEventListener("DOMContentLoaded", () => {
    loadAllSongs();
    setupSongInputListener();
    setupAddButton();
    loadAlbumSongs();
    setupDeleteButton();
});