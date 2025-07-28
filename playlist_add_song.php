<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$playlistId = $data['playlist_id'] ?? null;
$songId = $data['song_id'] ?? null;

if (!$playlistId || !$songId) {
    echo json_encode(['success' => false, 'message' => 'Missing data']);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

// Check if song is already in playlist
$check = $conn->prepare("SELECT * FROM playlist_song WHERE playlist_id = ? AND song_id = ?");
$check->bind_param("ii", $playlistId, $songId);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Song already in playlist']);
    exit;
}

// Add song to playlist
$stmt = $conn->prepare("INSERT INTO playlist_song (playlist_id, song_id) VALUES (?, ?)");
$stmt->bind_param("ii", $playlistId, $songId);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Insert failed']);
}

$stmt->close();
$conn->close();
?>