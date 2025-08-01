<?php
// Connect to the database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// If connection fails, return error in JSON
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Get JSON input and decode to associative array
$data = json_decode(file_get_contents("php://input"), true);

// Extract playlist_id and song_id from the input
$playlistId = $data["playlist_id"] ?? null;
$songId     = $data["song_id"] ?? null;

// If either ID is missing, return error
if ($playlistId === null || $songId === null) {
    echo json_encode(["status" => "error", "message" => "Missing playlist_id or song_id"]);
    exit;
}

// Prepare and execute delete statement
$stmt = $conn->prepare("DELETE FROM playlist_song WHERE playlist_id = ? AND song_id = ?");
$stmt->bind_param("ii", $playlistId, $songId);

// Return success or error message
if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

// Clean up
$stmt->close();
$conn->close();
