<?php
session_start();
header('Content-Type: application/json');

$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
    echo json_encode(['status' => 'error', 'message' => 'Người dùng chưa đăng nhập.']);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Kết nối CSDL thất bại."]));
}

$data = json_decode(file_get_contents("php://input"), true);


$albumId = $data["album_id"] ?? null;
$songId  = $data["song_id"] ?? null;

if ($albumId === null || $songId === null) {
    echo json_encode(["status" => "error", "message" => "Thiếu album_id hoặc song_id."]);
    exit;
}

$check = $conn->prepare("SELECT album_id FROM album_author WHERE album_id = ? AND author_id = ?");
$check->bind_param("ii", $albumId, $userId);
$check->execute();
$result_check = $check->get_result();

if ($result_check->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Bạn không có quyền thực hiện hành động này.']);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

$stmt = $conn->prepare("UPDATE song SET album = NULL WHERE song_id = ? AND album = ?");

$stmt->bind_param("ii", $songId, $albumId);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Đã xóa bài hát khỏi album."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Không tìm thấy bài hát trong album này."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Lỗi thực thi: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>