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

$user_songs = [];
if(isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT song_id, name FROM song WHERE user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $user_songs = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
}
?>