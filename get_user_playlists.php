<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("SELECT id, playlist_name AS name FROM playlist WHERE user_created = ?");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();
$playlists = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($playlists);
