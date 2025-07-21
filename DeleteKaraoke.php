<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$songId = $_POST["id"] ?? null;

if ($songId !== null) {
    $stmt = $conn->prepare("DELETE FROM song WHERE song_id = ?");
    $stmt->bind_param("i", $songId);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid ID"]);
}

$conn->close();
