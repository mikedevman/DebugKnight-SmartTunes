<?php
header('Content-Type: application/json');

$playlistId = $_GET['id'] ?? null;
if (!$playlistId) {
    echo json_encode([]);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("
    SELECT s.song_id, s.name AS Name, s.content AS Content
    FROM playlist_song ps
    JOIN song s ON ps.song_id = s.song_id
    WHERE ps.playlist_id = ?
");
$stmt->bind_param("i", $playlistId);
$stmt->execute();
$result = $stmt->get_result();

$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = $row;
}

echo json_encode($songs);
$stmt->close();
$conn->close();
?>
