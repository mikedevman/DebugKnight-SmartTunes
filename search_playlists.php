<?php
session_start();
$conn = new mysqli("127.0.0.1", "root", "", "music_db");
header('Content-Type: application/json');

if ($conn->connect_error) {
    die(json_encode([]));
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$userId = $_SESSION['user_id'];
$q = isset($_GET['q']) ? '%' . trim($_GET['q']) . '%' : '%';

$stmt = $conn->prepare("
    SELECT p.id, p.playlist_name, p.description, p.total_view, p.total_time_played
    FROM playlist p
    WHERE p.user_created = ? 
      AND p.playlist_name LIKE ?
    ORDER BY p.playlist_name ASC
");
$stmt->bind_param("is", $userId, $q);
$stmt->execute();
$res = $stmt->get_result();

$playlists = [];
while ($row = $res->fetch_assoc()) {
    $playlists[] = $row;
}

echo json_encode($playlists);

$stmt->close();
$conn->close();
