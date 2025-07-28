<?php
session_start();
header('Content-Type: application/json');

$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$albumId = $data['album_id'] ?? null;
$songName = trim($data['song_name'] ?? '');

if (!$albumId || !$songName) {
    echo json_encode(['success' => false, 'message' => 'Missing album ID or song name']);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

// Kiểm tra quyền sở hữu album
$check = $conn->prepare("SELECT * FROM album_author WHERE album_id = ? AND author_id = ?");
$check->bind_param("ii", $albumId, $userId);
$check->execute();
$res = $check->get_result();

if ($res->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Access denied or album not found']);
    exit;
}

// Lấy ID bài hát theo tên
$stmt = $conn->prepare("SELECT song_id FROM song WHERE name = ?");
$stmt->bind_param("s", $songName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Song not found']);
    exit;
}

$songRow = $result->fetch_assoc();
$songId = $songRow['song_id'];

// Cập nhật album cho bài hát
$update = $conn->prepare("UPDATE song SET album = ? WHERE song_id = ?");
$update->bind_param("ii", $albumId, $songId);
if ($update->execute()) {
    echo json_encode(['success' => true, 'message' => 'Song added to album']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update song']);
}

$stmt->close();
$update->close();
$conn->close();
?>