<?php
// Set response content type to JSON
header('Content-Type: application/json');

// Get playlist ID from query string
$playlistId = $_GET['id'] ?? null;

// If no ID, return empty array
if (!$playlistId) {
    echo json_encode([]);
    exit;
}

// Connect to database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// If connection fails, return empty array
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

// Prepare SQL to get songs in the playlist
$stmt = $conn->prepare("
    SELECT s.song_id, s.name, s.content
    FROM playlist_song ps
    JOIN song s ON ps.song_id = s.song_id
    WHERE ps.playlist_id = ?
");

// Bind playlist ID to query
$stmt->bind_param("i", $playlistId);

// Execute query
$stmt->execute();
$result = $stmt->get_result();

// Build songs array
$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = [
        "song_id" => $row["song_id"],
        "name" => $row["name"],
        "content" => $row["content"]
    ];
}

// Return songs as JSON
echo json_encode($songs);

// Close statement and connection
$stmt->close();
$conn->close();
