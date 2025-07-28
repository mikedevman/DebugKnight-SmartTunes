<?php
session_start();
header("Content-Type: application/json");

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$songId = $data['song_id'] ?? null;
$increment = $data['increment'] ?? null;

if (!$songId || !$increment) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

// --- Update song stats ---
if ($increment === "view_and_played") {
    $stmt = $conn->prepare("UPDATE song SET view = view + 1, time_played = time_played + 1 WHERE song_id = ?");
} elseif ($increment === "played_only") {
    $stmt = $conn->prepare("UPDATE song SET time_played = time_played + 1 WHERE song_id = ?");
} else {
    echo json_encode(["success" => false, "message" => "Invalid increment type"]);
    exit;
}

$stmt->bind_param("i", $songId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Song stats updated"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
