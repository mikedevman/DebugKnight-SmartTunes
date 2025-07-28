<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$playlistId = $data["playlist_id"] ?? null;
$songId     = $data["song_id"] ?? null;

if ($playlistId === null || $songId === null) {
    echo json_encode(["status" => "error", "message" => "Missing playlist_id or song_id"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM playlist_song WHERE playlist_id = ? AND song_id = ?");
$stmt->bind_param("ii", $playlistId, $songId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();