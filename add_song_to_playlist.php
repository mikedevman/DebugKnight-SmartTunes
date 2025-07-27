<?php
session_start();

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_SESSION['user_id'])) {
    die("You must be logged in to add songs to a playlist.");
}
$user_id = $_SESSION['user_id'];

$song_id = $_POST['song_id'] ?? '';
$playlist_id = $_POST['playlist_id'] ?? '';

if (empty($song_id) || empty($playlist_id)) {
    die("Missing song ID or playlist ID.");
}


$stmt = $conn->prepare("INSERT INTO playlist_song (playlist_id, song_id) VALUES (?, ?)");
$stmt->bind_param("ii", $playlist_id, $song_id);

if ($stmt->execute()) {
    echo "Song added to playlist successfully.";
} else {
    echo "Error adding song to playlist: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
