<?php
    $host = "127.0.0.1";
    $user = "root";
    $password = "";
    $dbname = "music_db";

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

$user_playlists = [];
if(isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT id, playlist_name FROM playlist WHERE user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $user_playlists = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
}

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    $stmt = $conn->prepare("
        SELECT s.song_id, s.name
        FROM song s
        INNER JOIN song_author sa ON s.song_id = sa.song_id
        WHERE sa.author_id = ?
    ");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $user_songs = [];
    while ($row = $result->fetch_assoc()) {
        $user_songs[] = $row;
    }
    $stmt->close();
} else {
    $user_songs = [];
}
?>