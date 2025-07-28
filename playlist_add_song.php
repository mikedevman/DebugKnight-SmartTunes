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
$check = $conn->prepare("SELECT 1 FROM playlist_song WHERE playlist_id = ? AND song_id = ?");
$check->bind_param("ii", $playlistId, $songId);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Song already in playlist']);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// Add song to playlist
$stmt = $conn->prepare("INSERT INTO playlist_song (playlist_id, song_id) VALUES (?, ?)");
$stmt->bind_param("ii", $playlistId, $songId);

if ($stmt->execute()) {
    $stmt->close();

    // Update playlist totals by adding this song's values
    $stmt = $conn->prepare("
        UPDATE playlist p
        JOIN song s ON s.song_id = ?
        SET p.total_view = p.total_view + s.view,
            p.total_time_played = p.total_time_played + s.time_played
        WHERE p.id = ?
    ");
    $stmt->bind_param("ii", $songId, $playlistId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Song added and totals updated']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update totals: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Insert failed: ' . $stmt->error]);
}

$conn->close();
?>
